import React, { useState, useEffect } from "react";
import '../styles/UnderConstructionModal.css';

const UnderConstructionModal = () => {
    const [isVisible, setIsVisible] = useState(true);

    // Close the modal after a certain time or when the user clicks "Close"
    const closeModal = () => {
        setIsVisible(false);
    };

    // Optional: Automatically close the modal after a set time (e.g., 5 seconds)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 10000); // Close after 5 seconds
        return () => clearTimeout(timer); // Clean up on unmount
    }, []);

    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Under Construction</h2>
                <p>Please note there may be issues or missing features, this site is currently being migrated to React</p>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default UnderConstructionModal;