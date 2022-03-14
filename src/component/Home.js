import React from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import InputCategories from './InputCategories';
import Search from './Search';

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
    const product = await getProductsFromCategoryAndQuery(null, search);
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

  loading = () => {
    const { listproducts, loading } = this.state;
    return loading ? <p>Carregando</p>
      : listproducts.map((elem) => (
        <div
          key={ Math.random() }
          data-testid="product"
          className="product"
        >
          <p>{ elem.title }</p>
          <img src={ elem.thumbnail } alt={ elem.title } />
          <p>{ elem.price }</p>
        </div>
      ));
  }

  handleCategori = async ({ target }) => {
    this.setState({ loading: true });
    const valor = target.id;
    const listproducts = await getProductsFromCategoryAndQuery(valor, null);
    console.log(listproducts.results);
    this.setState({ listproducts: listproducts.results, loading: false });
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
