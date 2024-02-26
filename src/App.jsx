import NextUITabs from "./components/Tabs";
import teams from "./teams.json";

function App() {
  console.log(teams);
  return (
    <div className="h-screen bg-gray-900 py-8 px-12">
      <h2 className="text-4xl text-slate-200 font-bold sm:text-5xl mb-6">
        MLB Standings
      </h2>
      <NextUITabs />
    </div>
  );
}

export default App;
