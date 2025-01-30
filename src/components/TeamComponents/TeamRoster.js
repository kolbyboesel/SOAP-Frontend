import React from 'react';

const TeamRoster = ({ teamInfo, teamPlayers }) => {
    const validPlayers = Array.isArray(teamPlayers) ? teamPlayers : [];
    console.log("Valid Players:", validPlayers);
    return (
        <div className="standard-container">
            {validPlayers.length > 0 ? (
                validPlayers.map((playerWrapper, index) => {
                    // Extract the `player` object from each wrapper
                    const player = playerWrapper.player;
                    return (
                        <div key={player?.id || index} className="player-card">
                            <h6 className="player-name">
                                {player.name || "Unknown Player"}
                            </h6>
                            <h6 className="player-details">
                                {player.position || "N/A"}
                            </h6>
                            <h6 className="player-details">
                                {player.jerseyNumber || "N/A"}
                            </h6>
                            <h6 className="player-details">
                                {player.height ? `${player.height} cm` : "N/A"}
                            </h6>
                            <h6 className="player-details">
                                <strong>Birth Date:</strong>{" "}
                                {player.dateOfBithTimestamp
                                    ? new Date(player.dateOfBithTimestamp * 1000).toLocaleDateString()
                                    : "N/A"}
                            </h6>
                        </div>
                    );
                })
            ) : (
                <p className="no-players-message">No players available for this team.</p>
            )}
        </div>
    );
};

export default TeamRoster;