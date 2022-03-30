import { useState, useEffect, useRef } from "react";

export default function Modal({ hideModal }) {
    function onClick() {
        hideModal();
    }
    return (
        <>
            <div className="modal">
                <button onClick={onClick} className="modal-close">
                    &times;
                </button>
                <div className="modal-content">
                    <h2>Modal title</h2>
                    <p>Modal text</p>
                </div>
            </div>
        </>
    );
}
