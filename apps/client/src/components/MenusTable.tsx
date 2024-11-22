import styled from "styled-components";
import {
  Button,
  Flex,
  Image,
  Table,
  TableColumnsType,
  TableProps,
  Tooltip,
} from "antd";
import { Link } from "react-router-dom";
import { MenuType } from "../interfaces";
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import DeleteDialog from "./DeleteDialog";
import api from "../service/api";

const StyledImage = styled(Image)`
  object-fit: cover;
`;

interface MenusTableProps {
  data: MenuType[];
  onMenuSelected: (menu: MenuType) => void;
}

const handleDelete = async (id: number) => {
  await api.fetchApi({
    method: "DELETE",
    url: `/api/menu/${id}`,
  });
};

const StyledTable = styled(Table<MenuType>)`
  width: 100%;
`;

export const MenusTable = ({ data, onMenuSelected }: MenusTableProps) => {
  const columns: TableColumnsType<MenuType> = [
    {
      title: "Imagen",
      dataIndex: "imageUrl",
      render: (imageUrl: string) => <StyledImage width={100} src={imageUrl} />,
    },
    {
      title: "Nombre",
      dataIndex: "name",
    },
    {
      title: "Precio",
      dataIndex: "price",
      render: (price: number) => `$${price.toLocaleString("es-AR")}`,
    },
    {
      align: "center",
      title: "Activo",
      dataIndex: "isDaysMenu",
      render: (isDaysMenu: boolean) => (
        <p>
          {isDaysMenu ? (
            <CheckOutlined style={{ color: "#6EC531", fontSize: "20px" }} />
          ) : (
            <CloseOutlined style={{ color: "#ED1C24", fontSize: "20px" }} />
          )}
        </p>
      ),
    },
    {
      align: "center",
      title: "Acciones",
      dataIndex: "id",
      render: (id: number) => (
        <Flex gap={4}>
          <Link to={`/edit/${id}`}>
            <Tooltip placement="top" title="Editar">
              <Button type="primary" icon={<EditOutlined />} />
            </Tooltip>
          </Link>
          <DeleteDialog
            menu={data.find((menu) => menu.id === id!)!}
            onDelete={() => {
              handleDelete(id);
            }}
          />
        </Flex>
      ),
    },
  ];

  const rowSelection: TableProps<MenuType>["rowSelection"] = {
    onChange: (_, selectedRows: MenuType[]) => {
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
