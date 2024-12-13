import React, { useState } from 'react';
import axios from 'axios';
import ConstructBoard from '../components/ConstructBoard';

const LiveScores = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [liveDataPage, setLiveDataPage] = useState([]);
  const [liveScoreMessage, setLiveScoreMessage] = useState('Click One of the Sports Above to View Current Live Scores');

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
  };

  return (
    <div>
      <div className="no-gutters align-flex-start" id="top-scores">
        <div className="no-gutters responsiveScrollContainer">
          <div className="col scrollmenu mobileScroll">
            <button
              onClick={() => handleSportClick('baseball')}
              className="w3-hover-text-white bg-red"
            >
              Baseball
            </button>
            <button
              onClick={() => handleSportClick('american-football')}
              className="w3-hover-text-white bg-red"
            >
              Football
            </button>
            <button
              onClick={() => handleSportClick('basketball')}
              className="w3-hover-text-white bg-red"
            >
              Basketball
            </button>
            <button
              onClick={() => handleSportClick('ice-hockey')}
              className="w3-hover-text-white bg-red"
            >
              Hockey
            </button>
            <button
              onClick={() => handleSportClick('football')}
              className="w3-hover-text-whit bg-red"
            >
              Soccer
            </button>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && <div className="loading liveLoading">Loading&#8230;</div>}

        <div className="scroll-view pt-3 pb-5">
          <div className="v-stack league-container">
            {liveDataPage.length !== 0 ? (
              liveDataPage.map((data, index) => (
                <ConstructBoard key={index} EventData={data} />
              ))
            ) : (
              <div className="row no-gutters score-container-scroll xs-padding overflow-auto liveScoresContainer">
                <div className="page-text text-center">
                  {liveScoreMessage}
                </div>
              </div>
            )}
          </div>
        </div>
        <footer className="text-center footer-style">
          <a href="#top-scores" className="scroll-to-top-btn">
            <i className="fas fa-arrow-up"></i> To the top
          </a>
        </footer>
      </div>
    </div>
  );
};

export default LiveScores;