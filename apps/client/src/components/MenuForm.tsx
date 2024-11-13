import { Form, Input, Image, Flex, Button, FormInstance } from "antd";
import { MenuType } from "../interfaces";
import { Link } from "react-router-dom";

interface MenuFormProps {
  form: FormInstance<any> | undefined;
  data?: MenuType;
  onSubmit: () => void;
}

const MenuForm = ({ form, data, onSubmit }: MenuFormProps) => {
  return (
    <Form
      form={form}
      style={{ width: "100%" }}
      layout="vertical"
      initialValues={data}
      onFinish={onSubmit}
    >
      <Form.Item<MenuType>
        label="Nombre del menu"
        name="name"
        rules={[{ required: true, message: "Campo obligatorio" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<MenuType>
        label="Precio"
        name="price"
        rules={[{ required: true, message: "Campo obligatorio" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<MenuType>
        label="Descripción"
        name="description"
        rules={[{ required: false }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<MenuType>
        label="Imagen"
        name="imageUrl"
        rules={[{ required: true, message: "Campo obligatorio" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Image width={200} src={data?.imageUrl} />
      </Form.Item>
      <Form.Item>
        <Flex gap={12}>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
          <Link to="/">
            <Button type="default" htmlType="button">
              Cancelar
            </Button>
          </Link>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default MenuForm;
