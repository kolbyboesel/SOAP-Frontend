import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css';
import LeagueHome from '../components/LeagueComponents/LeagueHome';
import LeagueStandings from '../components/LeagueComponents/LeagueStandings';

const LeaguePage = () => {
    const apiKey = process.env.REACT_APP_BACKEND_KEY;
    const [searchParams] = useSearchParams();
    const uniqueTournamentID = searchParams.get('UTID');
    const seasonID = searchParams.get('SID');
    const [isLoading, setIsLoading] = useState(true);
    const [leagueSubpage, setLeagueSubpage] = useState('Home');
    const [leagueInfo, setLeagueInfo] = useState({});
    const [leagueStandings, setLeagueStandings] = useState({});
    const [leagueLogo, setLeagueLogo] = useState(null);

    const fetchLeagueData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [newLeagueInfo, newLeagueStandings, newLeagueLogo] = await Promise.all([
                axios.get(`${apiKey}/api/sofaScores/league-info/${uniqueTournamentID}`),
                axios.get(`${apiKey}/api/sofaScores/league-standings/${uniqueTournamentID}/${seasonID}`),
                axios.get(`${apiKey}/tournament-logo/${uniqueTournamentID}`),
            ]);
            setLeagueInfo(newLeagueInfo.data);
            setLeagueStandings(newLeagueStandings.data.standings);
            setLeagueLogo(newLeagueLogo.data.imageData);
        } catch (error) {
            console.error('Error fetching team data:', error);
        } finally {
            setIsLoading(false);
        }
    }, [apiKey, uniqueTournamentID, seasonID]);

    useEffect(() => {
        if (uniqueTournamentID) {
            fetchLeagueData();
        }
    }, [uniqueTournamentID, fetchLeagueData]);

    return (
        <div key={leagueInfo.uniqueTournament?.name || 'default'}>
            {isLoading ? (
                <div className="loading liveLoading">Loading&#8230;</div>
            ) : (
                <div className="no-gutters align-flex-start" id="top-league">

                    <div className="team-header">
                        <img src={`data:image/png;base64,${leagueLogo}`} alt="" className="team-header-img" />
                        <div className="team-header-text">
                            <h2>{leagueInfo.uniqueTournament?.name || ""}</h2>
                        </div>
                    </div>

                    <div className="no-gutters responsiveScrollContainer bg-white" >
                        <div className="col scrollmenu mobileScroll">
                            <button
                                onClick={() => setLeagueSubpage('Home')}
                                className="w3-hover-text-white bg-white"
                                style={{
                                    color: 'black',
                                    borderBottom: leagueSubpage === 'Home' ? `2px solid black` : 'none',
                                }}
                            >
                                Home
                            </button>
                            <button
                                onClick={() => setLeagueSubpage('Standings')}
                                className="w3-hover-text-white bg-white"
                                style={{
                                    color: 'black',
                                    borderBottom: leagueSubpage === 'Standings' ? `2px solid black` : 'none',
                                }}

                            >
                                Standings
                            </button>
                        </div>
                    </div>


                    <div className="scroll-view pt-3 pb-5">

                        {(() => {
                            switch (leagueSubpage) {
                                case 'Home':
                                    return <LeagueHome leagueInfo={leagueInfo} />;
                                case 'Standings':
                                    return <LeagueStandings leagueStandings={leagueStandings} />;
                                default:
                                    return <LeagueHome leagueInfo={leagueInfo} />;
                            }
                        })()}

                    </div>
                    <footer className="text-center footer-style">
                        <a href="#top-league" className="scroll-to-top-btn">
                            <i className="fas fa-arrow-up"></i> To the top
                        </a>
                    </footer>
                </div>
            )}
        </div>
    );
};

export default LeaguePage;