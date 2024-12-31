import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const EventPredictions = ({ eventInfo }) => {
    const [gameWinnerPrediction, setGameWinnerPrediction] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const apiKey = process.env.REACT_APP_BACKEND_KEY;

    const fetchPredictions = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data: gameWinner } = await axios.get(
                `${apiKey}/api/Prediction/game-winner/${eventInfo.homeTeam.id}/${eventInfo.awayTeam.id}`
            );
            setGameWinnerPrediction(gameWinner);
        } catch (error) {
            console.error('Error fetching prediction data:', error);
        } finally {
            setIsLoading(false);
        }
    }, [apiKey, eventInfo]);

    useEffect(() => {
        fetchPredictions();
    }, [eventInfo, fetchPredictions]);

    return (
        <div className='league-container'>
            {isLoading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="team-header-text">
                    <h4>Game Winner Prediction: {gameWinnerPrediction || "No prediction available"}</h4>
                </div>
            )}
        </div>
    );
};

export default EventPredictions;