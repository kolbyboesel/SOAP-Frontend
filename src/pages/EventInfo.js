import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import EventInfoHome from '../components/EventInfoComponents/EventInfoHome';
import ScoreboardInfo from '../components/Scoreboard/Subviews/ScoreboardInfo';
import EventPredictions from '../components/EventInfoComponents/EventPredictions';
import { FaArrowUp } from 'react-icons/fa';

const EventInfo = () => {
    const location = useLocation();
    const { eventData, homeTeamLogo, awayTeamLogo } = location.state;
    const [eventInfoSubpage, setEventInfoSubpage] = useState('Home');

    const formatDate = (startTimestamp) => {
        const date = new Date(startTimestamp * 1000);
        return {
            dayMonth: date.toLocaleString([], { month: 'numeric', day: 'numeric' }),
            time: date.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true })
        };
    };

    const { dayMonth, time } = formatDate(eventData.startTimestamp);

    return (
        <div key={eventData.tournament?.uniqueTournament.id || 'default'} className="flex-container no-gutters align-flex-start" id="top-event-info">
            <div className="event-info-header">
                <div className="event-info-header-team-away">
                    <img
                        src={`data:image/png;base64,${awayTeamLogo}`}
                        alt={`${eventData.awayTeam?.shortName || ''} Logo`}
                        className="event-header-img"
                    />
                    <h2>{eventData.awayTeam?.shortName || ''}</h2>
                </div>
                <ScoreboardInfo
                    eventData={eventData}
                    formattedDate={dayMonth}
                    formattedTime={time}
                />
                <div className="event-info-header-team-home">
                    <h2>{eventData.homeTeam?.shortName || ''}</h2>
                    <img
                        src={`data:image/png;base64,${homeTeamLogo}`}
                        alt={`${eventData.homeTeam?.shortName || ''} Logo`}
                        className="event-header-img"
                    />
                </div>
            </div>

            <div className="no-gutters responsiveScrollContainer bg-white" >
                <div className="col scrollmenu mobileScroll">
                    <button
                        onClick={() => setEventInfoSubpage('Home')}
                        className="w3-hover-text-white bg-white"
                        style={{
                            color: 'black',
                            borderBottom: eventInfoSubpage === 'Home' ? `2px solid black` : 'none',
                        }}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => setEventInfoSubpage('Prediction')}
                        className="w3-hover-text-white bg-white"
                        style={{
                            color: 'black',
                            borderBottom: eventInfoSubpage === 'Prediction' ? `2px solid black` : 'none',
                        }}
                    >
                        Prediction
                    </button>
                </div>
            </div>

            <div className="scroll-view pt-3 pb-5">
                {(() => {
                    switch (eventInfoSubpage) {
                        case 'Home':
                            return <EventInfoHome />;
                        case 'Prediction':
                            return <EventPredictions eventInfo={eventData} />;
                        default:
                            return <EventInfoHome />;
                    }
                })()}
            </div>
            <footer className="text-center footer-container">
                <a href="#top-event-info" className="red-btn">
                    <FaArrowUp size={18} /> To the Top
                </a>
            </footer>
        </div>
    );
};

export default EventInfo;