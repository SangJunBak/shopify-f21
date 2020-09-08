import { findAndReplaceByKey } from "helpers/immutable";
import { useLocallyPersistedReducer } from "hooks/useLocalStorage";
import produce, { Draft } from "immer";
import React, { Dispatch, useMemo } from "react";
import { Movie } from "types/movie";
import { pull } from "lodash";

type State = {
  nominationsByID: Record<string, Movie>;
  allNominations: string[];
};
type Action =
  | {
      type: "APPEND_NOMINATION";
      payload: {
        movie: Movie;
      };
    }
  | {
      type: "REMOVE_NOMINATION_BY_ID";
      payload: {
        id: string;
      };
    }
  | {
      type: "REPLACE_NOMINATION_BY_ID";
      payload: {
        targetID: string;
        movie: Movie;
      };
    };
type NominationsProviderProps = { children: React.ReactNode };
const NominationsStateContext = React.createContext<State | undefined>(
  undefined
);
const NominationsDispatchContext = React.createContext<
  Dispatch<Action> | undefined
>(undefined);

const initialState = {
  nominationsByID: {},
  allNominations: [],
};

function isAtMaxCapacity(allNominations: string[]) {
  return allNominations.length >= 5;
}

const nominationsReducer = produce((state: Draft<State>, action: Action) => {
  switch (action.type) {
    case "APPEND_NOMINATION": {
      const {
        payload: { movie },
      } = action;
      if (isAtMaxCapacity(state.allNominations)) {
        console.error("At max capacity");
        return;
      }
      state.nominationsByID[movie.id] = movie;
      state.allNominations.push(movie.id);
      return;
    }
    case "REMOVE_NOMINATION_BY_ID": {
      const {
        payload: { id },
      } = action;
      delete state.nominationsByID[id];
      pull(state.allNominations, id);
      return;
    }
    case "REPLACE_NOMINATION_BY_ID": {
      if (!isAtMaxCapacity(state.allNominations)) {
        console.error("Shouldn't replace if we're not at max capacity");
        return;
      }
      const {
        payload: { targetID, movie },
      } = action;
      delete state.nominationsByID[targetID];
      state.nominationsByID[targetID] = movie;
      state.allNominations = findAndReplaceByKey(
        state.allNominations,
        targetID,
        movie.id
      );
      return;
    }
    default:
      return;
  }
});

function NominationsProvider(props: NominationsProviderProps) {
  const [nominations, dispatchNominations] = useLocallyPersistedReducer<
    State,
    Action
  >(nominationsReducer, initialState, "nominations");
  return (
    <NominationsStateContext.Provider value={nominations}>
      <NominationsDispatchContext.Provider value={dispatchNominations}>
        {props.children}
      </NominationsDispatchContext.Provider>
    </NominationsStateContext.Provider>
  );
}

function useNominationsState() {
  const nominationsState = React.useContext(NominationsStateContext);
  if (typeof nominationsState === undefined) {
    throw new Error(
      "useNominationsState must be used within a NominationsProvider"
    );
  }

  const nominations: Movie[] = useMemo(
    () =>
      nominationsState?.allNominations.map(
        (id) => nominationsState?.nominationsByID[id]
      ) ?? [],
    [nominationsState]
  );

  const isAtMaxCapacityMemo = useMemo(
    () => isAtMaxCapacity(nominationsState?.allNominations || []),
    [nominationsState]
  );

  return {
    nominationsByID: nominationsState?.nominationsByID ?? {},
    allNominations: nominationsState?.allNominations ?? [],
    nominations,
    isAtMaxCapacity: isAtMaxCapacityMemo,
  };
}

function useNominationsDispatch() {
  const nominationsDispatch = React.useContext(NominationsDispatchContext);
  if (typeof nominationsDispatch === undefined) {
    throw new Error(
      "useNominationsDispatch must be used within a NominationsProvider"
    );
  }
  return nominationsDispatch;
}

export { NominationsProvider, useNominationsState, useNominationsDispatch };
