import {
  Button,
  Flex,
  Form,
  Input,
  Spin,
  Typography,
  Image,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MenuType } from "../interfaces";
import { Card } from "../components/Card";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  const [data, setData] = useState<MenuType>();
  const { Title } = Typography;
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const response = await fetch(`/api/menu/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.getFieldsValue()), // Convierte formValues a JSON
    });

    if (response.ok) {
      notification.success({
        message: "Menu actualizado",
        description: "El menu ha sido actualizado correctamente",
      });
      navigate("/");
    } else {
      notification.error({
        message: "Error",
        description: "Ha ocurrido un error al actualizar el menu",
      });
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

  const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    min-width: 650px;
    padding: 0 20px;
  `;

  return (
    data && (
      <Card>
        <StyledContainer>
          <Title>Editar menu</Title>
          <Form
            form={form}
            style={{ width: "100%" }}
            layout="vertical"
            initialValues={data}
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
        </StyledContainer>
      </Card>
    )
  );
}

export default Edit;
