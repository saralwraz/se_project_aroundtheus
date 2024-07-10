export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__heart")
      .addEventListener("click", () => this._handleLikeIcon());

    this._element
      .querySelector(".card__trashcan")
      .addEventListener("click", () => this._handleDeleteCard());

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handleImageClick(this));
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".card__heart")
      .classList.toggle(".card__heart_active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__image").alt = this.name;
    this._element.querySelector(".card__title").textContent = this.name;

    this._setEventListeners();

    return this._element;
  }
}
