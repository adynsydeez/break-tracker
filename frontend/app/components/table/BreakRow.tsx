import React from "react";
import { useState } from "react";
import EditBreakButton from "./EditBreakButton";
import { init } from "next/dist/compiled/webpack/webpack";

interface BreakRowProps {
    initial: string;
    firstTen: string;
    thirty: string;
    secondTen: string;
}

const BreakRow = ({ initial, firstTen, thirty, secondTen }: BreakRowProps) => {
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
                    <EditBreakButton onClick={() => setMode("read")} />
                </td>
            </tr>
        );
    } else return null;
};

export default BreakRow;
