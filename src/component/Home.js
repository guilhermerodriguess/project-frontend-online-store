import React from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      listproducts: [],
      loading: false,
      search: '',
      categories: [],
    };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  handleBtnSearch = async () => {
    this.setState({ loading: true });
    const { search } = this.state;
    const product = await getProductsFromCategoryAndQuery(search);
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

  loading = () => {
    const { listproducts, loading } = this.state;
    return loading ? <p>Carregando</p>
      : listproducts.map((elem) => (
        <div
          key={ Math.random() }
          data-testid="product"
        >
          <p>{ elem.title }</p>
          <p>{ elem.price }</p>
          <img src={ elem.thumbnail } alt={ elem.title } />
        </div>
      ));
  }

  render() {
    const { categories, listproducts } = this.state;
    return (
      <main>
        <div className="categories">
          {categories.map((categori) => (
            <label htmlFor={ categori.id } data-testid="category" key={ categori.id }>
              <input
                type="radio"
                id={ categori.id }
                name={ categori.id }
                value={ categori.name }
              />
              {categori.name}
            </label>
          ))}
        </div>
        <div>
          <div className="input-button">
            <input
              type="text"
              name="search"
              onChange={ this.handleInput }
              data-testid="query-input"
            />
            <button
              type="submit"
              data-testid="query-button"
              onClick={ this.handleBtnSearch }
            >
              Search
            </button>
          </div>
          <div className="message-products">
            { listproducts.length === 0 ? (
              <span data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </span>
            )
              : this.loading()}
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
