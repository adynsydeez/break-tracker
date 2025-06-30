import React from "react";
import { useState } from "react";

interface EditBreakButtonProps {
    onClick: () => void;
}

const EditBreakButton = ( {onClick } : EditBreakButtonProps) => {
    const pencilSvg = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-pencil-icon lucide-pencil"
        >
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
            <path d="m15 5 4 4" />
        </svg>
    );
    const tickSvg = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-check-icon lucide-check"
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
    return (
        <label className="swap">
            <input type="checkbox" onClick={onClick}/>
            <div className="swap-off btn btn-soft btn-warning">{pencilSvg}</div>
            <div className="swap-on btn btn-soft btn-success">{tickSvg}</div>
        </label>
    );
};

export default EditBreakButton;
