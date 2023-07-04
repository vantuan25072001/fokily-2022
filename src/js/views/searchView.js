class searchView {
  _parentEL = document.querySelector('.search');

  getQuery() {
    const query = this._parentEL.querySelector('.search__field').value;
    if (!query) return;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEL.querySelector('.search__field').value = '';
  }
  addHandlerRender(handler) {
    this._parentEL.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
