import React from 'react';

const TeamSchedule = ({ teamInfo }) => {
    return (
        <div>
            <div>
                <div>{teamInfo.team.tournament.name}</div>
            </div>
        </div>


    );
};
export default TeamSchedule;