import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";

const initState = {
  modalOpen: false,
};

describe("Pruebas en uiReducer", () => {
  test("debe de retornar el estado por defecto", () => {
    const state = uiReducer(initState, {});
    expect(state).toEqual(initState);
  });

  test("debe abrir y cerrar el modal", () => {
    const modalOpen = uiOpenModal();
    const state = uiReducer(initState, modalOpen);
    expect(state).toEqual({ modalOpen: true });

    const modalCLose = uiCloseModal();
    const stateClose = uiReducer(state, modalCLose);

    expect(stateClose).toEqual({ modalOpen: false });
  });
});
