import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ConstructBoard from '../Scoreboard/ConstructBoard';
import Spinner from '../LoadingSpinner';

const TeamSchedule = ({ teamID }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [eventScoreType, setEventScoreType] = useState('');

    const fetchEvents = useCallback(async (teamID, eventScoreType) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://soapscores-dvbnchand2byhvhc.centralus-01.azurewebsites.net/api/SofaScores/team-scores/${teamID}/${eventScoreType}`
            );
            if (response.status === 200) {
                const sortedEvents = response.data.sort((a, b) => {
                    if (a.status?.type === "inprogress" && b.status?.type !== "inprogress") {
                        return -1;
                    }
                    if (a.status?.type !== "inprogress" && b.status?.type === "inprogress") {
                        return 1;
                    }
                    return eventScoreType === 'last'
                        ? b.startTimestamp - a.startTimestamp
                        : a.startTimestamp - b.startTimestamp;
                });
                setEvents(sortedEvents);
            } else {
                console.log(`No team events found for ${eventScoreType} in team ${teamID}`);
            }
        } catch (error) {
            console.error('Error fetching team scores:', error);
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        if (teamID) {
            fetchEvents(teamID, eventScoreType);
        }
    }, [eventScoreType, teamID, fetchEvents]);

    return (
        <div className='standard-container'>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <div className='team-header'>
                        <select
                            value={eventScoreType}
                            onChange={(e) => setEventScoreType(e.target.value)}
                            className="score-type-picker"
                        >
                            <option value="last">Past and Live Scores</option>
                            <option value="next">Upcoming Games</option>
                        </select>
                    </div>
                    <div className='events-list'>
                        {events.length > 0 ? (
                            events.map((event, index) => {
                                const isLastEvent = index === events.length - 1;
                                return (
                                    <div
                                        key={event.id}
                                        className={`live-score-board ${isLastEvent ? '' : 'bottom-border'}`}
                                    >
                                        <ConstructBoard EventData={event} />
                                    </div>
                                );
                            })
                        ) : (
                            <p>No events found for the selected date.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
export default TeamSchedule;