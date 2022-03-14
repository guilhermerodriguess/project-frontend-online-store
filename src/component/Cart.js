import React from 'react';
import { getFavoriteProducts } from '../services/cartProductsApi';

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

  render() {
    const { products, contador } = this.state;
    return (
      <div>
        {products.length !== 0 ? (
          <section>
            {products
              .map(({ title, id, thumbnail, price }) => (
                <div
                  key={ id }
                  className="product"
                >
                  <p data-testid="shopping-cart-product-name">{ title }</p>
                  <img src={ thumbnail } alt={ title } />
                  <input
                    type="number"
                    data-testid="shopping-cart-product-quantity"
                    value={ contador }
                  />
                  <p>{ price }</p>
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
