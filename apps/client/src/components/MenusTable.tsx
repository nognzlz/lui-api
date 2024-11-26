import styled from "styled-components";
import {
  Button,
  Flex,
  Image,
  notification,
  Switch,
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
import { useState, useEffect } from "react";

const StyledImage = styled(Image)`
  object-fit: cover;
`;

interface MenusTableProps {
  data: MenuType[];
  onMenuSelected: (menu: MenuType) => void;
  refetch: () => void;
  loading: boolean;
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

export const MenusTable = ({
  data,
  onMenuSelected,
  refetch,
  loading,
}: MenusTableProps) => {
  const [menus, setMenus] = useState<MenuType[]>(data);
  const [loadingSoldOutMenu, setLoadingSoldOutMenu] = useState<number>();

  const handleSoldOutChange = async (id: number, checked: boolean) => {
    setLoadingSoldOutMenu(id);

    const updatedMenus = menus.map((menu) =>
      menu.id === id ? { ...menu, soldOut: checked } : menu
    );
    setMenus(updatedMenus);

    try {
      await api.fetchApi({
        method: "PATCH",
        url: `/api/menu/${id}`,
        body: { soldOut: checked },
      });

      setLoadingSoldOutMenu(undefined);

      refetch();

      notification.success({
        message: "Menú actualizado",
        description: "El menú ha sido actualizado correctamente",
      });
    } catch (error) {
      setLoadingSoldOutMenu(undefined);

      notification.error({
        message: "Error",
        description: "Ha ocurrido un error al actualizar el menú",
      });
    }
  };

  useEffect(() => {
    setMenus(data);
  }, [data]);

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
        <div>
          {isDaysMenu ? (
            <CheckOutlined style={{ color: "#6EC531", fontSize: "20px" }} />
          ) : (
            <CloseOutlined style={{ color: "#ED1C24", fontSize: "20px" }} />
          )}
        </div>
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
              refetch();
            }}
          />
        </Flex>
      ),
    },
    {
      title: "Agotado",
      dataIndex: "soldOut",
      render: (soldOut: boolean, { id }: MenuType) => (
        <Switch
          checked={soldOut}
          onChange={(checked) => handleSoldOutChange(id, checked)}
        />
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
      dataSource={menus}
      columns={columns}
      loading={loading || loadingSoldOutMenu !== undefined}
    />
  );
};
