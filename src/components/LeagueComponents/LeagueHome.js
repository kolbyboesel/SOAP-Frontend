import React from 'react';

const LeagueHome = ({ teamInfo, teamMedia }) => {
    const sortedMedia = Array.isArray(teamMedia)
        ? [...teamMedia].sort((a, b) => b.createdAtTimestamp - a.createdAtTimestamp)
        : [];

    return (
        <div className="league-container">
            {sortedMedia.length > 0 ? (
                sortedMedia.map((media) => (
                    <a key={media.id} className="media-item" href={media.url} target="_blank" rel="noopener noreferrer">
                        <img
                            src={media.thumbnailUrl}
                            alt={media.title}
                            className="media-item-image"
                        />
                        <div className="media-item-text">
                            <h3>{media.title}</h3>
                            <h6>{media.subtitle}</h6>
                        </div>
                    </a>
                ))
            ) : (
                <p className="no-media-message">No media available for this team.</p>
            )}
        </div>
    );
};

export default LeagueHome;