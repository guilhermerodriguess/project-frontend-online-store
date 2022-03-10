export async function getCategories() {
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/categories';
  const promisse = fetch(endpoint)
    .then((pro) => pro.json())
    .then((data) => data);
  return promisse;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (!query && !categoryId) throw new Error('You must provide an url');
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const data = await response.json();
  return data;
}
