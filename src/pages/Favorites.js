import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import ConstructBoard from '../components/ConstructBoard';
import FavoritesScrollMenu from '../components/FavoritesScrollMenu';
import { UserSettingsContext } from '../../src/components/UserSettings';

const Favorites = () => {
    const apiKey = process.env.REACT_APP_BACKEND_KEY;
    const [isLoading, setIsLoading] = useState(true);
    const { userSettings } = useContext(UserSettingsContext);
    const [eventsData, setEventsData] = useState([]);
    const [teamScoresData, setTeamScoresData] = useState([]);
    const [liveScoreMessage] = useState('Sign in to add your favorite leagues and view live scores here');

    useEffect(() => {
        const fetchLeagueEvents = async (uniqueTournamentID, seasonID, scoresType) => {
            try {
                const response = await axios.get(
                    `${apiKey}/api/SofaScores/league-scores/${uniqueTournamentID}/${seasonID}/${scoresType}`
                );
                if (response.status === 200) {
                    setEventsData((prevData) => [...prevData, ...response.data]);
                } else {
                    console.log(`No events found for ${scoresType} in ${uniqueTournamentID}`);
                }
            } catch (error) {
                console.error('Error fetching league events:', error);
            }
        };

        const fetchTeamScores = async (teamID, eventType) => {
            try {
                const response = await axios.get(
                    `${apiKey}/api/SofaScores/team-scores/${teamID}/${eventType}`
                );
                if (response.status === 200) {
                    setTeamScoresData((prevData) => [...prevData, ...response.data]);
                } else {
                    console.log(`No team events found for ${eventType} in team ${teamID}`);
                }
            } catch (error) {
                console.error('Error fetching team scores:', error);
            }
        };

        const fetchAllEvents = async () => {
            const promises = [];

            if (userSettings.LeagueFavorites?.length > 0) {
                userSettings.LeagueFavorites.forEach((league) => {
                    promises.push(fetchLeagueEvents(league.uniqueTournamentID, league.seasonID, 'next'));
                    promises.push(fetchLeagueEvents(league.uniqueTournamentID, league.seasonID, 'last'));
                });
            }

            if (userSettings.TeamFavorites?.length > 0) {
                userSettings.TeamFavorites.forEach((team) => {
                    promises.push(fetchTeamScores(team.teamID, 'next'));
                    promises.push(fetchTeamScores(team.teamID, 'last'));
                });
            }

            await Promise.all(promises);
            setIsLoading(false);
        };

        fetchAllEvents();
    }, [apiKey, userSettings.LeagueFavorites, userSettings.TeamFavorites]);

    const groupedEvents = eventsData.reduce((acc, event) => {
        const tournamentName = event.tournament.uniqueTournament.name;
        if (!acc[tournamentName]) {
            acc[tournamentName] = [];
        }
        acc[tournamentName].push(event);
        return acc;
    }, {});

    const groupedTeamScores = teamScoresData.reduce((acc, event) => {
        const awayTeamName = event.awayTeam.name;
        const homeTeamName = event.homeTeam.name;

        if (userSettings.TeamFavorites.some(team => team.teamID === event.homeTeam.id)) {
            if (!acc[homeTeamName]) {
                acc[homeTeamName] = [];
            }
            acc[homeTeamName].push(event);
        }

        if (userSettings.TeamFavorites.some(team => team.teamID === event.awayTeam.id)) {
            if (!acc[awayTeamName]) {
                acc[awayTeamName] = [];
            }
            acc[awayTeamName].push(event);
        }

        return acc;
    }, {});

    const selectEvents = (events) => {
        const pastEvents = events.filter(event => event.status.type === 'inprogress');
        const nextEvents = events.filter(event => event.status.type === 'notstarted');

        const selectedEvents = [];

        selectedEvents.push(...pastEvents);

        const remainingCount = 5 - selectedEvents.length;
        if (remainingCount > 0) {
            selectedEvents.push(...nextEvents.slice(0, remainingCount));
        }

        return selectedEvents.slice(0, 5);
    };

    const selectOneEventForTeam = (events) => {
        const liveEvent = events.find(event => event.status.type === 'inprogress');
        if (liveEvent) {
            return liveEvent;
        }

        const nextEvent = events.find(event => event.status.type === 'notstarted');
        if (nextEvent) {
            return nextEvent;
        }

        return events[0];
    };

    const selectedEvents = Object.keys(groupedTeamScores).map((teamName) => {
        const events = groupedTeamScores[teamName];
        const selectedEvent = selectOneEventForTeam(events);
        return {
            teamName,
            event: selectedEvent
        };
    });

    const sortedSelectedEvents = [...selectedEvents].sort((a, b) => {
        const timestampA = new Date(a.event.startTimestamp).getTime();
        const timestampB = new Date(b.event.startTimestamp).getTime();

        return timestampA - timestampB;
    });

    return (
        <div>
            <FavoritesScrollMenu
                userSettings={userSettings}
            />
            {isLoading ? (
                <div className="loading liveLoading">Loading&#8230;</div>
            ) : (
                <div className="scroll-view pt-3 pb-5" id='top-favorites'>
                    {sortedSelectedEvents.length > 0 ? (
                        <div className="league-events-container">
                            <div className="league-container">
                                <h4>Favorites</h4>
                                <div className="events">
                                    {sortedSelectedEvents.map(({ teamName, event }, index) => {
                                        // Check if this is the last event
                                        const isLastEvent = index === sortedSelectedEvents.length - 1;

                                        return (
                                            <div
                                                key={index}
                                                className={`event-board ${isLastEvent ? '' : 'bottom-border'}`}
                                            >
                                                <ConstructBoard EventData={event} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="no-events-message league-container">
                            <div className="page-text text-center">{liveScoreMessage}</div>
                        </div>
                    )}

                    {Object.keys(groupedEvents).length > 0 ? (
                        <div className="league-events-container">
                            <div className="events-section">
                                {Object.keys(groupedEvents).map((tournamentName, index) => {
                                    const tournamentEvents = groupedEvents[tournamentName];

                                    const selectedEvents = selectEvents(tournamentEvents);

                                    if (selectedEvents.length > 0) {
                                        return (
                                            <div key={index} className="league-container">
                                                <h4>{tournamentName}</h4>
                                                <div className="events">
                                                    {selectedEvents.map((event, i) => {
                                                        const isLastEvent = i === selectedEvents.length - 1;

                                                        return (
                                                            <div
                                                                key={i}
                                                                className={`event-board ${isLastEvent ? '' : 'bottom-border'}`}
                                                            >
                                                                <ConstructBoard EventData={event} />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    }

                                    return null;
                                })}
                            </div>
                        </div>
                    ) : null}
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