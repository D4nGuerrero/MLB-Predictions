import { Tabs, Tab } from "@nextui-org/react";
import { useState } from "react";
import NextUITable from "./Table";

export default function NextUITabs({ data }) {
  const [selected, setSelected] = useState("overall");

  const NationalLeagueTeams = data.league.rows.filter(
    (team) => team.league === "NL"
  );

  const AmericanLeagueTeams = data.league.rows.filter(
    (team) => team.league === "AL"
  );

  return (
    <Tabs
      aria-label="Options"
      selectedKey={selected}
      onSelectionChange={setSelected}
      radius="lg"
      color="primary"
      className="flex justify-center"
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
      <Tab
        key="league"
        title="League"
        className="flex flex-wrap w-full sm:flex-wrap md:flex-wrap lg:flex-wrap xl:flex-nowrap"
      >
        <div className="w-full">
          <h1 className="text-slate-200 font-bold text-3xl text-center">
            American League
          </h1>

          <NextUITable
            columns={data.league.columns}
            rows={AmericanLeagueTeams}
            tabKey={"league"}
          />
        </div>

        <div className="w-full">
          <h1 className="text-slate-200 font-bold text-3xl text-center">
            National League
          </h1>

          <NextUITable
            columns={data.league.columns}
            rows={NationalLeagueTeams}
            tabKey={"league"}
          />
        </div>
      </Tab>
      <Tab key="overall" title="Overall">
        <NextUITable
          columns={data.overall.columns}
          rows={data.overall.rows}
          tabKey={"overall"}
        />
      </Tab>
    </Tabs>
  );
}
