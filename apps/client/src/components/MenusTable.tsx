import styled from "styled-components";
import { Flex, Image, Table, TableColumnsType, TableProps } from "antd";

const StyledImage = styled(Image)`
  object-fit: cover;
`;

interface DataType {
  id: number;
  imageUrl: string;
  description: string;
  name: string;
  price: number;
}

interface MenusTableProps {
  data: DataType[];
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Image",
    dataIndex: "imageUrl",
    render: (imageUrl: string) => <StyledImage width={100} src={imageUrl} />,
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
];

const rowSelection: TableProps<DataType>["rowSelection"] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};

export const MenusTable = ({ data }: MenusTableProps) => {
  return (
    <Table<DataType>
      rowKey={"id"}
      rowSelection={{ type: "radio", ...rowSelection }}
      dataSource={data}
      columns={columns}
    />
  );
};
