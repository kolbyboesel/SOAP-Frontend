import React, { useState } from 'react';
import axios from 'axios';
import ConstructBoard from '../components/Scoreboard/ConstructBoard';
import { FaArrowUp } from 'react-icons/fa';
import Spinner from '../../src/components/LoadingSpinner';

const LiveScores = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [liveDataPage, setLiveDataPage] = useState([]);
  const [liveScoreMessage, setLiveScoreMessage] = useState('Click One of the Sports Above to View Current Live Scores');
  const [currentSport, setCurrentSport] = useState('');

  const fetchLiveScores = async (seasonName) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://soapscores-dvbnchand2byhvhc.centralus-01.azurewebsites.net/api/sofaScores/live-scores/${seasonName}`
      );
      setLiveDataPage(response.data);
      if (response.data.length === 0) {
        setLiveScoreMessage('Currently No Live Scores Available For The Selected Sport');
      }
    } catch (error) {
      console.error('Error fetching live scores:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSportClick = (sport) => {
    fetchLiveScores(sport);
    setCurrentSport(sport);
  };

  return (
    <div className="flex-container no-gutters align-flex-start" id="top-scores">
      <div className="no-gutters horizontal-scroll-menu">
        <div className="col scrollmenu mobileScroll">
          <button
            onClick={() => handleSportClick('baseball')}
            className="w3-hover-text-white bg-red"
            style={{
              borderBottom: currentSport === 'baseball' ? `2px solid white` : 'none',
            }}
          >
            Baseball
          </button>
          <button
            onClick={() => handleSportClick('american-football')}
            className="w3-hover-text-white bg-red"
            style={{
              borderBottom: currentSport === 'american-football' ? `2px solid white` : 'none',
            }}
          >
            Football
          </button>
          <button
            onClick={() => handleSportClick('basketball')}
            className="w3-hover-text-white bg-red"
            style={{
              borderBottom: currentSport === 'basketball' ? `2px solid white` : 'none',
            }}
          >
            Basketball
          </button>
          <button
            onClick={() => handleSportClick('ice-hockey')}
            className="w3-hover-text-white bg-red"
            style={{
              borderBottom: currentSport === 'ice-hockey' ? `2px solid white` : 'none',
            }}
          >
            Hockey
          </button>
          <button
            onClick={() => handleSportClick('football')}
            className="w3-hover-text-whit bg-red"
            style={{
              borderBottom: currentSport === 'football' ? `2px solid white` : 'none',
            }}
          >
            Soccer
          </button>
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="scroll-view pt-3 pb-5">
          <div className="v-stack standard-container">
            {liveDataPage.length !== 0 ? (
              liveDataPage.map((data, index) => {
                const isLastData = index === liveDataPage.length - 1;

                return (
                  <div
                    key={index}
                    className={`live-score-board ${isLastData ? '' : 'bottom-border'}`}
                  >
                    <ConstructBoard EventData={data} />
                  </div>
                );
              })
            ) : (
              <div className="row no-gutters score-container-scroll xs-padding overflow-auto liveScoresContainer">
                <div className="page-text text-center">
                  {liveScoreMessage}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <footer className="text-center footer-container">
        <a href="#top-scores" className="red-btn">
          <FaArrowUp size={18} /> To the Top
        </a>
      </footer>
    </div>
  );
};

export default LiveScores;