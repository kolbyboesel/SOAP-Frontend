import React from 'react';

const ScoreboardInfo = ({ eventData, formattedDate, formattedTime }) => {
    const { status, time, tournament } = eventData;

    const setDescriptionTitle = (description) => {
        var returnString = description

        if (description === "AET") {
            returnString = "F/OT"
        }
        if (description === "Penalties") {
            returnString = "PENS"
        }
        if (description === "Awaiting Penalties") {
            returnString = "PENS"
        }
        if (description === "Not started") {
            returnString = ""
        }
        if (description === "Ended") {
            returnString = "Final"
        }
        if (description === "Extra time halftime") {
            returnString = "ET"
        }
        if (description === "AP") {
            returnString = "F/PENS"
        }
        if (description === "Pause") {
            returnString = "Break"
        }
        return returnString
    };

    // Helper function to calculate time remaining and current period
    const calculateTimeRemaining = (time) => {
        const periodLength = time?.periodLength ?? 0;
        const totalPeriodCount = time?.totalPeriodCount ?? 1;
        const played = time?.played ?? 0;

        // Calculate total time in minutes
        var currentMinute = Math.floor((periodLength - (played / totalPeriodCount)) / 60);
        const currentSecond = Math.floor((periodLength - (played / totalPeriodCount)) % 60);

        // Format the seconds and minutes to always show two digits
        var formattedMinute = String(currentMinute).padStart(2, '0');
        var formattedSecond = String(currentSecond).padStart(2, '0');

        const description = setDescriptionTitle(status.description);
        const currentPeriod = description.split(" ")[0];

        if (description === "Pause") {
            return `Break`;
        }

        return `${currentPeriod} ${formattedMinute}:${formattedSecond}`;
    };

    const calculateSoccerMinute = (eventData) => {
        const currentTimeStamp = Date.now() / 1000;  // Convert milliseconds to seconds
        const elapsedTimeSinceCurrentPeriodStart = currentTimeStamp - (eventData.time?.currentPeriodStartTimestamp ?? 0);

        const minutesSinceCurrentPeriodStart = elapsedTimeSinceCurrentPeriodStart / 60;

        if (minutesSinceCurrentPeriodStart > 120) {
            return "Final";
        } else if (eventData.status.description === "1st half" || eventData.status.description === "Started") {
            return `${Math.floor(minutesSinceCurrentPeriodStart)}'`;
        } else if (eventData.status.description === "2nd half") {
            return `${Math.floor(minutesSinceCurrentPeriodStart + 45)}'`;
        } else if (eventData.status.description === "Penalties") {
            return "PEN";
        } else if (eventData.status.description === "Awaiting Penalites") {
            return "PEN";
        } else if (eventData.status.description === "Halftime") {
            return "Half";
        } else if (eventData.status.description === "1st extra") {
            return `${Math.floor(minutesSinceCurrentPeriodStart)}' + ${eventData.time?.injuryTime1 ?? 0}`;
        } else if (eventData.status.description === "2nd extra") {
            return `${Math.floor(minutesSinceCurrentPeriodStart + 45)}' + ${eventData.time?.injuryTime2 ?? 0}`;
        } else {
            return "NA";
        }
    };

    return (
        <div className='scoreboard-info'>
            {status.type === "inprogress" ? (
                tournament.category.sport.id !== 1 && tournament.category.sport.id !== 64 ? (
                    <div>{calculateTimeRemaining(time)}</div>
                ) : (
                    <div>{calculateSoccerMinute(eventData)}</div>
                )
            ) : (
                <>
                    <div>{status.description}</div>
                    <div>{formattedDate}</div>
                    <div>{formattedTime}</div>
                </>
            )}
        </div>
    );
};
export default ScoreboardInfo;