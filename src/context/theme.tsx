import React, { Dispatch, SetStateAction } from "react";

type State = {
  isMenuOpen: boolean;
};
type MenuProviderProps = { children: React.ReactNode };
const initialState = {
  isMenuOpen: false,
};

const MenuStateContext = React.createContext<State | undefined>(undefined);
const MenuUpdaterContext = React.createContext<
  Dispatch<SetStateAction<State>> | undefined
>(undefined);

function MenuProvider(props: MenuProviderProps) {
  const [ui, setMenu] = React.useState<State>(initialState);
  return (
    <MenuStateContext.Provider value={ui}>
      <MenuUpdaterContext.Provider value={setMenu}>
        {props.children}
      </MenuUpdaterContext.Provider>
    </MenuStateContext.Provider>
  );
}

function useMenuState() {
  const uiState = React.useContext(MenuStateContext);
  if (typeof uiState === undefined) {
    throw new Error("useMenuState must be used within a MenuProvider");
  }
  return uiState;
}

function useMenuActions() {
  const setMenu = React.useContext(MenuUpdaterContext);
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
