import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import "@testing-library/jest-dom";
import AppRouter from "../../routers/AppRouter";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Pruebs en <AppRouter />", () => {
  test("Debe mostrarse correctamente", () => {
    const initState = {
      auth: {
        checking: true,
      },
    };

    const store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("h5").exists()).toBe(true);
  });

  test("Debe motrar la ruta publica", () => {
    const initState = {
      auth: {
        checking: false,
        uid: null,
      },
    };

    const store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".login-container").exists()).toBe(true);
  });

  test("Debe motrar la ruta privada", () => {
    const initState = {
      calendar: {
        events: [],
      },
      auth: {
        checking: false,
        uid: "123",
        name: "Roberto",
      },
      ui: {
        modalOpen: false,
      },
    };

    const store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".calendar-screen").exists()).toBe(true);
  });
});
