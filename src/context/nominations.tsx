import {
  filterArrayByKey,
  filterObjectByKey,
  findAndReplaceByKey,
} from "helpers/immutable";
import { useLocallyPersistedReducer } from "hooks/useLocalStorage";
import React, { Dispatch } from "react";
import { Movie } from "types/movie";

type State = {
  nominationsByID: {
    [key: string]: Movie;
  };
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
        id: string;
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

function nominationsReducer(state: State, action: Action) {
  switch (action.type) {
    case "APPEND_NOMINATION": {
      const {
        payload: { movie },
      } = action;
      if (isAtMaxCapacity(state.allNominations)) {
        return state;
      }
      return {
        ...state,
        nominationsByID: {
          ...state.nominationsByID,
          [movie.id]: movie,
        },
        allNominations: [...state.allNominations, movie.id],
      };
    }
    case "REMOVE_NOMINATION_BY_ID": {
      const {
        payload: { id },
      } = action;

      return {
        ...state,
        nominationsByID: filterObjectByKey<Movie>(state.nominationsByID, id),
        allNominations: filterArrayByKey<string>(state.allNominations, id),
      };
    }
    case "REPLACE_NOMINATION_BY_ID": {
      if (!isAtMaxCapacity(state.allNominations)) {
        return state;
      }
      const {
        payload: { id, movie },
      } = action;

      const newNominationsByID = filterObjectByKey<Movie>(
        state.nominationsByID,
        id
      );
      newNominationsByID[id] = movie;
      return {
        ...state,
        nominationsByID: newNominationsByID,
        allNominations: findAndReplaceByKey<string>(
          state.allNominations,
          id,
          movie.id
        ),
      };
    }
    default:
      return state;
  }
}

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
  return nominationsState;
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
