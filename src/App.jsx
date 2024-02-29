import Tabs from "./components/Tabs";

function App() {
  return (
    <div className="bg-gray-900 items-center py-8">
      <h2 className="text-4xl text-slate-200 font-bold sm:text-5xl mb-6 text-center">
        MLB Standings
      </h2>
      <Tabs />
    </div>
  );
}

export default App;
