import React, { Dispatch, SetStateAction } from "react";

type State = {
  isMenuOpen: boolean;
};
type MenuProviderProps = { children: React.ReactNode };
const initialState = {
  isMenuOpen: false,
};

const MenuStateContext = React.createContext<State | undefined>(undefined);
const MenuActionsContext = React.createContext<
  Dispatch<SetStateAction<State>> | undefined
>(undefined);

function MenuProvider(props: MenuProviderProps) {
  const [menu, setMenu] = React.useState<State>(initialState);
  return (
    <MenuStateContext.Provider value={menu}>
      <MenuActionsContext.Provider value={setMenu}>
        {props.children}
      </MenuActionsContext.Provider>
    </MenuStateContext.Provider>
  );
}

function useMenuState() {
  const menuState = React.useContext(MenuStateContext);
  if (typeof menuState === undefined) {
    throw new Error("useMenuState must be used within a MenuProvider");
  }
  return menuState;
}

function useMenuActions() {
  const setMenu = React.useContext(MenuActionsContext);
  if (typeof setMenu === undefined) {
    throw new Error("useMenuActions must be used within a MenuProvider");
  }

  const openMenu = React.useCallback(
    () =>
      setMenu?.((state) => ({
        ...state,
        isMenuOpen: true,
      })),
    [setMenu]
  );
  const closeMenu = React.useCallback(
    () =>
      setMenu?.((state) => ({
        ...state,
        isMenuOpen: true,
      })),
    [setMenu]
  );
  const toggleMenu = React.useCallback(
    () =>
      setMenu?.((state) => ({
        ...state,
        isMenuOpen: !state.isMenuOpen,
      })),
    [setMenu]
  );

  return {
    openMenu,
    closeMenu,
    toggleMenu,
  };
}

export { MenuProvider, useMenuState, useMenuActions };
