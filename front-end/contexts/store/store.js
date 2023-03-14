import create from "zustand";
import createContext from "zustand/context";
import merge from "lodash/merge";
import update from "lodash/update";
import unset from "lodash/unset";
import _set from "lodash/set";
import get from "lodash/get";
import removeEmptySlots from "@/contexts/store/utils/removeEmptySlots";

const {Provider, useStore} = createContext();

export {useStore};

export const SET = "SET";
export const ADD = "ADD";
export const REMOVE = "REMOVE";
export const UPDATE = "UPDATE";
export const REFRESH = "REFRESH";


const createStore = create((set) => ({
    action: (action) => set((state) => {
        const newState = {...state};
        const {type, path, payload} = action;

        switch (type) {
            case SET:
                if (path) {
                    _set(newState, path, payload);
                    return newState;
                } else return {app: state.app, ...payload};

            case ADD:
                let prev = get(newState, path);
                let next = action.prepend ? [payload, ...prev] : [...prev, payload];
                _set(newState, path, next);
                return newState;

            case REMOVE:
                unset(newState, path);
                return removeEmptySlots(newState, path);

            case UPDATE:
                return update(newState, path, (item) => merge(item, payload));

            case REFRESH:
                return merge(newState, {refresh: Math.random()});

            default:
                return state;
        }
    }, true)
}));

export const StoreProvider = ({children}) => {
    return (
        <Provider createStore={() => createStore}>
            {children}
        </Provider>
    );
};