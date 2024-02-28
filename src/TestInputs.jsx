import React from 'react';
// import json
import teams2 from './teams.json';
import TableTeams from './TableTeams';

function TestInputs(props) {
  const [teams, setTeams] = React.useState(teams2);

  const teamsByWins = [...teams].sort((a, b) => {
    return b.wins - a.wins;
  });

  const totalWins = teams.reduce((acc, team) => {
    return acc + team.wins;
  }, 0);

  const gamesPerTeam = 162;
  // Total teams / 2 * games per team
  const totalGames = gamesPerTeam * 15;

  let winsAvailable = totalGames - totalWins;

  function handleInputChange(value, team) {
    console.log('aver', value, team);
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
  }

  const organizedData = {
    AL: {
      East: [],
      Central: [],
      West: [],
    },
    NL: {
      East: [],
      Central: [],
      West: [],
    },
  };

  teamsByWins.forEach((team) => {
    organizedData[team.league][team.division].push(team);
  });

  //  AL and NL 2 leagues
  const twoLeagues = {
    AL: [],
    NL: [],
  };

  teamsByWins.forEach((team) => {
    twoLeagues[team.league].push(team);
  });

  return (
    <div className="bg-stone-900 h-full text-slate-50">
      Wins Available: {winsAvailable}
      <div className="flex justify-center h-screen">
        {/* <TableTeams teams={teamsByWins} onInputChange={handleInputChange} /> */}

        {/* {Object.entries(organizedData).map(([league, divisions]) => {
          return (
            <div key={league} className="flex flex-col items-center">
              <h2 className="text-2xl font-bold">{league}</h2>
              {Object.entries(divisions).map(([division, teams]) => {
                return (
                  <div key={division} className="flex flex-col items-center">
                    <h3 className="text-xl font-bold">{division}</h3>
                    <TableTeams
                      teams={teams}
                      onInputChange={handleInputChange}
                    />
                  </div>
                );
              })}
            </div>
          );
        })} */}

        {Object.entries(twoLeagues).map(([league, teams]) => {
          return (
            <div key={league} className="flex flex-col items-center">
              <h2 className="text-2xl font-bold">{league}</h2>
              <TableTeams teams={teams} onInputChange={handleInputChange} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TestInputs;
