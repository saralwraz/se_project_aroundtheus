export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._classSelector = classSelector;
    this._container = document.querySelector(this._classSelector);
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
