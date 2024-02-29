import { useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
} from "@nextui-org/react";

export default function StandingsTable({
  columns,
  rows,
  tabKey,
  onInputChange,
}) {
  const handleKeyDown = useCallback(
    (event, team, columnKey) => {
      if (event.key === "Tab") {
        // Obtener el índice de la columna actual
        const currentColumnIndex = columns.findIndex(
          (col) => col.uid === columnKey
        );

        // Obtener el índice de la próxima columna
        const nextColumnIndex = (currentColumnIndex + 1) % columns.length;

        // Enfocar en el siguiente Input
        const nextColumnKey = columns[nextColumnIndex].uid;
        const nextInputId = `${team.name}-${nextColumnKey}`;
        const nextInputElement = document.getElementById(nextInputId);
        if (nextInputElement) {
          nextInputElement.focus();
        }
      }
    },
    [columns]
  );

  const renderCell = useCallback(
    (team, columnKey) => {
      const cellValue = team[columnKey];

      switch (columnKey) {
        case "name":
          return (
            <div className="flex align-center whitespace-nowrap">
              <img
                src={team.logo}
                alt={team.displayName}
                className="h-11 w-11 rounded-lg bg-slate-200 p-1"
              />
              <div className="hidden ml-4 sm:block">
                <p className="text-white text-medium font-bold">{cellValue}</p>
                <p className="text-slate-200 text-sm">{team.displayName}</p>
              </div>

              <div className="p-2 sm:hidden">
                <p className="text-white text-medium font-bold">{team.abbr}</p>
              </div>
            </div>
          );

        case "custom":
          return (
            <Input
              variant="bordered"
              type="text"
              classNames={{
                inputWrapper: "bg-gray-700",
                input:
                  "text-white font-bold text-medium text-center min-w-[30px]",
              }}
              value={team.wins}
              onValueChange={(value) => onInputChange(value, team)}
              id={`${team.name}-${columnKey}`}
              onKeyDown={(event) => handleKeyDown(event, team, columnKey)}
            />
          );
        case "pct":
          return (team.wins / 162).toFixed(3);
        case "gb":
          return team.name === rows[0].name
            ? "-"
            : (rows[0].wins - rows[0].losses - (team.wins - team.losses)) / 2;

        default:
          return cellValue;
      }
    },
    [handleKeyDown, onInputChange, rows]
  );

  return (
    <Table
      isCompact
      aria-label="Table with custom cells"
      isHeaderSticky
      className={`dark mx-auto max-w-[700px]`}
      classNames={{
        base: `mb-3 mt-3 ${tabKey === "league" ? "max-h-[651px]" : ""}`,
        th: "text-white font-bold text-medium bg-gray-700 px-6",
        td: "text-white w-1/5 px-6",
        wrapper: "bg-gray-800",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody items={rows} emptyContent={"No data found"}>
        {rows.map((team) => (
          <TableRow key={team.name}>
            {columns.map((column) => (
              <TableCell key={column.uid}>
                {renderCell(team, column.uid)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
