import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";

const DeleteDialog = ({ onDelete }: { onDelete: () => void }) => {
  const { confirm } = Modal;

  const handleClick = () => {
    confirm({
      title: "Estas seguro que quieres borrar el menu ?",
      icon: <ExclamationCircleFilled />,

      onOk() {
        onDelete();
      },
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
