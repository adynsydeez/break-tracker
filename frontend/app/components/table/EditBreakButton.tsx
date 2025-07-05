import React from "react";
import { useState } from "react";

interface EditBreakButtonProps {
    onClick: () => void;
    icon: string;
}

const EditBreakButton = ({ onClick, icon }: EditBreakButtonProps) => {
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

    const trashSvg = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-trash2-icon lucide-trash-2"
        >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
        </svg>
    );
    if (icon == "delete") {
        return (
            <div onClick={onClick} className="swap-off btn btn-soft btn-error">
                {trashSvg}
            </div>
        );
    } else if (icon == "edit") {
        return (
            <div
                className="swap-off btn btn-soft btn-success"
                onClick={onClick}
            >
                {tickSvg}
            </div>
        );
    } else if (icon == "read") {
        return (
            <div
                className="swap-off btn btn-soft btn-warning"
                onClick={onClick}
            >
                {pencilSvg}
            </div>
        );
    }
};

export default EditBreakButton;
