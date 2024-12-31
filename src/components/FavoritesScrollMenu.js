import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FavoritesScrollMenu = ({ userSettings }) => {
    const apiKey = process.env.REACT_APP_BACKEND_KEY;
    const [logos, setLogos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLogos = async () => {
            const fetchedLogos = [];
            for (const favorite of userSettings.LeagueFavorites) {
                try {
                    const response = await axios.get(
                        `${apiKey}/tournament-logo/${favorite.uniqueTournamentID}`
                    );
                    fetchedLogos.push({
                        type: "league",
                        id: favorite.uniqueTournamentID,
                        seasonID: favorite.seasonID,
                        logo: response.data.imageData,
                    });
                } catch (error) {
                    console.error("Error fetching league logo:", error);
                }
            }

            for (const favorite of userSettings.TeamFavorites) {
                try {
                    const response = await axios.get(
                        `${apiKey}/team-logo/${favorite.teamID}`
                    );
                    fetchedLogos.push({
                        type: "team",
                        id: favorite.teamID,
                        logo: response.data.imageData,
                    });
                } catch (error) {
                    console.error("Error fetching team logo:", error);
                }
            }

            setLogos(fetchedLogos);
        };

        fetchLogos();
    }, [apiKey, userSettings]);

    return (
        <div className="no-gutters responsiveScrollContainer bg-white">
            <div className="col scrollmenu mobileScroll">
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