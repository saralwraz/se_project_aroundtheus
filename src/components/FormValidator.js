// In FormValidator.js
export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    this._originalInputValues = this._getInputValues();
  }

  _getInputValues() {
    return this._inputList.map((input) => input.value);
  }

  _hasInputChanged() {
    const currentInputValues = this._getInputValues();
    return currentInputValues.some(
      (value, index) => value !== this._originalInputValues[index]
    );
  }

  disableSubmitButton() {
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._config.inactiveButtonClass);
  }

  enableSubmitButton() {
    this._submitButton.disabled = false;
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
  }

  _checkInputValidity(inputElement) {
    // Implementation for checking input validity
  }

  _setEventListeners() {
    this._toggleButtonState(); // Initial button state check
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput() || !this._hasInputChanged()) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  enableValidation() {
    this._setEventListeners();
  }
}
