import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmission) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector("#addcard__form");
    this._handleFormSubmission = handleFormSubmission;
  }

  reset() {
    this._popupForm.reset();
    super.close();
  }
}
