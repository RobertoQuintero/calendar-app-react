import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe("Pruebas en authReducer", () => {
  const initialState = {
    checking: true,
  };

  test("debe retornar el estado por defecto", () => {
    const state = authReducer(initialState, {});

    expect(state).toEqual(initialState);
  });

  test("debe retornar el estado de authLogin", () => {
    const action = {
      type: types.authLogin,
      payload: {
        uid: "123456",
        name: "Roberto",
      },
    };
    const state = authReducer(initialState, action);

    expect(state).toEqual({ ...action.payload, checking: false });
  });
});
