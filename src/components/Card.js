export default class Card {
  constructor(
    { name, altName, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleConfirmModal,
    handleLikeIconClick
  ) {
    this.name = name;
    this.altName = altName;
    this.link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleConfirmModal = handleConfirmModal;
    this._handleLikeIconClick = handleLikeIconClick;
  }

  _setCardData() {
    this._cardImage.src = this.link;
    this._cardImage.alt = this.altName;
    this._cardTitle.textContent = this.name;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () =>
      this._handleLikeIconClick(this)
    );
    this._trashButton.addEventListener("click", () =>
      this._handleConfirmModal(this)
    );
    this._cardImage.addEventListener("click", () =>
      this._handleImageClick(this)
    );
  }

  setHeartIcon() {
    this._isLiked
      ? this._likeButton.classList.add("card__heart_active")
      : this._likeButton.classList.remove("card__heart_active");
  }

  changeHeartIcon(isLiked) {
    this._isliked = isLiked;
    this.setHeartIcon();
  }

  removeCard() {
    this.cardElement.remove();
    this.cardElement = null;
  }

  getView() {
    this.cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._likeButton = this.cardElement.querySelector(".card__heart");
    this._trashButton = this.cardElement.querySelector(".card__trashcan");
    this._cardImage = this.cardElement.querySelector(".card__image");
    this._cardTitle = this.cardElement.querySelector(".card__text");

    this._setCardData();
    this._setEventListeners();

    return this.cardElement;
  }
}
