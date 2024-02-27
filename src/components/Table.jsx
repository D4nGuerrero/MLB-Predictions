import { useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Input,
} from "@nextui-org/react";

export default function NextUITable({ columns, rows, tabKey }) {
  const renderCell = useCallback((user, columnKey) => {
    console.log(user);
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex w-[220px] mt-2">
            <img
              src={user.logo}
              alt={user.displayName}
              className="h-11 w-11 rounded-lg bg-slate-200 p-1"
            />
            <div className="ml-4">
              <p className="text-white text-medium font-bold">{cellValue}</p>
              <p className="text-slate-200 text-sm">{user.displayName}</p>
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
              input: "text-white font-bold text-medium text-center",
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
      className={`dark bg-gray-800 mx-auto rounded-full ${
        tabKey === "league" ? "max-w-[880px]" : "max-w-[800px]"
      }`}
      classNames={{
        base: `py-0 mb-3 mt-3 ${
          tabKey === "league" ? "max-h-[651px]" : "max-h-[687px]"
        }`,
        th: "text-white font-bold text-medium bg-gray-700 px-6",
        td: "text-white w-1/5 px-6",
        wrapper: "bg-gray-800",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody items={rows} emptyContent={"No data found"}>
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
