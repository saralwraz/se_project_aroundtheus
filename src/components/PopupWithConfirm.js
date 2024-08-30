import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._submitButton = this._popupElement.querySelector(
      ".modal__button-trash"
    );
    this._handleSubmit = null;
  }

  setSubmitFunction(submitFunction) {
    this._handleSubmit = submitFunction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      if (this._handleSubmit) {
        this._handleSubmit();
      } else {
        console.error("Submit function not set.");
      }
    });
  }
}
