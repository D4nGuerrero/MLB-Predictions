import { useCallback } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Input,
} from '@nextui-org/react';

export default function NextUITable({ columns, rows }) {
  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{
              radius: 'lg',
              src: user.logo,
              classNames: {
                base: 'bg-slate-200 p-1.5',
              },
              size: 'lg',
            }}
            description={user.displayName}
            name={cellValue}
            classNames={{
              name: 'text-white text-medium font-bold pl-2',
              description: 'text-slate-200 text-sm pl-2',
            }}
          />
        );

      case 'custom':
        return (
          <Input
            variant="bordered"
            type="text"
            classNames={{
              inputWrapper: 'bg-gray-700',
              input: 'text-white font-bold text-medium text-center',
            }}
            defaultValue="0"
          />
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      aria-label="Table with custom cells"
      isHeaderSticky
      className="dark"
      classNames={{
        base: 'py-0 mb-3 max-h-[665px] mt-3 w-full',
        th: 'text-white font-bold text-medium bg-gray-700 px-6',
        td: 'text-white w-1/5 px-6',
        wrapper: 'bg-gray-800 ',
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody items={rows} emptyContent={'No data found'}>
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
