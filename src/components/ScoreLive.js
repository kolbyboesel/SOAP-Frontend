import React from 'react';
import '../styles/ConstructBoard.css';

const ScoreLive = ({ eventData, date, time }) => {
    const awayScore = eventData.awayScore.current;
    const homeScore = eventData.homeScore.current;

    return (
        <div className='scoreboard-score'>
            <div
                className={`row team ${awayScore > homeScore ? 'win' : 'lose'}`}
                style={{ borderLeft: 'none', borderTop: 'none', borderRight: 'none' }}
            >
                <div className="team-name">{eventData.awayTeam.shortName}</div>
                <div className="team-score">{awayScore}</div>
            </div>

            <div
                className={`row team ${homeScore > awayScore ? 'win' : 'lose'}`}
            >
                <div className="team-name">{eventData.homeTeam.shortName}</div>
                <div className="team-score">{homeScore}</div>
            </div>
        </div>
    );
};

export default ScoreLive;