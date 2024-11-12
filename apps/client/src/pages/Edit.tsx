import { Button, Flex, Form, Input, Spin, Typography, Image } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MenuType } from "../interfaces";

function Edit() {
  const { id } = useParams();
  const [data, setData] = useState<MenuType>();
  const { Title } = Typography;

  const [form] = Form.useForm();

  const [formValues, setFormValues] = useState<MenuType>();

  const handleChanges = (changedValues: MenuType) => {
    setFormValues({ ...formValues, ...changedValues });
  };

  const handleSubmit = async () => {
    const response = await fetch(`/api/menu/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues), // Convierte formValues a JSON
    });

    if (response.ok) {
      alert("Menu actualizado");
    } else {
      alert("Error al actualizar el menu");
    }
  };

  function dataIsValid(data: MenuType): data is MenuType {
    return (
      typeof data.id === "number" &&
      typeof data.name === "string" &&
      typeof data.price === "number" &&
      typeof data.imageUrl === "string" &&
      typeof data.description === "string"
    );
  }

  const initData = async () => {
    const menu = await fetch(`/api/menu/${id}`).then((res) => res.json());

    if (dataIsValid(menu)) {
      setData(menu);
    } else {
      throw new Error("Invalid data");
    }
  };

  useEffect(() => {
    initData();
  }, []);

  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    data && (
      <Flex vertical style={{ padding: "20px 100px" }}>
        <Title>Editar menu</Title>
        <Form
          form={form}
          style={{ maxWidth: "600px" }}
          layout="vertical"
          initialValues={data}
          onValuesChange={handleChanges}
          onFinish={handleSubmit}
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
            <Image width={200} src={data.imageUrl} />
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
      </Flex>
    )
  );
}

export default Edit;
