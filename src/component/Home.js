import React from 'react';
import PropTypes from 'prop-types';
import { getCategories, getProductsFromCategoryAndQuery,
  getProductById } from '../services/api';
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

  handleAdd = async ({ target }, product) => {
    const carts = await getProductById(target.id);
    this.setState((esA) => ({
      idProductsCart: [...esA.idProductsCart, carts],
      loading: true,
    }), () => {
      (
        this.saveProductCart(product)
      );
    });
  }

  saveProductCart = async (product) => {
    await addProduct(product);
    this.setState({ loading: false });
  }

  loading = () => {
    const { listproducts, loading } = this.state;
    return loading ? <p>Carregando</p>
      : listproducts.map((product) => (
        <section key={ product.id }>
          <Card
            title={ product.title }
            price={ product.price }
            thumbnail={ product.thumbnail }
            id={ product.id }
          />
          <button
            id={ product.id }
            type="button"
            data-testid="product-add-to-cart"
            onClick={ (e) => this.handleAdd(e, product) }
          >
            Adicionar ao carrinho
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

Home.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Home;
