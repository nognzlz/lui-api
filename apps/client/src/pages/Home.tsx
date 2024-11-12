import { Flex } from "antd";
import { useEffect, useState } from "react";
import { MenusTable } from "../components/MenusTable";

function Home() {
  const [menus, setMenus] = useState([]);

  const initData = async () => {
    setMenus(await fetch("/api/menu").then((res) => res.json()));
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <>
      <Flex justify="center" style={{ width: "100%" }}>
        <MenusTable data={menus} />
      </Flex>
    </>
  );
}

export default Home;
