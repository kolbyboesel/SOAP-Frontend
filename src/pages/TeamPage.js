import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css';
import TeamHome from '../components/TeamComponents/TeamHome';
import TeamRoster from '../components/TeamComponents/TeamRoster';
import TeamSchedule from '../components/TeamComponents/TeamSchedule';

const TeamPage = () => {

    const [searchParams] = useSearchParams();
    const teamID = searchParams.get('teamID');
    const [isLoading, setIsLoading] = useState(true);
    const [teamSubpage, setTeamSubpage] = useState('Home');
    const [generalTeamInfo, setGeneralTeamInfo] = useState({});
    const [teamMedia, setTeamMedia] = useState({});
    const [teamPlayers, setTeamPlayers] = useState({});
    const [teamLogo, setTeamLogo] = useState(null);

    const fetchTeamData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [teamInfo, teamMedia, teamPlayers, teamLogo] = await Promise.all([
                axios.get(`https://soapscores-dvbnchand2byhvhc.centralus-01.azurewebsites.net/api/sofaScores/team-info/${teamID}`),
                axios.get(`https://soapscores-dvbnchand2byhvhc.centralus-01.azurewebsites.net/api/sofaScores/team-media/${teamID}`),
                axios.get(`https://soapscores-dvbnchand2byhvhc.centralus-01.azurewebsites.net/api/sofaScores/team-roster/${teamID}`),
                axios.get(`https://soapscores-dvbnchand2byhvhc.centralus-01.azurewebsites.net/team-logo/${teamID}`),
            ]);

            setGeneralTeamInfo(teamInfo.data);
            setTeamMedia(teamMedia.data.media);
            setTeamPlayers(teamPlayers.data);
            setTeamLogo(teamLogo.data.imageData);
        } catch (error) {
            console.error('Error fetching team data:', error);
        } finally {
            setIsLoading(false);
        }
    }, [teamID]);

    useEffect(() => {
        if (teamID) {
            fetchTeamData();
        }
    }, [teamID, fetchTeamData]);

    return (
        <div key={generalTeamInfo.team?.name || 'default'}>
            {isLoading ? (
                <div className="loading liveLoading">Loading&#8230;</div>
            ) : (
                <div className="no-gutters align-flex-start" id="top-team">

                    <div className="team-header">
                        <img src={`data:image/png;base64,${teamLogo}`} alt="" className="team-header-img" />
                        <div className="team-header-text">
                            <h2>{generalTeamInfo.team?.name || ""}</h2>
                            <h6>{generalTeamInfo.pregameForm?.value || ""}</h6>
                        </div>
                    </div>

                    <div className="no-gutters responsiveScrollContainer bg-white" >
                        <div className="col scrollmenu mobileScroll">
                            <button
                                onClick={() => setTeamSubpage('Home')}
                                className="w3-hover-text-white bg-white"
                                style={{
                                    color: generalTeamInfo.team?.teamColors?.primary || 'black',
                                    borderBottom: teamSubpage === 'Home' ? `2px solid ${generalTeamInfo.team?.teamColors?.secondary || 'black'}` : 'none',
                                }}
                            >
                                Home
                            </button>
                            <button
                                onClick={() => setTeamSubpage('Roster')}
                                className="w3-hover-text-white bg-white"
                                style={{
                                    color: generalTeamInfo.team?.teamColors?.primary || 'black',
                                    borderBottom: teamSubpage === 'Roster' ? `2px solid ${generalTeamInfo.team?.teamColors?.secondary || 'black'}` : 'none',
                                }}

                            >
                                Roster
                            </button>
                            <button
                                onClick={() => setTeamSubpage('Schedule')}
                                className="w3-hover-text-white bg-white"
                                style={{
                                    color: generalTeamInfo.team?.teamColors?.primary || 'black',
                                    borderBottom: teamSubpage === 'Schedule' ? `2px solid ${generalTeamInfo.team?.teamColors?.secondary || 'black'}` : 'none',
                                }}

                            >
                                Schedule
                            </button>
                        </div>
                    </div>

                    <div className="scroll-view pt-3 pb-5">
                        {(() => {
                            switch (teamSubpage) {
                                case 'Home':
                                    return <TeamHome teamInfo={generalTeamInfo} teamMedia={teamMedia} />;
                                case 'Roster':
                                    return <TeamRoster teamInfo={generalTeamInfo} teamPlayers={teamPlayers} />;
                                case 'Schedule':
                                    return <TeamSchedule teamID={teamID} />;
                                default:
                                    return <TeamHome teamInfo={generalTeamInfo} teamMedia={teamMedia} />;
                            }
                        })()}
                    </div>
                    <footer className="text-center footer-style">
                        <a href="#top-team" className="scroll-to-top-btn">
                            <i className="fas fa-arrow-up"></i> To the top
                        </a>
                    </footer>
                </div>
            )}
        </div>
    );
};

export default TeamPage;