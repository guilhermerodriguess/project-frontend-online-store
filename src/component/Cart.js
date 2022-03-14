import React from 'react';
import { getFavoriteProducts, removeProduct } from '../services/cartProductsApi';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      contador: 1,
    };
  }

  async componentDidMount() {
    const products = await getFavoriteProducts();
    this.setState({ products });
  }

  handleChange = ({ target }) => {
    this.setState({ contador: target.value });
  }

  // validInput = (p) => {
  //   const { contador } = this.state;
  //   if (contador < 1) removeProduct(p);
  // }

  render() {
    const { products, contador } = this.state;
    return (
      <div>
        {products.length !== 0 ? (
          <section>
            {products
              .map((p) => (
                <div
                  key={ p.id }
                  className="product"
                >
                  <p data-testid="shopping-cart-product-name">{ p.title }</p>
                  <img src={ p.thumbnail } alt={ p.title } />
                  <input
                    type="number"
                    data-testid="shopping-cart-product-quantity"
                    value={ contador }
                    name="contador"
                    onChange={ (e) => this.handleChange(e, p) }
                  />
                  <p name="price">{ p.price * contador }</p>
                </div>
              ))}
          </section>
        )
          : (
            <span data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </span>) }
      </div>
    );
  }
}

export default Cart;
