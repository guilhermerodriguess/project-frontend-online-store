import React from 'react';
import { getCategories } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
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
        <input />
        <span data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </span>
      </>
    );
  }
}

export default Home;
