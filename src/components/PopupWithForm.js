import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmission) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector("form");
    this._handleFormSubmission = handleFormSubmission;
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._inputList = this._popupForm.querySelectorAll("input");
    this._setEventListeners();
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  _setEventListeners() {
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = this._getInputValues();
      this._handleFormSubmission(data);
      this.reset();
    });
  }

  reset() {
    this._popupForm.reset();
    super.close();
  }
}
