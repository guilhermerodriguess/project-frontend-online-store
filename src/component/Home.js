import React from 'react';
import PropTypes from 'prop-types';
import { getCategories, getProductsFromCategoryAndQuery,
  getProductById } from '../services/api';
import InputCategories from './InputCategories';
import Search from './Search';
import Card from './Card';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      listproducts: [],
      loading: false,
      search: '',
      categories: [],
      id: '',
      click: false,
      cart: [],
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
    // Atenção á função, parametro estava no lugar errado.
    // const product = await getProductsFromCategoryAndQuery( search);  <== como estava
    // search deve ser segundo parametro, e estava como primeiro
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

  handleAdd = async ({ target }) => {
    console.log('clicou');
    const { click } = this.state;
    const clicked = !click;
    const cart = await getProductById(target.id);
    this.setState({ click: clicked, cart });
    console.log(cart);
  }

  loading = () => {
    const { listproducts, loading, click } = this.state;
    return loading ? <p>Carregando</p>
      : listproducts.map(({ title, price, thumbnail, id }) => (
        <Card 
          title={ title }
          key={ id }
          price={ price }
          thumbnail={ thumbnail }
          click={ click }
          onclick={ this.handleAdd }
        />
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
