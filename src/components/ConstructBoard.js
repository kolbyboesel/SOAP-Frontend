import '../styles/ConstructBoard.css';
import ScoreFuture from './ScoreFuture';
import ScoreLive from './ScoreLive';
import ScoreboardInfo from './ScoreboardInfo';

const ConstructBoard = ({ EventData }) => {

    const formatDate = (startTimestamp) => {
        const date = new Date(startTimestamp * 1000);
        return {
            dayMonth: date.toLocaleString([], { month: 'numeric', day: 'numeric' }),
            time: date.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true })
        };
    };

    const { dayMonth, time } = formatDate(EventData.startTimestamp);


    return (
        <div className="col-12 center-elements pl-3">
            <div className="scoreboard hover-cursor">
                <div className='scoreboard-content'>
                    {EventData.status.type === "notstarted" ? (
                        <ScoreFuture
                            eventData={EventData}
                        />
                    ) : (
                        <ScoreLive
                            eventData={EventData}
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