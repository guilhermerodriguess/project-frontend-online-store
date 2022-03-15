const FAVORITE_PRODUCTS_KEY = 'favorite_Products';

if (!JSON.parse(localStorage.getItem(FAVORITE_PRODUCTS_KEY))) {
  localStorage.setItem(FAVORITE_PRODUCTS_KEY, JSON.stringify([]));
}

const readFavoriteProducts = () => JSON
  .parse(localStorage.getItem(FAVORITE_PRODUCTS_KEY));
const saveFavoriteProducts = (favoriteProducts) => localStorage
  .setItem(FAVORITE_PRODUCTS_KEY, JSON.stringify(favoriteProducts));

export const getFavoriteProducts = () => {
  const favoriteProducts = readFavoriteProducts();
  return favoriteProducts;
};

export const addProduct = (product) => {
  if (product) {
    const favoriteProducts = readFavoriteProducts();
    saveFavoriteProducts([...favoriteProducts, product]);
  }
};

export const removeProduct = (product) => {
  const favoriteProducts = readFavoriteProducts();
  saveFavoriteProducts(favoriteProducts.filter((p) => p.id !== product.id));
};
