import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ConstructBoard from '../Scoreboard/ConstructBoard';

const LeagueHome = ({ leagueInfo, uniqueTournamentID, seasonID }) => {
    const [selectedDate, setSelectedDate] = useState(() => {
        const localDate = new Date();
        const year = localDate.getFullYear();
        const month = String(localDate.getMonth() + 1).padStart(2, '0');
        const day = String(localDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    });
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scoreType, setScoreType] = useState('Date');
    const [eventScoreType, setEventScoreType] = useState('last');

    // Function to fetch events (wrapped in useCallback)
    const fetchDateEvents = useCallback(
        async (date) => {
            setLoading(true);

            try {
                const response = await axios.get(
                    `https://soapscores-dvbnchand2byhvhc.centralus-01.azurewebsites.net/api/sofaScores/league-scores-date/${uniqueTournamentID}/${date}`
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
                if (events.length === 0) {
                    setScoreType('Events');
                }
            } catch (err) {
                console.error('Error fetching league events:', err);
                setScoreType('Events');
            } finally {
                setLoading(false);
            }
        },
        [uniqueTournamentID, events.length]
    );

    const fetchEvents = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://soapscores-dvbnchand2byhvhc.centralus-01.azurewebsites.net/api/SofaScores/league-scores/${uniqueTournamentID}/${seasonID}/${eventScoreType}`
            );
            if (response.status === 200) {
                const sortedEvents = response.data.sort((a, b) => {
                    if (a.status?.type === "inprogress" && b.status?.type !== "inprogress") {
                        return -1;
                    }
                    if (a.status?.type !== "inprogress" && b.status?.type === "inprogress") {
                        return 1;
                    }
                    if (eventScoreType === 'last') {
                        return b.startTimestamp - a.startTimestamp;
                    } else {
                        return a.startTimestamp - b.startTimestamp;
                    }
                });
                setEvents(sortedEvents);
            } else {
                console.log(`No events found for ${eventScoreType} in ${uniqueTournamentID}`);
            }
        } catch (err) {
            console.error('Error fetching league events:', err);
        } finally {
            setLoading(false);
        }
    }, [eventScoreType, uniqueTournamentID, seasonID]);


    useEffect(() => {
        fetchDateEvents(selectedDate);
    }, [selectedDate, fetchDateEvents]);

    useEffect(() => {
        fetchEvents();
    }, [eventScoreType, fetchEvents]);

    // eslint-disable-next-line
    useEffect(() => {
        // eslint-disable-next-line
        fetchDateEvents(selectedDate);
        // eslint-disable-next-line
    }, []);

    return (
        <div className='league-container'>
            <div className='team-header'>
                {scoreType === 'Date' ? (
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
                ) : (
                    <select
                        value={eventScoreType}
                        onChange={(e) => setEventScoreType(e.target.value)}
                        className="score-type-picker"
                    >
                        <option value="last">Past and Live Scores</option>
                        <option value="next">Upcoming Games</option>
                    </select>
                )}
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
                    !loading && <p>No events found for the selected date.</p>
                )}
            </div>
        </div>
    );
};

export default LeagueHome;