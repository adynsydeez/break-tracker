"use client";

import React from "react";
import { useState, useEffect } from "react";
import AddBreakTr from "./AddBreakTr";

interface TableProps {
    children: React.ReactNode;
}

const Table = ({ children }: TableProps) => {

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
                    {children}
                    <AddBreakTr />
                </tbody>
            </table>
        </div>
    );
};

export default Table;
