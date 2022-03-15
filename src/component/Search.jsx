import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Search extends React.Component {
  render() {
    const { handleInput, handleBtnSearch, stat } = this.props;
    return (
      <div className="input-products">
        <div className="input-button">
          <input
            type="text"
            name="search"
            onChange={ handleInput }
            data-testid="query-input"
            className="input-search"
          />
          <button
            type="submit"
            data-testid="query-button"
            onClick={ handleBtnSearch }
            className="button-search"
          >
            Search
          </button>
          <Link
            data-testid="shopping-cart-button"
            to={ { pathname: '/cart', state: { stat } } }
          >
            Carrinho
          </Link>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  handleInput: PropTypes.func.isRequired,
  handleBtnSearch: PropTypes.func.isRequired,
  stat: PropTypes.string.isRequired,
};

export default Search;
