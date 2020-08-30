import {
  Reducer,
  ReducerAction,
  ReducerState,
  ReducerStateWithoutAction,
  ReducerWithoutAction,
  useEffect,
  useReducer,
} from "react";

// Source: Derived from https://usehooks.com/useLocalStorage/
export function useLocallyPersistedReducer<
  S extends ReducerState<any>,
  A extends ReducerAction<any>
>(
  reducer: Reducer<S, A>,
  defaultState: S,
  storageKey: string,
  init?: (arg: S) => S
) {
  const reducerInstance = useReducer(reducer, defaultState, (defaultState) => {
    try {
      const persisted = localStorage.getItem(storageKey);
      return persisted
        ? JSON.parse(persisted)
        : init !== undefined
        ? init(defaultState)
        : defaultState;
    } catch (error) {
      console.log(error);
      return defaultState;
    }
  });

  const persisted = reducerInstance[0];

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(persisted));
    } catch (error) {
      console.log(error);
    }
  }, [storageKey, persisted]);

  return reducerInstance;
}
