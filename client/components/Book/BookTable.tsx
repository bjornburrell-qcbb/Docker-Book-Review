import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";

import { useMemo } from "react";

// import { TABLE_TRUNC } from "consts/truncations";
// import type { OrderCompleteFragment } from "generated/graphql";
// import { formatDate } from "utils/dates";
// import { truncateString } from "utils/strings";

const TABLE_TRUNC = 40;
export function truncateString(str: string | undefined | null, num: number) {
    if (!str) {
      return "";
    }
  
    return str.length > num ? str.slice(0, num) + "..." : str;
  }

// eslint-disable-next-line react/prop-types
function BookTable({ books }: any) {
  const dataSource = useMemo(
    () => books.map(book => ({ key: book.id, ...book })),
    [books],
  );

  

//   const onRow: GetComponentProps<OrderCompleteFragment> = useCallback(
//     record => ({
//       onDoubleClick: () => router.push(`/orders/${record.id}`),
//     }),
//     [],
//   );

  const columns: ColumnsType = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
      render: isbn => truncateString(isbn, TABLE_TRUNC),
    },
    {
      title: "Publisher",
      dataIndex: "publisher",
      key: "publisher",
      render: publisher => truncateString(publisher, TABLE_TRUNC),
    },
    {
      title: "Number of Pages",
      dataIndex: "pageNumbers",
      key: "pageNumbers",
      render: (pageNumbers) => truncateString(pageNumbers, TABLE_TRUNC),
    },
    {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        render: (quantity) => truncateString(quantity, TABLE_TRUNC)
    }

  ];

  return (
    <div className="relative">
      <Table
        dataSource={dataSource}
        columns={columns}
        // onRow={onRow}
        className="cleanAntdTable"
        pagination={{
          // eslint-disable-next-line unicorn/explicit-length-check
          total: dataSource.length || 1,
        }}
      />
      
    </div>
  );
}

export default BookTable;
