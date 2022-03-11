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
    console.log(product);
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

  render() {
    const { categories, loading, listproducts } = this.state;
    return (
      <>
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
        <span data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </span>
        { loading ? <p>Carregando</p>
          : listproducts.map((elem) => (
            <div
              key={ Math.random() }
              data-testid="product"
            >
              <p>{ elem.title }</p>
              <p>{ elem.price }</p>
              <img src={ elem.thumbnail } alt={ elem.title } />
            </div>
          ))}
      </>
    );
  }
}

export default Home;
