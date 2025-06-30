import React from "react";
import { useState, useEffect } from "react";
import EditBreakButton from "./EditBreakButton";
import { init } from "next/dist/compiled/webpack/webpack";
import { Interface } from "readline";

interface Break {
    id: number;
    initial: string;
    firstTen: string;
    thirty: string;
    secondTen: string;
    refreshBreaks: () => void;
}

const BreakRow = ({
    id,
    initial,
    firstTen,
    thirty,
    secondTen,
    refreshBreaks,
}: Break) => {
    const editBreak = async () => {
        if (
            editInitial == initial &&
            editFirstTen == firstTen &&
            editThirty == thirty &&
            editSecondTen == secondTen
        ) {
            setMode("read");
        } else {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/breaks/${id}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            initial: editInitial,
                            firstTen: editFirstTen,
                            thirty: editThirty,
                            secondTen: editSecondTen,
                        }),
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Failed to update break");
                }

                setMode("read");
                refreshBreaks();
            } catch (error) {
                console.error("Update error:", error);
            }
        }
    };

    const [mode, setMode] = useState("read");

    const [editInitial, setEditInitial] = useState(initial);
    const [editFirstTen, setEditFirstTen] = useState(firstTen);
    const [editThirty, setEditThirty] = useState(thirty);
    const [editSecondTen, setEditSecondTen] = useState(secondTen);

    if (mode === "read") {
        return (
            <tr>
                <td>{initial}</td>
                <td>{firstTen}</td>
                <td>{thirty}</td>
                <td>{secondTen}</td>
                <td>
                    <EditBreakButton onClick={() => setMode("edit")} />
                </td>
            </tr>
        );
    } else if (mode === "edit") {
        return (
            <tr>
                <td>
                    <input
                        type="text"
                        value={editInitial}
                        onChange={(e) => setEditInitial(e.target.value)}
                        className="input"
                    />
                </td>
                <td>
                    <input
                        type="time"
                        value={editFirstTen}
                        onChange={(e) => setEditFirstTen(e.target.value)}
                        className="input w-[110px]"
                    />
                </td>
                <td>
                    <input
                        type="time"
                        value={editThirty}
                        onChange={(e) => setEditThirty(e.target.value)}
                        className="input w-[110px]"
                    />
                </td>
                <td>
                    <input
                        type="time"
                        value={editSecondTen}
                        onChange={(e) => setEditSecondTen(e.target.value)}
                        className="input w-[110px]"
                    />
                </td>
                <td>
                    <EditBreakButton onClick={editBreak} />
                </td>
            </tr>
        );
    } else return null;
};

export default BreakRow;
