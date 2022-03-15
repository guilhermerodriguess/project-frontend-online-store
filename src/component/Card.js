import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const { id, title, price, thumbnail } = this.props;
    return (
      <div
        data-testid="product"
        className="product"
      >
        <p data-testid="shopping-cart-product-name">{ title }</p>
        <img src={ thumbnail } alt={ title } />
        <p data-testid="shopping-cart-product-quantity">1</p>
        <Link
          data-testid="product-detail-link"
          to={ `/product-detail/${id}` }
        />
        <p>{ price }</p>
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default Card;
