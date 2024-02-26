import { Fragment } from "react";

export default function NextUITable({ columns, rows, tabKey }) {
  console.log(tabKey);
  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full">
            <thead className="bg-gray-900">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-200 sm:pl-3"
                  >
                    {column.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-gray-900">
              {rows.map((location, index) => (
                <Fragment key={index}>
                  <tr className="border-t border-gray-200"></tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
