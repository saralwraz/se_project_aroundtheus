export default class Card {
  constructor(
    { name, altName, link, _id, isLiked, likes = [] },
    cardSelector,
    handleImageClick,
    handleConfirmModal,
    api,
    currentUserId
  ) {
    this.name = name;
    this.altName = altName;
    this.link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._likes = likes;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleConfirmModal = handleConfirmModal;
    this._api = api;
    this._currentUserId = currentUserId;
  }

  _setCardData() {
    this._cardImage.src = this.link;
    this._cardImage.alt = this.altName;
    this._cardTitle.textContent = this.name;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () =>
      this._handleLikeIconClick()
    );
    this._trashButton.addEventListener("click", () =>
      this._handleConfirmModal(this)
    );
    this._cardImage.addEventListener("click", () =>
      this._handleImageClick(this)
    );
    console.log("Event listeners set.");
  }

  _updateHeartIcon() {
    console.log(`Updating heart icon. Current liked state: ${this._isLiked}`);
    this._likeButton.classList.toggle("card__heart_active", this._isLiked);
    console.log(`Heart icon updated. New liked state: ${this._isLiked}`);
  }

  _handleLikeIconClick() {
    console.log(`Like button clicked. Current liked state: ${this._isLiked}`);
    const apiAction = this._isLiked
      ? this._api.deleteCardLike(this._id)
      : this._api.putCardLike(this._id);

    apiAction
      .then((updatedCard) => {
        console.log(`API action succeeded. Updated card data:`, updatedCard);
        this._updateCardData(updatedCard);
      })
      .catch((err) => {
        console.error(
          `Error ${this._isLiked ? "unliking" : "liking"} card:`,
          err
        );
      });
  }

  _updateCardData(updatedCard) {
    console.log(`Updating card data with:`, updatedCard);
    this._likes = updatedCard.likes || [];
    this._isLiked = this._likes.some(
      (user) => user._id === this._currentUserId
    );
    console.log(
      `Card data updated. Liked state: ${this._isLiked}, Likes:`,
      this._likes
    );
    this._updateHeartIcon();
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

  removeCard() {
    console.log(`Removing card with ID: ${this._id}`);
    this.cardElement.remove();
    this.cardElement = null;
  }
}
