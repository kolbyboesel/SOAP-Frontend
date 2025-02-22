import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Spinner from '../LoadingSpinner';

const EventPredictions = ({ eventInfo }) => {
    const [gameWinnerPrediction, setGameWinnerPrediction] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const fetchPredictions = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data: gameWinner } = await axios.get(
                `https://soapscores-dvbnchand2byhvhc.centralus-01.azurewebsites.net/api/Prediction/game-winner/${eventInfo.homeTeam.id}/${eventInfo.awayTeam.id}`
            );
            setGameWinnerPrediction(gameWinner);
        } catch (error) {
            console.error('Error fetching prediction data:', error);
        } finally {
            setIsLoading(false);
        }
    }, [eventInfo]);

    useEffect(() => {
        fetchPredictions();
    }, [eventInfo, fetchPredictions]);

    return (
        <div className='standard-container'>
            {isLoading ? (
                <Spinner />
            ) : (

                <div className="team-header-text">
                    <h6 className='center-text' >Game Winner Prediction: {gameWinnerPrediction.gameSuggestion || "No prediction available"}</h6>
                </div>
            )}
        </div>
    );
};

export default EventPredictions;