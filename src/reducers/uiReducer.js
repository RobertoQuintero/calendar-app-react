import { types } from "../types/types";

const initilState = {
  modalOpen: false,
};

export const uiReducer = (state = initilState, action) => {
  switch (action.type) {
    case types.uiOpenModal:
      return {
        ...state,
        modalOpen: true,
      };
    case types.uiCloseModal:
      return {
        ...state,
        modalOpen: false,
      };

    default:
      return state;
  }
};