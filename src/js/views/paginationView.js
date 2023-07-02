import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  
  addHandlerRender(handler) {
    this._parentElement.addEventListener("click" , function(e){
      const btn = e.target.closest(".btn--inline"); 
      if(!btn) return;
      const gotoPage = +btn.dataset.goto; 
      handler(gotoPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // Page 1 , hiển thị những page khác trừ page 1 (nếu thoả mãn điều kiện số lượng page lớn hơn 1 )
    if (curPage === 1 && numPages > 1) {
      return`<button data-goto ="${curPage + 1 }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    // Page cuối , hiển thị những page khác trừ page cuối
    if (curPage === numPages && numPages > 1) {
      return `<button  data-goto ="${curPage - 1  }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>`;
    }

    //Page ở giữa không phải cuối và đầu
    if (curPage < numPages) {
      return`<button  data-goto ="${curPage - 1 }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>

    <button data-goto ="${curPage + 1 }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    //Only page (là page chỉ có 1 trang )
    return '';
  }
}

export default new PaginationView();
