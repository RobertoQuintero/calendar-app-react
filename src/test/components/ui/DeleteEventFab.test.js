import { mount } from "enzyme";
import { Provider } from "react-redux";
import DeleteEventFab from "../../../components/ui/DeleteEventFab";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import "@testing-library/jest-dom";
import { eventStartDelted } from "../../../actions/events";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>
);
jest.mock("../../../actions/events", () => ({
  eventStartDelted: jest.fn(),
}));

describe("Pruebas en <DeleteEventFab/>", () => {
  test("Mostar correctamente el componente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe llamar el eventStartDelete al hace click", () => {
    wrapper.find(".btn").prop("onClick")();

    expect(eventStartDelted).toHaveBeenCalled();
  });
});
