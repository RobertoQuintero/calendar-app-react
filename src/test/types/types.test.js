import { types } from "../../types/types";

describe("Pruebas en types", () => {
  test("los types deben de ser iguales", () => {
    expect(types).toEqual({
      uiOpenModal: "[ui] Open Modal",
      uiCloseModal: "[ui] Close Modal",

      eventLogout: "[event] Logout",
      eventSetActive: "[event] SetActive",
      eventAddNew: "[event] Add new",
      eventStartAddnew: "[event] Start add new",
      clearActiveEvent: "[event] Clear active event",
      eventUpdated: "[event] Event updated",
      eventDeleted: "[event] Event deleted",
      eventLoaded: "[event] Event loaded",

      authCheckingFinish: "[auth] Finish Checking login state",
      authStartLogin: "[auth] Start Login",
      authLogin: "[auth] Login",
      authStartRegister: "[auth] Start register",
      authStartTokenRenew: "[auth] Start token renew",
      authLogout: "[auth] Logout",
    });
  });
});
