import NextUITabs from "./components/Tabs";
import teams from "./teams.json";

function App() {
  const mappedTeams = teams.map((team) => ({
    ...team,
    losses: 0,
    pct: 0,
    gb: 0,
  }));

  const tabsData = {
    division: {
      columns: [
        { name: "Team", uid: "name" },
        { name: "Wins", uid: "custom" },
        { name: "Losses", uid: "losses" },
        { name: "PCT", uid: "pct" },
        { name: "GB", uid: "gb" },
      ],
      rows: mappedTeams,
    },

    league: {
      columns: [
        { name: "Team", uid: "name" },
        { name: "Wins", uid: "custom" },
        { name: "Losses", uid: "losses" },
        { name: "PCT", uid: "pct" },
        { name: "GB", uid: "gb" },
      ],
      rows: mappedTeams,
    },

    overall: {
      columns: [
        { name: "Team", uid: "name" },
        { name: "Wins", uid: "custom" },
        { name: "Losses", uid: "losses" },
        { name: "PCT", uid: "pct" },
        { name: "GB", uid: "gb" },
      ],
      rows: mappedTeams,
    },
  };

  return (
    <div className="bg-gray-900 items-center py-8 px-12">
      <h2 className="text-4xl text-slate-200 font-bold sm:text-5xl mb-6 text-center">
        MLB Standings
      </h2>
      <NextUITabs data={tabsData} />
    </div>
  );
}

export default App;
