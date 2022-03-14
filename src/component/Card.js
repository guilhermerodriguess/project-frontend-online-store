import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const { id, title, price, thumbnail } = this.props;
    return (
      <div
        key={ id }
        data-testid="product"
        className="product"
      >
        <p>{ title }</p>
        <img src={ thumbnail } alt={ title } />
        <p>{ price }</p>
      </div>
    );
  }
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default Card;
