import React from "react";
import { useState } from "react";
import AddBreakButton from "./AddBreakButton";
import ErrorModal from "../ErrorModal";

interface AddBreakRowProps {
    refreshBreaks: () => void;
    showMissingFieldsError: () => void;
    showInvalidTimeError: () => void;
}

const AddBreakRow = ({
    refreshBreaks,
    showMissingFieldsError,
    showInvalidTimeError,
}: AddBreakRowProps) => {
    const [initial, setInitial] = useState("");
    const [firstTen, setFirstTen] = useState("");
    const [thirty, setThirty] = useState("");
    const [secondTen, setSecondTen] = useState("");

    const addBreak = async () => {
        if (
            initial == "" ||
            firstTen == "" ||
            thirty == "" ||
            secondTen == ""
        ) {
            showMissingFieldsError();
            return;
        }

        if (
            (parseInt(firstTen.slice(0, 2)) < 11 &&
                parseInt(firstTen.slice(0, 2)) != 0) ||
            (parseInt(thirty.slice(0, 2)) < 11 &&
                parseInt(thirty.slice(0, 2)) != 0) ||
            (parseInt(secondTen.slice(0, 2)) < 11 &&
                parseInt(secondTen.slice(0, 2)) != 0)
        ) {
            showInvalidTimeError();
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/api/breaks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    initial: initial,
                    firstTen: firstTen,
                    thirty: thirty,
                    secondTen: secondTen,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to add break");
            }

            setInitial("");
            setFirstTen("");
            setThirty("");
            setSecondTen("");

            refreshBreaks();
        } catch (error) {
            console.error("Add error:", error);
        }
    };

    return (
        <>
            <tr>
                <td>
                    <input
                        type="text"
                        placeholder="ABC"
                        className="input"
                        value={initial}
                        onChange={(e) => setInitial(e.target.value)}
                    />
                </td>
                <td>
                    <input
                        type="time"
                        placeholder=""
                        className="input w-[110px]"
                        value={firstTen}
                        onChange={(e) => setFirstTen(e.target.value)}
                    />
                </td>
                <td>
                    <input
                        type="time"
                        className="input w-[110px]"
                        value={thirty}
                        onChange={(e) => setThirty(e.target.value)}
                    />
                </td>
                <td>
                    <input
                        type="time"
                        className="input w-[110px]"
                        value={secondTen}
                        onChange={(e) => setSecondTen(e.target.value)}
                    />
                </td>
                <td>
                    <AddBreakButton onClick={addBreak} />
                </td>
            </tr>
        </>
    );
};

export default AddBreakRow;
