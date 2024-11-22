import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, Image, Flex, Typography } from "antd";
import { MenuType } from "../interfaces";

const DeleteDialog = ({
  onDelete,
  menu,
}: {
  onDelete: () => void;
  menu: MenuType;
}) => {
  const { confirm } = Modal;

  const handleClick = () => {
    confirm({
      title: `¿Estas seguro que quieres eliminar este menu?`,
      icon: <></>,

      content: (
        <Flex style={{ margin: "8px 0" }} align="top">
          <Image width={160} src={menu.imageUrl} preview={false} />
          <Flex vertical style={{ marginLeft: 16 }}>
            <Typography.Text style={{ fontWeight: 500 }}>
              {menu.name}
            </Typography.Text>
            <Typography.Text>{`$${menu.price.toLocaleString("es-AR")}`}</Typography.Text>
          </Flex>
        </Flex>
      ),

      onOk() {
        onDelete();
      },
      okText: (
        <Flex gap={4}>
          <DeleteOutlined />
          Eliminar
        </Flex>
      ),
      okType: "danger",
      okButtonProps: {
        type: "primary",
      },
      cancelText: (
        <Flex gap={4}>
          <CloseOutlined />
          Cancelar
        </Flex>
      ),
    });
  };

  return (
    <>
      <Tooltip placement="top" title="Eliminar">
        <Button
          onClick={handleClick}
          color="danger"
          variant="solid"
          icon={<DeleteOutlined />}
        />
      </Tooltip>

      {/* <Modal>
        
      </Modal> */}
    </>
  );
};

export default DeleteDialog;
