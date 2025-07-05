import React from "react";

interface ErrorModelProps {
    message: string;
    onExit: () => void;
}

const ErrorModal = ({ message, onExit }: ErrorModelProps) => {
    return (
        <>
            <dialog open className="modal" style={{ zIndex: 10000 }}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Error</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <button className="btn" onClick={() => onExit()}>
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default ErrorModal;
