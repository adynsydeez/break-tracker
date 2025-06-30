import React from "react";
import AddBreakButton from "./AddBreakButton";

const AddBreakTr = () => {
    return (
        <tr>
            <td>
                <input type="text" placeholder="ABC" className="input" />
            </td>
            <td>
                <input type="time" placeholder="" className="input w-[110px]" />
            </td>
            <td>
                <input type="time" placeholder="Type here" className="input w-[110px]" />
            </td>
            <td>
                <input type="time" placeholder="Type here" className="input w-[110px]" />
            </td>
            <td><AddBreakButton/></td>
        </tr>
    );
};

export default AddBreakTr;
