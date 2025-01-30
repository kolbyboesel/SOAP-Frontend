import React, { useState, useEffect } from 'react';

const LeagueStandings = ({ leagueStandings }) => {
    // Validate leagueStandings and extract standings
    const validStandings = leagueStandings;

    // Extract unique types
    const uniqueTypes = [...new Set(validStandings.map((standing) => standing.name).filter(Boolean))];

    // State for selected type
    const [selectedType, setSelectedType] = useState(uniqueTypes[0] || '');
    const [filteredStandings, setFilteredStandings] = useState([]);

    useEffect(() => {
        const selectedStandings = validStandings.find((standing) => standing.name === selectedType);
        setFilteredStandings(selectedStandings?.rows || []);
    }, [selectedType, validStandings]);

    // Sort rows by position
    const sortedRows = filteredStandings.sort((a, b) => (a.position || 0) - (b.position || 0));

    return (
        <div className='standard-container'>
            <div className='team-header'>
                {uniqueTypes.length > 0 ? (
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className='type-filter'
                        style={{ float: 'right', width: '100%', margin: '0 0 1rem' }}
                    >
                        {uniqueTypes.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                ) : (
                    <p>No types available.</p>
                )}
            </div>

            {sortedRows.length > 0 ? (
                <table className='standings-table'>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Team</th>
                            <th>GP</th>
                            <th>W</th>
                            <th>L</th>
                            <th>T</th>
                            <th>PF</th>
                            <th>PA</th>
                            <th>Diff</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedRows.map((row) => (
                            <tr key={row.id}>
                                <td>{row.position}</td>
                                <td>{row.team?.shortName || 'N/A'}</td>
                                <td>{row.matches}</td>
                                <td>{row.wins}</td>
                                <td>{row.losses}</td>
                                <td>{row.draws}</td>
                                <td>{row.scoresFor}</td>
                                <td>{row.scoresAgainst}</td>
                                <td>{row.scoreDiffFormatted}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No standings available for the selected type.</p>
            )}
        </div>
    );
};

export default LeagueStandings;