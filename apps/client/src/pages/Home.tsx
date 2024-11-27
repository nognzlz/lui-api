import { Button, Flex, notification } from "antd";
import { useEffect, useReducer } from "react";
import { MenusTable } from "../components/MenusTable";
import { Card } from "../components/Card";
import { MenuType } from "../interfaces";
import { Link } from "react-router-dom";
import api from "../service/api";

type StateType = {
  menus: MenuType[];
  selectedMenu: MenuType | undefined;
  loading: boolean;
};

enum ActionType {
  FinishMenusFetch, // Finish fetching the menus
  StartMenusUpdate, // Start updating the menus
  FinishMenusUpdate, // Finish updating the menus
  ChangeSelectedMenu, // Change the selected menu
}

type HomeAction = {
  type: ActionType;
  payload?: {
    menus?: MenuType[];
    updatedMenus?: MenuType[];
    selectedMenu?: MenuType;
  };
};

const HomeReducer = (state: StateType, action: HomeAction) => {
  switch (action.type) {
    case ActionType.FinishMenusFetch:
      return {
        ...state,
        menus: action.payload?.menus || [],
        loading: false,
      };
    case ActionType.StartMenusUpdate:
      return {
        ...state,
        loading: true,
      };
    case ActionType.FinishMenusUpdate:
      return {
        ...state,
        menus: state.menus.map((menu) => {
          const updatedMenu = action.payload?.updatedMenus?.find(
            (updatedMenu) => updatedMenu.id === menu.id
          );
          return updatedMenu || menu;
        }),
        loading: false,
      };
    case ActionType.ChangeSelectedMenu:
      return {
        ...state,
        selectedMenu: action.payload?.selectedMenu,
      };
    default:
      return state;
  }
};

function Home() {
  const [{ menus, selectedMenu, loading }, dispatch] = useReducer(HomeReducer, {
    menus: [],
    selectedMenu: undefined,
    loading: true,
  });

  const initData = async () => {
    const menus = await api.fetchApi<MenuType[]>({
      url: "/api/menu",
      method: "GET",
    });
    dispatch({
      type: ActionType.FinishMenusFetch,
      payload: { menus },
    });
  };

  const clearPreviousMenu = async (menus: MenuType[]) => {
    dispatch({
      type: ActionType.StartMenusUpdate,
    });

    const updatedMenus = await Promise.all(
      menus.map((menu) => {
        return api.fetchApi<MenuType>({
          url: `/api/menu/${menu.id}`,
          method: "PATCH",
          body: { isDaysMenu: false },
        });
      })
    );

    dispatch({
      type: ActionType.FinishMenusUpdate,
      payload: { updatedMenus },
    });
  };

  const handleChooseMenu = async () => {
    if (selectedMenu) {
      try {
        const prevMenus = await api.fetchApi<MenuType[]>({
          url: `/api/menu?isDaysMenu=true`,
          method: "GET",
        });

        await clearPreviousMenu(prevMenus);

        dispatch({
          type: ActionType.StartMenusUpdate,
        });
        const updatedMenu = await api.fetchApi<MenuType>({
          url: `/api/menu/${selectedMenu.id}`,
          method: "PATCH",
          body: { isDaysMenu: true },
        });

        dispatch({
          type: ActionType.FinishMenusUpdate,
          payload: { updatedMenus: [updatedMenu] },
        });

        notification.success({
          message: "Menu del dia",
          description: "Menu del dia actualizado",
        });
      } catch (error) {
        notification.error({
          message: "Error",
          description:
            "Ocurrio un error al intentar actualizar el menu del dia",
        });
      }
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <>
      <Card>
        <Flex justify="center" vertical style={{ minWidth: "650px" }} gap={20}>
          <Flex justify="flex-end" gap={10}>
            <Link to="/add">
              <Button type="primary">Agregar menu</Button>
            </Link>
            {selectedMenu && (
              <Button type="primary" onClick={handleChooseMenu}>
                Elejir como menu del dia
              </Button>
            )}
          </Flex>
          <Flex>
            <MenusTable
              data={menus}
              onMenuSelected={(menu) =>
                dispatch({
                  type: ActionType.ChangeSelectedMenu,
                  payload: { selectedMenu: menu },
                })
              }
              refetch={initData}
              loading={loading}
            />
          </Flex>
        </Flex>
      </Card>
    </>
  );
}

export default Home;
