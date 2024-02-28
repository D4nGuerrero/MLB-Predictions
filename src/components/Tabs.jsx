import { Tabs, Tab } from "@nextui-org/react";
import { useState } from "react";
import NextUITable from "./Table";

export default function NextUITabs({ data }) {
  const [selected, setSelected] = useState("division");

  const NationalLeagueTeams = data.league.rows.filter(
    (team) => team.league === "NL"
  );
  const AmericanLeagueTeams = data.league.rows.filter(
    (team) => team.league === "AL"
  );

  const divisionFilter = (teams, division) =>
    teams.filter((team) => team.division === division);

  const renderTableForDivision = (title, teams) => (
    <>
      <h1 className="text-slate-200 font-bold text-2xl lg:text-3xl text-center">
        {title}
      </h1>
      <NextUITable
        columns={data.division.columns}
        rows={teams}
        tabKey={"division"}
      />
    </>
  );

  const renderLeagueTable = (title, teams) => (
    <div className="w-full">
      <h1 className="text-slate-200 font-bold text-3xl text-center">{title}</h1>
      <NextUITable
        columns={data.league.columns}
        rows={teams}
        tabKey={"league"}
      />
    </div>
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
        <div className="responsive-grid-container mt-2">
          <section>
            {renderTableForDivision(
              "National League East",
              divisionFilter(NationalLeagueTeams, "East")
            )}
            {renderTableForDivision(
              "National League Central",
              divisionFilter(NationalLeagueTeams, "Central")
            )}
            {renderTableForDivision(
              "National League West",
              divisionFilter(NationalLeagueTeams, "West")
            )}
          </section>

          <section>
            {renderTableForDivision(
              "American League East",
              divisionFilter(AmericanLeagueTeams, "East")
            )}
            {renderTableForDivision(
              "American League Central",
              divisionFilter(AmericanLeagueTeams, "Central")
            )}
            {renderTableForDivision(
              "American League West",
              divisionFilter(AmericanLeagueTeams, "West")
            )}
          </section>
        </div>
      </Tab>

      <Tab key="league" title="League">
        <div className="responsive-grid-container">
          {renderLeagueTable("American League", AmericanLeagueTeams)}
          {renderLeagueTable("National League", NationalLeagueTeams)}
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
