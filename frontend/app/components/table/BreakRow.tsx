import React from "react";
import { useEffect, useState } from "react";
import EditBreakButton from "./EditBreakButton";

type Break = {
    id: number;
    initial: string;
    firstTen: string;
    thirty: string;
    secondTen: string;
};

interface BreakRowProps {
    breakItem: Break;
    refreshBreaks: () => void;
    showMissingFieldsError: () => void;
    showInvalidTimeError: () => void;
}

const BreakRow = ({
    breakItem,
    refreshBreaks,
    showMissingFieldsError,
    showInvalidTimeError,
}: BreakRowProps) => {
    const [mode, setMode] = useState("read");

    const { id, initial, firstTen, thirty, secondTen } = breakItem;

    const [editInitial, setEditInitial] = useState(initial);
    const [editFirstTen, setEditFirstTen] = useState(firstTen);
    const [editThirty, setEditThirty] = useState(thirty);
    const [editSecondTen, setEditSecondTen] = useState(secondTen);

    useEffect(() => {
        if (
            (!editInitial || editInitial === "") &&
            (!editFirstTen || editFirstTen === "") &&
            (!editThirty || editThirty === "") &&
            (!editSecondTen || editSecondTen === "")
        ) {
            setMode("delete");
        }
    }, [editInitial, editFirstTen, editThirty, editSecondTen]);

    const editBreak = async () => {
        if (
            (editInitial == "" ||
                editFirstTen == "" ||
                editThirty == "" ||
                editSecondTen == "") &&
            !(
                (!editInitial || editInitial === "") &&
                (!editFirstTen || editFirstTen === "") &&
                (!editThirty || editThirty === "") &&
                (!editSecondTen || editSecondTen === "")
            )
        ) {
            showMissingFieldsError();
            return;
        }

        if (
            (parseInt(editFirstTen.slice(0, 2)) < 11 &&
                parseInt(editFirstTen.slice(0, 2)) != 0) ||
            (parseInt(editThirty.slice(0, 2)) < 11 &&
                parseInt(editThirty.slice(0, 2)) != 0) ||
            (parseInt(editSecondTen.slice(0, 2)) < 11 &&
                parseInt(editSecondTen.slice(0, 2)) != 0)
        ) {
            showInvalidTimeError();
            return;
        }
        if (
            editInitial == initial &&
            editFirstTen == firstTen &&
            editThirty == thirty &&
            editSecondTen == secondTen
        ) {
            setMode("read");
        } else if (
            (!editInitial || editInitial === "") &&
            (!editFirstTen || editFirstTen === "") &&
            (!editThirty || editThirty === "") &&
            (!editSecondTen || editSecondTen === "")
        ) {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/breaks/${id}`,
                    {
                        method: "DELETE",
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Failed to delete break");
                }

                setMode("read");
                refreshBreaks();
            } catch (error) {
                console.error("Delete error:", error);
            }
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

    if (mode === "read") {
        return (
            <tr>
                <td>{initial}</td>
                <td>{firstTen}</td>
                <td>{thirty}</td>
                <td>{secondTen}</td>
                <td>
                    <EditBreakButton
                        icon={`${mode}`}
                        onClick={() => setMode("edit")}
                    />
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
                    <EditBreakButton icon={`${mode}`} onClick={editBreak} />
                </td>
            </tr>
        );
    } else if (mode == "delete") {
        return (
            <tr>
                <td>
                    <input
                        type="text"
                        value={""}
                        onChange={(e) => {
                            setEditInitial(e.target.value);
                            setMode("edit");
                        }}
                        className="input"
                    />
                </td>
                <td>
                    <input
                        type="time"
                        value={""}
                        onChange={(e) => {
                            setEditFirstTen(e.target.value);
                            setMode("edit");
                        }}
                        className="input w-[110px]"
                    />
                </td>
                <td>
                    <input
                        type="time"
                        value={""}
                        onChange={(e) => {
                            setEditThirty(e.target.value);
                            setMode("edit");
                        }}
                        className="input w-[110px]"
                    />
                </td>
                <td>
                    <input
                        type="time"
                        value={""}
                        onChange={(e) => {
                            setEditSecondTen(e.target.value);
                            setMode("edit");
                        }}
                        className="input w-[110px]"
                    />
                </td>
                <td>
                    <EditBreakButton icon={`${mode}`} onClick={editBreak} />
                </td>
            </tr>
        );
    } else return null;
};

export default BreakRow;
