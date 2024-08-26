import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmission) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector("form");
    this._handleFormSubmission = handleFormSubmission;
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._inputList = this._popupForm.querySelectorAll("input");
    this._submitButtonText = this._submitButton.textContent;
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
      input.value = data[input.name];
    });
  }

  _setEventListeners() {
    this._popupForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = this._getInputValues();
      console.log("Form data:", data);
      this.renderLoading(true);
      try {
        await this._handleFormSubmission(data);
      } catch (error) {
        console.error("Form submission failed", error);
      } finally {
        this.renderLoading(false);
        this.reset();
      }
    });
  }

  renderLoading(isLoading) {
    const button = this._popupElement.querySelector(".modal__button");
    if (isLoading) {
      button.textContent = "Saving...";
    } else {
      button.textContent = this._submitButtonText;
    }
  }

  reset() {
    this._popupForm.reset();
    super.close();
  }
}
