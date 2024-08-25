import Popup from "./Popup";
export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleDelete) {
    super({ popupSelector });

    this._popupSelector = popupSelector;
    this._handleDelete = handleDelete;
  }

  setSubmitFunction(submitFunction) {
    this._handleDelete = submitFunction;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleDelete();
    });
  }
}
