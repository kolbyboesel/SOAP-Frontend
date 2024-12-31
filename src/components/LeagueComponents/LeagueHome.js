import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ConstructBoard from '../ConstructBoard';

const LeagueHome = ({ leagueInfo }) => {
    const apiKey = process.env.REACT_APP_BACKEND_KEY;
    const [selectedDate, setSelectedDate] = useState(() => {
        const localDate = new Date();
        const year = localDate.getFullYear();
        const month = String(localDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const day = String(localDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
    });
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch events (wrapped in useCallback)
    const fetchEvents = useCallback(
        async (date) => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `${apiKey}/api/sofaScores/league-scores-date/${leagueInfo.uniqueTournament.id}/${date}`
                );

                // Sort events by status.type and startTimestamp
                const sortedEvents = response.data.sort((a, b) => {
                    if (a.status?.type === "inprogress" && b.status?.type !== "inprogress") {
                        return -1;
                    }
                    if (a.status?.type !== "inprogress" && b.status?.type === "inprogress") {
                        return 1;
                    }
                    // Both are inprogress or neither is inprogress, sort by startTimestamp
                    return a.startTimestamp - b.startTimestamp;
                });

                setEvents(sortedEvents);
            } catch (err) {
                setError('Failed to fetch events. Please try again later.');
            } finally {
                setLoading(false);
            }
        },
        [apiKey, leagueInfo]
    );

    useEffect(() => {
        fetchEvents(selectedDate);
    }, [selectedDate, fetchEvents]);

    return (
        <div className='league-container'>
            <div className='team-header'>
                <label htmlFor='date-picker' style={{ paddingRight: '10px' }}>Select Date: </label>
                <input
                    id='date-picker'
                    type='date'
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className='date-picker'
                    style={{ float: 'right', width: '80%', margin: '0 0 1rem' }}
                />
            </div>

            {loading && <p>Loading events...</p>}
            {error && <p className='error'>{error}</p>}

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
                    !loading && <p>No events found for the selected date.</p>
                )}
            </div>
        </div>
    );
};

export default LeagueHome;