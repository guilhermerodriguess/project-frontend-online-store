import React from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import InputCategories from './InputCategories';
import Search from './Search';
import Card from './Card';
import { addProduct } from '../services/cartProductsApi';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      listproducts: [],
      loading: false,
      search: '',
      categories: [],
      id: '',
      idProductsCart: [],
    };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  handleBtnSearch = async () => {
    this.setState({ loading: true });
    const { search, id } = this.state;
    const product = await getProductsFromCategoryAndQuery(id, search);
    this.setState({
      listproducts: product.results,
      loading: false,
      search: '',
    });
  }

  handleInput = (e) => {
    this.setState({
      search: e.target.value,
    });
  }

  handleAdd = (product) => {
    this.setState((esA) => ({
      idProductsCart: [...esA.idProductsCart, product],
    }), () => {
      (
        this.saveProductCart(product)
      );
    });
  }

  saveProductCart = (product) => {
    addProduct(product);
    this.setState({ loading: false });
  }

  loading = () => {
    const { listproducts, loading } = this.state;
    return loading ? <p>Carregando</p>
      : listproducts.map((product) => (
        <section key={ product.id }>
          <Card
            title={ product.title }
            price={ product.price.toString() }
            thumbnail={ product.thumbnail }
            id={ product.id }
          />
          <button
            id={ product.id }
            type="button"
            data-testid="product-add-to-cart"
            onClick={ () => this.handleAdd(product) }
          >
            Adicionar ao Carrinho
          </button>
        </section>
      ));
  }

  handleCategori = async ({ target }) => {
    this.setState({ loading: true });
    const catId = target.id;
    const { search } = this.state;
    const listproducts = await getProductsFromCategoryAndQuery(catId, search);
    this.setState({ listproducts: listproducts.results, loading: false, id: target.id });
  }

  render() {
    const { categories, listproducts } = this.state;
    const { handleBtnSearch, handleInput, handleCategori, loading } = this;
    return (
      <main>
        <fieldset className="categories">
          <legend>Categorias</legend>
          {categories.map(({ name, id }) => (
            <InputCategories name={ name } id={ id } key={ id } func={ handleCategori } />
          ))}
        </fieldset>
        <section>
          <Search handleBtnSearch={ handleBtnSearch } handleInput={ handleInput } />
          <div className="message-products">
            { listproducts.length === 0 ? (
              <span className="message" data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </span>
            )
              : loading()}
          </div>
        </section>
      </main>
    );
  }
}

export default Home;
