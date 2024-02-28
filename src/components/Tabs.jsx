import { Tabs as NextUITabs, Tab } from '@nextui-org/react';
import { useState } from 'react';
import StandingsTable from './StandingsTable';
import teams2 from '../teams.json';

export default function Tabs() {
  const [selected, setSelected] = useState('divisions');
  const [teams, setTeams] = useState(teams2);

  const columns = [
    { name: 'Team', uid: 'name' },
    { name: 'Wins', uid: 'custom' },
    { name: 'Losses', uid: 'losses' },
    { name: 'PCT', uid: 'pct' },
    { name: 'GB', uid: 'gb' },
  ];

  const divisions = {
    AL: {
      title: 'American League',
      divisions: {
        East: [],
        Central: [],
        West: [],
      },
    },
    NL: {
      title: 'National League',
      divisions: {
        East: [],
        Central: [],
        West: [],
      },
    },
  };

  const leagues = {
    AL: {
      title: 'American League',
      teams: [],
    },
    NL: {
      title: 'National League',
      teams: [],
    },
  };
  const teamsByWins = [...teams].sort((a, b) => {
    return b.wins - a.wins;
  });

  teamsByWins.forEach((team) => {
    divisions[team.league].divisions[team.division].push(team);
    leagues[team.league].teams.push(team);
  });

  const totalWins = teams.reduce((acc, team) => {
    return acc + team.wins;
  }, 0);

  const gamesPerTeam = 162;

  const totalGames = gamesPerTeam * 15;
  let winsAvailable = totalGames - totalWins;

  console.log('hmm', winsAvailable);

  function handleInputChange(value, team) {
    // console.log('aver', value, team);
    //TODO: Validations
    // 1. Don't allow more than 1 zero in input
    // 2. The default is 0, when selecting the input, it should be empty
    // 3. account for empty string

    winsAvailable += team.wins;
    console.log('hmm2', winsAvailable);

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

  return (
    <NextUITabs
      aria-label="Options"
      selectedKey={selected}
      onSelectionChange={setSelected}
      radius="lg"
      color="primary"
      className="flex justify-center"
      classNames={{
        tabContent: 'text-medium text-white',
        tabList: 'bg-gray-800',
        tab: 'px-4',
      }}
    >
      <Tab key="division" title="Division">
        <div className="flex gap-4 flex-col lg:flex-row lg:justify-center">
          {Object.entries(divisions).map(([league, data]) => (
            <section key={league}>
              <h1 className=" text-slate-200 font-bold text-3xl text-center">
                {data.title}
              </h1>
              {Object.entries(data.divisions).map(([division, teams]) => (
                <div key={division}>
                  <h2 className="text-slate-200 font-bold text-2xl text-center">
                    {division}
                  </h2>
                  <StandingsTable
                    columns={columns}
                    rows={teams}
                    tabKey={'division'}
                    onInputChange={handleInputChange}
                  />
                </div>
              ))}
            </section>
          ))}
        </div>
      </Tab>

      <Tab key="league" title="League">
        <div className="flex flex-col gap-4 justify-center lg:flex-row">
          {Object.entries(leagues).map(([league, data]) => (
            <section key={league}>
              <h1 className="text-slate-200 font-bold text-3xl text-center">
                {data.title}
              </h1>
              <StandingsTable
                columns={columns}
                rows={data.teams}
                tabKey={'league'}
                onInputChange={handleInputChange}
              />
            </section>
          ))}
        </div>
      </Tab>
      <Tab key="overall" title="Overall">
        <StandingsTable
          columns={columns}
          rows={teamsByWins}
          tabKey={'overall'}
          onInputChange={handleInputChange}
        />
      </Tab>
    </NextUITabs>
  );
}
