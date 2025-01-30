import React from "react";
import { useNavigate } from "react-router-dom";

const FavoritesScrollMenu = ({ userSettings, logos }) => {
    const navigate = useNavigate();

    return (
        <div className="no-gutters horizontal-scroll-menu bg-white">
            <div className="scrollmenu mobileScroll">
                {logos.map((logo, index) => (
                    <button
                        key={index}
                        onClick={() =>
                            logo.type === "league"
                                ? navigate(`/LeaguePage?UTID=${logo.id}&SID=${logo.seasonID}`)
                                : navigate(`/TeamPage?teamID=${logo.id}`)
                        }
                        className="logo-button"
                        style={{
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            padding: "10px",
                            maxWidth: "50px",
                        }}
                    >
                        <img
                            src={`data:image/png;base64,${logo.logo}`}
                            alt={`${logo.type} logo`}
                            style={{ height: "30px", width: "30px" }}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FavoritesScrollMenu;