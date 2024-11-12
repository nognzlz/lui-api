import styled from "styled-components";
import { Button, Flex, Image, Table, TableColumnsType, TableProps } from "antd";
import { Link } from "react-router-dom";
import { MenuType } from "../interfaces";

const StyledImage = styled(Image)`
  object-fit: cover;
`;

interface MenusTableProps {
  data: MenuType[];
}

const handleEdit = (id: number) => {
  console.log("Edit", id);
};

const columns: TableColumnsType<MenuType> = [
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
  {
    title: "Acciones",
    dataIndex: "id",
    render: (id: number) => (
      <Link to={`/edit/${id}`}>
        <Button type="primary" onClick={() => handleEdit(id)}>
          Editar
        </Button>
      </Link>
    ),
  },
];

const rowSelection: TableProps<MenuType>["rowSelection"] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: MenuType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};

export const MenusTable = ({ data }: MenusTableProps) => {
  return (
    <Table<MenuType>
      rowKey={"id"}
      rowSelection={{ type: "radio", ...rowSelection }}
      dataSource={data}
      columns={columns}
    />
  );
};
