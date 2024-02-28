import { useCallback } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
} from '@nextui-org/react';

export default function StandingsTable({
  columns,
  rows,
  tabKey,
  onInputChange,
}) {
  const renderCell = useCallback(
    (team, columnKey) => {
      const cellValue = team[columnKey];

      switch (columnKey) {
        case 'name':
          return (
            <div className="flex w-[210px] mt-2">
              <img
                src={team.logo}
                alt={team.displayName}
                className="h-11 w-11 rounded-lg bg-slate-200 p-1"
              />
              <div className="ml-4">
                <p className="text-white text-medium font-bold">{cellValue}</p>
                <p className="text-slate-200 text-sm">{team.displayName}</p>
              </div>
            </div>
          );

        case 'custom':
          return (
            <Input
              variant="bordered"
              type="text"
              classNames={{
                inputWrapper: 'bg-gray-700',
                input:
                  'text-white font-bold text-medium text-center min-w-[30px]',
              }}
              value={team.wins}
              onValueChange={(value) => onInputChange(value, team)}
            />
          );
        case 'pct':
          return (team.wins / 162).toFixed(3);
        case 'gb':
          return team.name === rows[0].name
            ? '-'
            : (rows[0].wins - rows[0].losses - (team.wins - team.losses)) / 2;

        default:
          return cellValue;
      }
    },
    [rows]
  );

  return (
    <Table
      aria-label="Table with custom cells"
      isHeaderSticky
      className={`dark bg-gray-800 mx-auto rounded-full max-w-[800px] `}
      classNames={{
        base: `py-0 mb-3 mt-3 ${
          tabKey === 'league' ? 'max-h-[651px]' : 'max-h-[687px]'
        }`,
        th: 'text-white font-bold text-medium bg-gray-700 px-6',
        td: 'text-white w-1/5 px-6',
        wrapper: 'bg-gray-800 ',
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody items={rows} emptyContent={'No data found'}>
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
