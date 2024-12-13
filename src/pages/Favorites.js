import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import ConstructBoard from '../components/ConstructBoard';
import { UserSettingsContext } from '../../src/components/UserSettings';

const Favorites = () => {
    const [isLoading, setIsLoading] = useState(true);  // Set loading to true initially
    const { userSettings } = useContext(UserSettingsContext);
    const [eventsData, setEventsData] = useState([]);
    const [liveScoreMessage] = useState('Sign in to add your favorite leagues and view live scores here');

    // Function to fetch live events for each league
    const fetchLeagueEvents = async (uniqueTournamentID, seasonID, scoresType) => {
        try {
            const response = await axios.get(
                `https://soapscores-dvbnchand2byhvhc.centralus-01.azurewebsites.net/api/SofaScores/league-scores/${uniqueTournamentID}/${seasonID}/${scoresType}`
            );
            if (response.status === 200) {
                response.data.forEach((event, index) => {
                    console.log(`Event ${index + 1}:`, event);
                });
                setEventsData((prevData) => [...prevData, ...response.data]); // Flatten the events
            } else {
                console.log(`No events found for ${scoresType} in ${uniqueTournamentID} : ${response.data.events}`);
            }
        } catch (error) {
            console.error('Error fetching league events:', error);
        }
    };

    // Fetch events for each favorite league
    useEffect(() => {
        const fetchAllEvents = async () => {
            const promises = [];

            if (userSettings.LeagueFavorites && userSettings.LeagueFavorites.length > 0) {
                userSettings.LeagueFavorites.forEach((league) => {
                    // Add the promises for both 'next' and 'last' events for each league
                    promises.push(fetchLeagueEvents(league.uniqueTournamentID, league.seasonID, 'next'));
                    promises.push(fetchLeagueEvents(league.uniqueTournamentID, league.seasonID, 'last'));
                });
            }

            // Wait for all promises to resolve before finishing the loading state
            await Promise.all(promises);

            // Set loading state to false after all requests are done
            setIsLoading(false);
        };

        fetchAllEvents();  // Call the function to fetch all events
    }, [userSettings.LeagueFavorites]);

    // Group events by tournament name
    const groupedEvents = eventsData.reduce((acc, event) => {
        const tournamentName = event.tournament.uniqueTournament.name;
        if (!acc[tournamentName]) {
            acc[tournamentName] = [];
        }
        acc[tournamentName].push(event);
        return acc;
    }, {});

    // Function to select events, prioritizing live past events and filling with future events
    const selectEvents = (events) => {
        const pastEvents = events.filter(event => event.status.type === 'inprogress');  // Assuming 'live' is the status for live events
        const nextEvents = events.filter(event => event.status.type !== 'inprogress');

        const selectedEvents = [];

        selectedEvents.push(...pastEvents);  // Take all live events

        // If there are fewer than 5 events, fill the remaining spots with upcoming events
        const remainingCount = 5 - selectedEvents.length;
        if (remainingCount > 0) {
            selectedEvents.push(...nextEvents.slice(0, remainingCount));  // Take the required number of next events
        }

        // Ensure the total number of events is a maximum of 5
        return selectedEvents.slice(0, 5);
    };

    return (
        <div>
            {isLoading ? (
                <div className="loading liveLoading">Loading&#8230;</div>
            ) : (
                <div className="scroll-view pt-3 pb-5" id='top-favorites'>
                    {Object.keys(groupedEvents).length > 0 ? (
                        <div className="league-events-container">
                            <div className="events-section">
                                {/* Iterate through each grouped tournament */}
                                {Object.keys(groupedEvents).map((tournamentName, index) => {
                                    const tournamentEvents = groupedEvents[tournamentName];

                                    // Select 5 events based on the logic above
                                    const selectedEvents = selectEvents(tournamentEvents);

                                    return (
                                        <div key={index} className="league-container">
                                            <h4>{tournamentName}</h4>
                                            <div className="events">
                                                {selectedEvents.map((event, i) => (
                                                    <ConstructBoard key={i} EventData={event} />
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="row league-container no-gutters score-container-scroll xs-padding overflow-auto liveScoresContainer">
                            <div className="page-text text-center">
                                {liveScoreMessage}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <footer className="text-center footer-style">
                <a href="#top-favorites" className="scroll-to-top-btn">
                    <i className="fas fa-arrow-up"></i> To the top
                </a>
            </footer>
        </div>
    );
};

export default Favorites;