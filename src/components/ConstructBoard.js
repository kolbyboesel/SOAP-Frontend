import React from 'react';
import '../styles/ConstructBoard.css';

const ConstructBoard = ({ EventData }) => {
    const timestampInMilliseconds = EventData.startTimestamp * 1000;
    const date = new Date(timestampInMilliseconds);

    const dateString = date.toLocaleString([], {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    return (
        <div className="col-12 center-elements pt-3 pb-3 pl-3">
            <div className="container scoreboard hover-cursor">
                <div className="row header">
                    <div className="col-auto headerElement">{dateString}</div>
                    <div className="col headerElement" style={{ textAlign: 'right' }}>
                        {EventData.status.description}
                    </div>
                </div>

                <div className="row team lose" style={{ borderLeft: 'none', borderTop: 'none', borderRight: 'none' }}>
                    <div className="col-4 team">{EventData.awayTeam.shortName}</div>
                    <div className="col periodScore bold-font">{EventData.awayScore.current}</div>
                </div>

                <div className="row team">
                    <div className="col-4 team">{EventData.homeTeam.shortName}</div>
                    <div className="col periodScore bold-font">{EventData.homeScore.current}</div>
                </div>
            </div>
        </div>
    );
};

export default ConstructBoard;