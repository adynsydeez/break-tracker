import React from "react";
import EditBreakButton from "./EditBreakButton";

const BreakRow = () => {
    return (
        <tr>
            <td>AS</td>
            <td>15:50</td>
            <td>17:30</td>
            <td>19:50</td>
            <td>
                <EditBreakButton />
            </td>
        </tr>
    );
};

export default BreakRow;
