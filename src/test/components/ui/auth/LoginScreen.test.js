import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import "@testing-library/jest-dom";
import LoginScreen from "../../../../components/auth/LoginScreen";
import { startLogin, startRegister } from "../../../../actions/auth";
import Swal from "sweetalert2";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

jest.mock("../../../../actions/auth", () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("Pruebas en <LoginScreen />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe mostrarse correctament", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe llamar el dispatch del login", () => {
    wrapper.find('input[name="lEmail"]').simulate("change", {
      target: {
        name: "lEmail",
        value: "juan@gmail.com",
      },
    });

    wrapper.find('input[name="lPassword"]').simulate("change", {
      target: {
        name: "lPassword",
        value: "123456",
      },
    });

    wrapper.find("form").at(0).prop("onSubmit")({
      preventDefault() {},
    });
    expect(startLogin).toHaveBeenCalledWith("juan@gmail.com", "123456");
  });

  test("no hay registro si las contraseñas son diferentes", () => {
    wrapper.find('input[name="rPassword"]').simulate("change", {
      target: {
        name: "rPassword",
        value: "123456",
      },
    });

    wrapper.find('input[name="rPassword2"]').simulate("change", {
      target: {
        name: "rPassword2",
        value: "1234567",
      },
    });

    wrapper.find("form").at(1).prop("onSubmit")({ preventDefault() {} });
    expect(startRegister).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Las contraseñas deben ser iguales"
    );
  });

  test("registro con contraseñas iguales", () => {
    wrapper.find('input[name="rPassword"]').simulate("change", {
      target: {
        name: "rPassword",
        value: "123456",
      },
    });

    wrapper.find('input[name="rPassword2"]').simulate("change", {
      target: {
        name: "rPassword2",
        value: "123456",
      },
    });

    wrapper.find("form").at(1).prop("onSubmit")({ preventDefault() {} });

    expect(Swal.fire).not.toHaveBeenCalledWith();
    expect(startRegister).toHaveBeenCalled();
  });
});
