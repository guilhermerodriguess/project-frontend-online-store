import React from 'react';
import { getFavoriteProducts } from '../services/cartProductsApi';
import Card from './Card';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      products: getFavoriteProducts(),
    };
  }

  render() {
    const { products } = this.state;

    return (
      <div>
        { products.length === 0 ? (
          <span data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </span>
        )
          : (
            <section>
              {products
                .map((p) => (
                  <Card
                    key={ p.id }
                    title={ p.title }
                    thumbnail={ p.thumbnail }
                    price={ p.price }
                  />
                ))}
            </section>
          ) }
      </div>
    );
  }
}

export default Cart;
