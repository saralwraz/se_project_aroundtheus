import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImage = this._popupElement.querySelector(".modal__image_open");
    this.previewImageTitle =
      this._popupElement.querySelector(".modal__caption");
  }

  open({ name, link }) {
    this._previewImage.src = link;
    this._previewImage.alt = name;
    this._previewImageTitle.textContent = name;
    super.open();
  }
}
