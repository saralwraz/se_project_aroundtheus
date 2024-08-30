import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmission) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector("form");
    this._inputList = this._popupForm.querySelectorAll("input");
    this._handleFormSubmission = handleFormSubmission;
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._defaultButtonText = this._submitButton.textContent;
    this._setEventListeners();
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  _setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name] || "";
    });
  }

  _setEventListeners() {
    this._popupForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = this._getInputValues();
      this.renderLoading(true);

      await this._handleFormSubmission(data);

      this.close();
      this.renderLoading(false);
    });
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._defaultButtonText;
    }
  }

  reset() {
    this._popupForm.reset();
  }
}
