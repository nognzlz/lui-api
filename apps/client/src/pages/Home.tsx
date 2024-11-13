import { Button, Flex, notification } from "antd";
import { useEffect, useState } from "react";
import { MenusTable } from "../components/MenusTable";
import { Card } from "../components/Card";
import { MenuType } from "../interfaces";
import { Link } from "react-router-dom";

function Home() {
  const [menus, setMenus] = useState<MenuType[]>([]);
  const [menu, setMenu] = useState<MenuType | undefined>();

  const initData = async () => {
    setMenus(await fetch("/api/menu").then((res) => res.json()));
  };

  useEffect(() => {
    initData();
  }, []);

  const handleChooseMenu = async () => {
    if (menu) {
      const response = await fetch(`/api/menu/${menu.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDaysMenu: true }),
      });

      const restOfTheMenus = menus.filter((m: MenuType) => m.id !== menu.id);

      const promises = restOfTheMenus.map((m: MenuType) =>
        fetch(`/api/menu/${m.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isDaysMenu: false }),
        })
      );

      if ((await Promise.all(promises)).every((res) => res.ok) && response.ok) {
        notification.success({
          message: "Menu del dia actualizado",
          description: "El menu del dia ha sido actualizado correctamente",
        });

        initData();
      }
    }
  };

  return (
    <>
      <Card>
        <Flex justify="center" vertical style={{ minWidth: "650px" }} gap={20}>
          <Flex justify="flex-end" gap={10}>
            <Link to="/add">
              <Button type="primary">Agregar menu</Button>
            </Link>
            {menu && (
              <Button type="primary" onClick={handleChooseMenu}>
                Elejir como menu del dia
              </Button>
            )}
          </Flex>
          <Flex>
            <MenusTable data={menus} onMenuSelected={setMenu} />
          </Flex>
        </Flex>
      </Card>
    </>
  );
}

export default Home;
