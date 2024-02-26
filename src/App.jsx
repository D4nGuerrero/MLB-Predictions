import TestInputs from './TestInputs';
import NextUITabs from './components/Tabs';
import teams from './teams.json';

function App() {
  const tabsData = {
    division: {
      columns: [
        { name: 'Team', uid: 'name' },
        { name: 'Wins', uid: 'custom' },
        { name: 'Losses', uid: 'losses' },
        { name: 'PCT', uid: 'pct' },
        { name: 'GB', uid: 'gb' },
      ],
      rows: teams,
    },

    league: {
      columns: [
        { name: 'Team', uid: 'name' },
        { name: 'Wins', uid: 'custom' },
        { name: 'Losses', uid: 'losses' },
        { name: 'PCT', uid: 'pct' },
        { name: 'GB', uid: 'gb' },
      ],
      rows: teams,
    },

    overall: {
      columns: [
        { name: 'Team', uid: 'name' },
        { name: 'Wins', uid: 'custom' },
        { name: 'Losses', uid: 'losses' },
        { name: 'PCT', uid: 'pct' },
        { name: 'GB', uid: 'gb' },
      ],
      rows: teams.map((team) => ({
        ...team,
        wins: 0,
        losses: 100,
        pct: 5.55,
        gb: 20.5,
      })),
    },
  };

  return (
    <div className="bg-gray-900 flex flex-col items-center h-screen py-8 px-12">
      <h2 className="text-4xl text-slate-200 font-bold sm:text-5xl mb-6">
        MLB Standings
      </h2>
      <NextUITabs data={tabsData} />
    </div>
  );
}

export default App;
