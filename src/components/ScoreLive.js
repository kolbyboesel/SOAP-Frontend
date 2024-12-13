import React from 'react';
import '../styles/ConstructBoard.css';

const ScoreLive = ({ eventData, date, time }) => {
    return (
        <div className='scoreboard-score'>
            <div className="row team lose" style={{ borderLeft: 'none', borderTop: 'none', borderRight: 'none' }}>
                <div className="team-name">{eventData.awayTeam.shortName}</div>
                <div className="team-score">{eventData.awayScore.current}</div>
            </div>

            <div className="row team">
                <div className="team-name">{eventData.homeTeam.shortName}</div>
                <div className="team-score">{eventData.homeScore.current}</div>
            </div>
        </div>
    );
};

export default ScoreLive;