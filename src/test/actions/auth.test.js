import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import thunk from "redux-thunk";
import { startChecking, startLogin, startRegister } from "../../actions/auth";
import { types } from "../../types/types";
import Swal from "sweetalert2";
import * as fetchModule from "../../helpers/fetch";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();
let token = "";

describe("Pruebas en las acciones Auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("startLogin correcto", async () => {
    await store.dispatch(startLogin("roberto@gmail.com", "123456"));

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
    token = localStorage.setItem.mock.calls[0][1];
  });

  test("startLogin incorrecto", async () => {
    await store.dispatch(startLogin("roberto@gmail.com", "12345678"));
    let actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalled();

    await store.dispatch(startLogin("robertos@gmail.com", "123456"));
    actions = store.getActions();

    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "No existe un usuario con ese correo",
      "error"
    );
  });

  test("startRegistro correcto", async () => {
    fetchModule.fetchSinToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          name: "carlos",
          token: "abc123abc123",
        };
      },
    }));
    await store.dispatch(startRegister("test3@test.com", "123456", "test3"));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "carlos",
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith("token", "abc123abc123");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("startChecking correcto", async () => {
    fetchModule.fetchConToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          name: "carlos",
          token: "abc123abc123",
        };
      },
    }));

    await store.dispatch(startChecking());
    const actions = store.getActions();
    console.log(actions);
    console.log(token);

    expect(localStorage.setItem).toHaveBeenCalledWith("token", "abc123abc123");
  });
});
