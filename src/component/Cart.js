import React from 'react';
import { getFavoriteProducts, removeProduct } from '../services/cartProductsApi';
import Card from './Card';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      products: getFavoriteProducts(),
    };
  }

  componentDidMount() {
    const { products } = this.state;
    products.map((product) => {
      product.quantity = 1;
      this.setState({ products: [...products] });
      return (product);
    });
  }

  handleIncreaseQuantity = (event) => {
    const { products } = this.state;
    const { name } = event.target;
    products.find((product) => product.id === name).quantity += 1;
    this.setState({ products: [...products] });
  }

  handleDecreaseQuantity = (event) => {
    const { products } = this.state;
    const { name } = event.target;
    const item = products.find((product) => product.id === name);
    if (item.quantity > 0) {
      item.quantity -= 1;
    } else {
      item.quantity = 0;
    }
    this.setState({ products: [...products] });
  }

  // handleRemoveButton = (event) {

  // }

  clearCart = () => {
    const { products } = this.state;
    removeProduct(products);
    this.setState({ products: [] });
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
                .map((p, index) => (
                  <div key={ index }>
                    <Card
                      key={ p.id }
                      title={ p.title }
                      thumbnail={ p.thumbnail }
                      price={ p.price }
                      id={ p.id }
                    />
                    <p data-testid="shopping-cart-product-quantity">{ p.quantity }</p>
                    <button
                      name={ p.id }
                      type="button"
                      data-testid="product-increase-quantity"
                      onClick={ this.handleIncreaseQuantity }
                    >
                      +
                    </button>
                    <button
                      name={ p.id }
                      type="button"
                      data-testid="product-decrease-quantity"
                      onClick={ this.handleDecreaseQuantity }
                    >
                      -
                    </button>

                  </div>
                ))}
              <button
                type="button"
                onClick={ this.clearCart }
              >
                Limpa Carrinho
              </button>
            </section>
          ) }
      </div>
    );
  }
}

export default Cart;
