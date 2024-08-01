import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmission) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector("form");
    this._handleFormSubmission = handleFormSubmission;
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._setEventListeners();
  }

  _setEventListeners() {
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(this._popupForm);
      const data = Object.fromEntries(formData.entries());
      this._handleFormSubmission(data);
      this.reset();
    });
  }

  reset() {
    this._popupForm.reset();
    super.close();
  }
}
