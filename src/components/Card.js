export default class Card {
  constructor(
    { name, altName, link, _id, isLiked, likes = [] },
    cardSelector,
    handleImageClick,
    handleConfirmModal,
    handleLikeIconClick,
    api
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
    this._handleLikeIconClick = handleLikeIconClick;
    this._api = api;
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

  changeHeartIcon(apiData) {
    console.log(apiData);
    this._likes = apiData?.likes || [];
    this._isLiked = this._likes.some((user) => user._id === currentUserId);
    this.setHeartIcon();
  }

  handleLikeIconClick(api) {
    const apiAction = this._isLiked
      ? api.deleteCardLike(this._id)
      : api.putCardLike(this._id);

    apiAction
      .then((updatedCard) => {
        console.log("Updated card data:", updatedCard);
        this.changeHeartIcon(updatedCard);
      })
      .catch((err) => {
        console.error(
          `Error ${this._isLiked ? "unliking" : "liking"} card:`,
          err
        );
      });
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
