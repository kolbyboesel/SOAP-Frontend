import React from 'react';
import '../styles/ConstructBoard.css';

const ScoreFuture = ({ eventData, homeTeamLogo, awayTeamLogo }) => {
    return (
        <div className='scoreboard-score'>
            <div className="row team lose" style={{ borderLeft: 'none', borderTop: 'none', borderRight: 'none' }}>
                <div className="team-logo">
                    <img src={`data:image/png;base64,${awayTeamLogo}`} alt="" className="team-logo-img" />
                </div>
                <div className="team-name">{eventData.awayTeam.shortName}</div>
            </div>

            <div className="row team">
                <div className="team-logo">
                    <img src={`data:image/png;base64,${homeTeamLogo}`} alt="" className="team-logo-img" />
                </div>
                <div className="team-name">{eventData.homeTeam.shortName}</div>
            </div>
        </div>
    );
};

export default ScoreFuture;