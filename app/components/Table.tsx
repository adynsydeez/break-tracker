import React from "react";
import AddBreakTr from "./AddBreakTr";
import RemoveBreakButton from "./EditBreakButton";

const Table = () => {
    return (
        <div className="w-full overflow-y-auto h-full">
            <table className="table overflow-y-auto text-center">
                {/* head */}
                <thead className="sticky top-0 bg-base-300">
                    <tr>
                        <th>Initial</th>
                        <th>10</th>
                        <th>30</th>
                        <th>10</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    <tr>
                        <td>AS</td>
                        <td>15:50</td>
                        <td>17:30</td>
                        <td>19:50</td>
                        <td><RemoveBreakButton/></td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                        <td>AS</td>
                        <td>15:50</td>
                        <td>17:30</td>
                        <td>19:50</td>
                        <td><RemoveBreakButton/></td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                        <td>AS</td>
                        <td>15:50</td>
                        <td>17:30</td>
                        <td>19:50</td>
                        <td><RemoveBreakButton/></td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                        <td>AS</td>
                        <td>15:50</td>
                        <td>17:30</td>
                        <td>19:50</td>
                        <td><RemoveBreakButton/></td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                        <td>AS</td>
                        <td>15:50</td>
                        <td>17:30</td>
                        <td>19:50</td>
                        <td><RemoveBreakButton/></td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                        <td>AS</td>
                        <td>15:50</td>
                        <td>17:30</td>
                        <td>19:50</td>
                        <td><RemoveBreakButton/></td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                        <td>AS</td>
                        <td>15:50</td>
                        <td>17:30</td>
                        <td>19:50</td>
                        <td><RemoveBreakButton/></td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                        <td>AS</td>
                        <td>15:50</td>
                        <td>17:30</td>
                        <td>19:50</td>
                        <td><RemoveBreakButton/></td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                        <td>AS</td>
                        <td>15:50</td>
                        <td>17:30</td>
                        <td>19:50</td>
                        <td><RemoveBreakButton/></td>
                    </tr>
                    <AddBreakTr />
                </tbody>
            </table>
        </div>
    );
};

export default Table;
