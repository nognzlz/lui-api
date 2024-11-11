import { Flex, Typography } from "antd";
import "./App.css";
import { Header } from "./components/Header";
import { useEffect, useState } from "react";
import { MenusTable } from "./components/MenusTable";

function App() {
  const { Title, Text } = Typography;
  const [menus, setMenus] = useState([]);

  const initData = async () => {
    setMenus(await fetch("/api/menu").then((res) => res.json()));
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <>
      <Header
        logo={
          <Flex justify="center" align="center">
            <img
              style={{ height: "76px", marginRight: "8px" }}
              src="logo.png"
            />
            <Title style={{ margin: "10px" }}>Lui Admin</Title>
          </Flex>
        }
      />
      <Flex justify="center" style={{ width: "100%" }}>
        <MenusTable data={menus} />
      </Flex>
    </>
  );
}

export default App;
