import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleDelete) {
    super({ popupSelector });

    this._handleDelete = handleDelete;
  }

  setSubmitFunction(submitFunction) {
    this._handleDelete = submitFunction;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupElement.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this._handleDelete) {
        this._handleDelete();
      } else {
        console.error("No delete handler provided");
      }
    });
  }
}
