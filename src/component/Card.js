import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const { id, title, price, thumbnail, onclick, click } = this.props;
    return (
      <div
        key={ id }
        data-testid="product"
        className="product"
      >
        <p>{ title }</p>
        <img src={ thumbnail } alt={ title } />
        <p>{ price }</p>
        <button
          id={ id }
          type="button"
          data-testid="product-add-to-cart"
          onClick={ onclick }
        >
          {!click ? 'Adicionar ao carrinho' : 'Remover do Carrinho'}
        </button>
      </div>
    );
  }
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  onclick: PropTypes.func.isRequired,
  click: PropTypes.bool.isRequired,
  price: PropTypes.string.isRequired,
};

export default Card;
