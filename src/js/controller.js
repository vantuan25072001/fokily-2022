import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if(module.hot){
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpiner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpiner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;
  
    // 2) Load search resuhlts
    await model.loadSearchResults(query);
    // 3) Render results
    resultsView.render(model.getSearchResultsPage());
  // 4) Render initial pagination buttons
    paginationView.render(model.state.search);

  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function(gotoPage){
      // 1) Render  NEW results
      resultsView.render(model.getSearchResultsPage(gotoPage));
      // 2) Render NEW initial pagination buttons
       paginationView.render(model.state.search);
}
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerRender(controlSearchResults);
  paginationView.addHandlerRender(controlPagination);
};
init();