import { Tabs, Tab } from "@nextui-org/react";
import { useState } from "react";

export default function App() {
  const [selected, setSelected] = useState("division");

  return (
    <Tabs
      aria-label="Options"
      selectedKey={selected}
      onSelectionChange={setSelected}
      radius="full"
      color="primary"
    >
      <Tab key="division" title="Division">
        <h1 className="text-white">Division</h1>
      </Tab>
      <Tab key="league" title="League">
        <h1 className="text-white">League</h1>
      </Tab>
      <Tab key="overall" title="Overall">
        <h1 className="text-white">Overall</h1>
      </Tab>
    </Tabs>
  );
}
