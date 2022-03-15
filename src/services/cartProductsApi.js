const FAVORITE_PRODUCTS_KEY = 'favorite_Products';
const TIMEOUT = 500;
const SUCCESS_STATUS = 'OK';

if (!JSON.parse(localStorage.getItem(FAVORITE_PRODUCTS_KEY))) {
  localStorage.setItem(FAVORITE_PRODUCTS_KEY, JSON.stringify([]));
}

const readFavoriteProducts = () => JSON
  .parse(localStorage.getItem(FAVORITE_PRODUCTS_KEY));

const saveFavoriteProducts = (favoriteProducts) => localStorage
  .setItem(FAVORITE_PRODUCTS_KEY, JSON.stringify(favoriteProducts));

const simulateRequest = (response) => (callback) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getFavoriteProducts = () => {
  const favoriteProducts = readFavoriteProducts();
  return favoriteProducts;
};

export const addProduct = (product) => new Promise((resolve) => {
  if (product) {
    const favoriteProducts = readFavoriteProducts();
    saveFavoriteProducts([...favoriteProducts, product]);
  }
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const removeProduct = (product) => new Promise((resolve) => {
  const favoriteProducts = readFavoriteProducts();
  saveFavoriteProducts(favoriteProducts.filter((p) => p.id !== product.id));
  simulateRequest(SUCCESS_STATUS)(resolve);
});
