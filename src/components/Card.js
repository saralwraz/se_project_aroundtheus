export default class Card {
  constructor(
    { name, altName, link, _id },
    cardSelector,
    handleImageClick,
    handleConfirmModal,
    handleLikeIconClick
  ) {
    this._name = name;
    this._altName = altName || name;
    this._link = link;
    this._id = _id;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleConfirmModal = handleConfirmModal;
    this._handleLikeIconClick = handleLikeIconClick;
  }

  _setCardData() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._altName;
    this._cardTitle.textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__heart")
      .addEventListener("click", () => this._handleLikeIconClick());

    this._element
      .querySelector(".card__trashcan")
      .addEventListener("click", () => this._handleConfirmModal(this._id));

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleImageClick(this._name, this._link)
      );
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._setCardData();
    this._setEventListeners();

    return this._element;
  }
}
