import React from 'react';
// import json
import teams2 from './teams.json';
import { parse } from 'postcss';

function TestInputs(props) {
  const [teams, setTeams] = React.useState(teams2);

  const teamsByWins = [...teams].sort((a, b) => {
    return b.wins - a.wins;
  });

  const totalWins = teams.reduce((acc, team) => {
    return acc + team.wins;
  }, 0);

  // 162 games in a season
  // 30 teams / 2
  //   let winsAvailable = 162 * 15 - totalWins;

  const gamesPerTeam = 162;
  const teamsPerLeague = 15;
  const totalGames = gamesPerTeam * teamsPerLeague;

  let winsAvailable = totalGames - totalWins;

  return (
    <div className="bg-stone-900 h-full text-slate-50">
      Wins Available: {winsAvailable}
      <div className="flex justify-center">
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
            {teamsByWins.map((team) => {
              return (
                <tr key={team.name}>
                  <td className="bg-sky-900 border px-4 py-2">
                    <img
                      src={team.logo}
                      alt={team.name}
                      width="50"
                      height="50"
                    />
                  </td>

                  <td className="border px-4 py-2">{team.name}</td>
                  <td className="border px-4 py-2">
                    <input
                      className="bg-stone-900 text-slate-50"
                      type="number"
                      max={162}
                      onChange={({ target: { value } }) => {
                        //TODO: Validations
                        // 1. Don't allow more than 1 zero in input
                        // 2. The default is 0, when selecting the input, it should be empty

                        // 3. account for empty string

                        winsAvailable += team.wins;

                        let winsValue =
                          value > winsAvailable || value > gamesPerTeam
                            ? Math.min(winsAvailable, gamesPerTeam)
                            : parseInt(value);

                        setTeams(
                          teams.map((t) => {
                            if (t.name === team.name) {
                              return {
                                ...t,
                                wins: winsValue,
                                losses: gamesPerTeam - winsValue,
                              };
                            }
                            return t;
                          })
                        );
                      }}
                      value={team.wins}
                    />
                  </td>
                  <td className="border px-4 py-2">{team.losses}</td>
                  <td className="border px-4 py-2">
                    {(team.wins / gamesPerTeam).toFixed(3)}
                  </td>
                  <td className="border px-4 py-2">{team.gb}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TestInputs;
