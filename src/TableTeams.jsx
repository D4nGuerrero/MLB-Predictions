import React from 'react';

function TableTeams({ teams, onInputChange }) {
  const gamesPerTeam = 162;

  return (
    <table className="table-auto">
      <thead>
        <tr>
          {/* image */}
          <th className="px-4 py-2">Logo</th>
          <th className="px-4 py-2">Team</th>
          <th className="px-4 py-2">Wins</th>
          <th className="px-4 py-2">Losses</th>
          <th className="px-4 py-2">PCT</th>
          <th className="px-4 py-2">GB</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team) => {
          return (
            <tr key={team.name}>
              <td className="bg-sky-900 border px-4 py-2">
                <img src={team.logo} alt={team.name} width="50" height="50" />
              </td>

              <td className="border px-4 py-2">{team.name}</td>
              <td className="border px-4 py-2">
                <input
                  className="bg-stone-900 text-slate-50"
                  type="number"
                  max={162}
                  onChange={({ target: { value } }) =>
                    onInputChange(value, team)
                  }
                  value={team.wins}
                />
              </td>
              <td className="border px-4 py-2">{team.losses}</td>
              <td className="border px-4 py-2">
                {(team.wins / gamesPerTeam).toFixed(3)}
              </td>

              <td className="border px-4 py-2">
                {/* Calculate games behind */}
                {/* Formula: */}
                {/* (Team A's wins - Team A's losses) - (team B's wins - Team B's losses) / 2 */}
                {teams[0].name === team.name
                  ? '-'
                  : (teams[0].wins -
                      teams[0].losses -
                      (team.wins - team.losses)) /
                    2}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableTeams;
