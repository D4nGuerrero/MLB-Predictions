import TestInputs from './TestInputs';
import NextUITabs from './components/Tabs';
import teams from './teams.json';

function App() {
  const tabsData = {
    division: {
      columns: [
        { id: 1, name: 'Division' },
        { id: 2, name: 'Wins' },
        { id: 3, name: 'Losses' },
        { id: 4, name: 'PCT' },
        { id: 5, name: 'GB' },
      ],
      rows: teams,
    },

    league: {
      columns: [
        { id: 1, name: '' },
        { id: 2, name: 'Wins' },
        { id: 3, name: 'Losses' },
        { id: 4, name: 'PCT' },
        { id: 5, name: 'GB' },
      ],
      rows: teams,
    },

    overall: {
      columns: [
        { id: 1, name: '' },
        { id: 2, name: 'Wins' },
        { id: 3, name: 'Losses' },
        { id: 4, name: 'PCT' },
        { id: 5, name: 'GB' },
      ],
      rows: teams,
    },
  };

  return (
    <div className="h-screen bg-gray-900 py-8 px-12">
      <h2 className="text-4xl text-slate-200 font-bold sm:text-5xl mb-6">
        MLB Standings
      </h2>
      <NextUITabs data={tabsData} />
    </div>
  );
}

export default App;
