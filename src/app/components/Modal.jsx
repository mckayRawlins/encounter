import React, { useRef } from 'react';

export default function Modal({ isOpen, onClose, children }) {
    const modalContentRef = useRef(null);

    if (!isOpen) {
        return null;
    }

    const handleOverlayClick = (event) => {
        if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
            onClose();
        }
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
                onClick={handleOverlayClick}
            >
                <div
                    className="bg-white p-6 w-[60%] rounded-md shadow-lg relative"
                    ref={modalContentRef}
                >
                    <button
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                    {children}

                </div>

            </div>
        </>
    );
}