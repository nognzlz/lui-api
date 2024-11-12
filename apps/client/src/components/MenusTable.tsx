import styled from "styled-components";
import { Button, Flex, Image, Table, TableColumnsType, TableProps } from "antd";
import { Link } from "react-router-dom";
import { MenuType } from "../interfaces";

const StyledImage = styled(Image)`
  object-fit: cover;
`;

interface MenusTableProps {
  data: MenuType[];
  onMenuSelected: (menu: MenuType) => void;
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
    render: (price: number) => `$${price.toLocaleString("es-AR")}`,
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

const StyledTable = styled(Table<MenuType>)`
  width: 100%;
`;

export const MenusTable = ({ data, onMenuSelected }: MenusTableProps) => {
  const rowSelection: TableProps<MenuType>["rowSelection"] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: MenuType[]) => {
      onMenuSelected(selectedRows[0]);
    },
  };

  return (
    <StyledTable
      rowKey={"id"}
      rowSelection={{ type: "radio", ...rowSelection }}
      dataSource={data}
      columns={columns}
    />
  );
};
