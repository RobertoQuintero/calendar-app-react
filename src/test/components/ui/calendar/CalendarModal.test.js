import { mount } from "enzyme";
import { Provider } from "react-redux";
import moment from "moment";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import "@testing-library/jest-dom";
import CalendarModal from "../../../../components/calendar/CalendarModal";
import {
  eventStartUpdate,
  eventClearActiveEvent,
  eventStartAddNew,
} from "../../../../actions/events";
import { act } from "@testing-library/react";
import Swal from "sweetalert2";

jest.mock("../../../../actions/events", () => ({
  eventStartUpdate: jest.fn(),
  eventClearActiveEvent: jest.fn(),
  eventStartAddNew: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlus = now.clone().add(1, "hours").toDate();

const initState = {
  calendar: {
    events: [],
    activeEvent: {
      title: "Hola mundo",
      notes: "Algunas notas",
      start: now,
      end: nowPlus,
    },
  },
  auth: {
    uid: "123456",
    name: "Roberto",
  },
  ui: {
    modalOpen: true,
  },
};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

describe("Pruebas en <CalendarModal />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("Debe mostrarse correctamente", () => {
    expect(wrapper.find("Modal").prop("isOpen")).toBe(true);
  });

  test("debe llama la acción de actualizar y cerrar modal", () => {
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(eventStartUpdate).toHaveBeenCalledWith(
      initState.calendar.activeEvent
    );
    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test("debe mostrar error si falta el titulo", () => {
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(wrapper.find('input[name="title"]').hasClass("is-invalid")).toBe(
      true
    );
  });

  test("debe de crear un nuevo evento", () => {
    const initState = {
      calendar: {
        events: [],
        activeEvent: null,
      },
      auth: {
        uid: "123456",
        name: "Roberto",
      },
      ui: {
        modalOpen: true,
      },
    };
    const store = mockStore(initState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );
    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "Hola Pruebas",
      },
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });
    expect(eventStartAddNew).toHaveBeenCalledWith({
      end: expect.anything(),
      start: expect.anything(),
      title: "Hola Pruebas",
      notes: "",
    });
    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test("debe de validar las fechas", () => {
    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "Hola Pruebas",
      },
    });
    const hoy = new Date();

    act(() => {
      wrapper.find("DateTimePicker").at(1).prop("onChange")(hoy);
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "La fecha fin debe ser mayor a la fecha de inicio",
      "error"
    );
  });
});
