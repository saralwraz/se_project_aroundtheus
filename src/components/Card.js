export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleConfirmModal,
    handleLikeIconClick,
    currentUserId
  ) {
    this.name = name;
    this.link = link;
    this._id = _id;
    this.isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeIconClick = handleLikeIconClick;
    this._handleConfirmModal = handleConfirmModal;
    this._currentUserId = currentUserId;
    this.cardElement = null;
  }

  _setCardData() {
    this._cardImage.src = this.link;
    this._cardTitle.textContent = this.name;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIconClick();
    });
    this._trashButton.addEventListener("click", () => {
      this._handleConfirmModal(this);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _updateHeartIcon() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__heart_active");
    } else {
      this._likeButton.classList.remove("card__heart_active");
    }
  }

  updateHeartIcon(isLiked) {
    this.isLiked = isLiked;
    this._likeButton.classList.toggle("card__heart_active", this.isLiked);
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

    this._updateHeartIcon();
    this._setCardData();
    this._setEventListeners();

    return this.cardElement;
  }

  removeCard() {
    if (this.cardElement) {
      this.cardElement.remove();
      this.cardElement = null;
    } else {
      console.error("Card element is already null, cannot remove.");
    }
  }
}
