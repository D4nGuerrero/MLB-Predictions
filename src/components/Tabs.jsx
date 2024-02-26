import { Tabs, Tab } from "@nextui-org/react";
import { useState } from "react";
import NextUITable from "./Table";

export default function NextUITabs({ data }) {
  const [selected, setSelected] = useState("overall");

  return (
    <Tabs
      aria-label="Options"
      selectedKey={selected}
      onSelectionChange={setSelected}
      radius="lg"
      color="primary"
      classNames={{
        tabContent: "text-medium text-white",
        tabList: "bg-gray-800",
        tab: "px-4",
      }}
    >
      <Tab key="division" title="Division">
        <NextUITable
          columns={data.division.columns}
          rows={data.division.rows}
          tabKey={"division"}
        />
      </Tab>
      <Tab key="league" title="League">
        <h1 className="text-white">
          <NextUITable
            columns={data.league.columns}
            rows={data.league.rows}
            tabKey={"league"}
          />
        </h1>
      </Tab>
      <Tab key="overall" title="Overall">
        <h1 className="text-white">
          <NextUITable
            columns={data.overall.columns}
            rows={data.overall.rows}
            tabKey={"overall"}
          />
        </h1>
      </Tab>
    </Tabs>
  );
}
