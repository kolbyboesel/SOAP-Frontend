import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import LeagueHome from '../components/LeagueComponents/LeagueHome';
import LeagueStandings from '../components/LeagueComponents/LeagueStandings';
import { FaArrowUp } from 'react-icons/fa';
import Spinner from '../../src/components/LoadingSpinner';

const LeaguePage = () => {

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
                axios.get(`https://soapscores-dvbnchand2byhvhc.centralus-01.azurewebsites.net/api/sofaScores/league-info/${uniqueTournamentID}`),
                axios.get(`https://soapscores-dvbnchand2byhvhc.centralus-01.azurewebsites.net/api/sofaScores/league-standings/${uniqueTournamentID}/${seasonID}`),
                axios.get(`https://soapscores-dvbnchand2byhvhc.centralus-01.azurewebsites.net/tournament-logo/${uniqueTournamentID}`),
            ]);
            setLeagueInfo(newLeagueInfo.data);
            setLeagueStandings(newLeagueStandings.data.standings);
            setLeagueLogo(newLeagueLogo.data.imageData);
        } catch (error) {
            console.error('Error fetching team data:', error);
        } finally {
            setIsLoading(false);
        }
    }, [uniqueTournamentID, seasonID]);

    useEffect(() => {
        if (uniqueTournamentID) {
            fetchLeagueData();
        }
    }, [uniqueTournamentID, fetchLeagueData]);

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <div key={leagueInfo.uniqueTournament?.name || 'default'} className="flex-container no-gutters align-flex-start" id="top-league">

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
                                    return <LeagueHome leagueInfo={leagueInfo} uniqueTournamentID={uniqueTournamentID} seasonID={seasonID} />;
                                case 'Standings':
                                    return <LeagueStandings leagueStandings={leagueStandings} />;
                                default:
                                    return <LeagueHome leagueInfo={leagueInfo} uniqueTournamentID={uniqueTournamentID} seasonID={seasonID} />;
                            }
                        })()}

                    </div>
                    <footer className="text-center footer-container">
                        <a href="#top-league" className="red-btn">
                            <FaArrowUp size={18} /> To the Top
                        </a>
                    </footer>
                </div>
            )}
        </>
    );
};

export default LeaguePage;