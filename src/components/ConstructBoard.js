import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ConstructBoard.css';
import ScoreFuture from './ScoreFuture';
import ScoreLive from './ScoreLive';
import ScoreboardInfo from './ScoreboardInfo';

const ConstructBoard = ({ EventData }) => {

    const [homeTeamLogo, setHomeTeamLogo] = useState(null);
    const [awayTeamLogo, setAwayTeamLogo] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        setHomeTeamLogo(null);
        setAwayTeamLogo(null);
        const fetchHomeTeamLogo = async () => {
            try {
                const response = await axios.get(`https://soapscores-dvbnchand2byhvhc.centralus-01.azurewebsites.net/team-logo/${EventData.homeTeam.id}`);
                if (response.status === 200) {
                    setHomeTeamLogo(response.data.imageData);
                } else {
                    console.error('Logo not found');
                }
            } catch (error) {
                console.error('Error fetching team logo:', error);
            }
        };

        const fetchAwayTeamLogo = async () => {
            try {
                const response = await axios.get(`https://soapscores-dvbnchand2byhvhc.centralus-01.azurewebsites.net/team-logo/${EventData.awayTeam.id}`);
                if (response.status === 200) {
                    setAwayTeamLogo(response.data.imageData);
                } else {
                    console.error('Logo not found');
                }
            } catch (error) {
                console.error('Error fetching team logo:', error);
            }
        };

        if (EventData.homeTeam.id) {
            fetchHomeTeamLogo();
        }
        if (EventData.awayTeam.id) {
            fetchAwayTeamLogo();
        }
    }, [EventData.homeTeam.id, EventData.awayTeam.id]);

    const formatDate = (startTimestamp) => {
        const date = new Date(startTimestamp * 1000);
        return {
            dayMonth: date.toLocaleString([], { month: 'numeric', day: 'numeric' }),
            time: date.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true })
        };
    };

    const { dayMonth, time } = formatDate(EventData.startTimestamp);

    const handleClick = () => {
        navigate('/EventInfo', {
            state: {
                eventData: EventData,
                homeTeamLogo,
                awayTeamLogo,
            }
        });
    };

    return (
        <div className="col-12 center-elements pl-3">
            <div className="scoreboard hover-cursor" onClick={handleClick} style={{

                cursor: "pointer",
            }}>
                <div className='scoreboard-content'>
                    {EventData.status.type === "notstarted" ? (
                        <ScoreFuture
                            eventData={EventData}
                            homeTeamLogo={homeTeamLogo}
                            awayTeamLogo={awayTeamLogo}
                        />
                    ) : (
                        <ScoreLive
                            eventData={EventData}
                            homeTeamLogo={homeTeamLogo}
                            awayTeamLogo={awayTeamLogo}
                        />
                    )}
                    <ScoreboardInfo
                        eventData={EventData}
                        formattedDate={dayMonth}
                        formattedTime={time}
                    />
                </div>
            </div>
        </div>
    );
};

export default ConstructBoard;