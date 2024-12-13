import React, { useState, useEffect } from "react";
import '../styles/UnderConstructionModal.css';

const UnderConstructionModal = () => {
    const [isVisible, setIsVisible] = useState(true);

    const closeModal = () => {
        setIsVisible(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 10000); // Close after 10 seconds
        return () => clearTimeout(timer);
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