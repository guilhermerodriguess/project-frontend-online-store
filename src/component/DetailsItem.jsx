import React from 'react';
import PropTypes from 'prop-types';
import { addProduct } from '../services/cartProductsApi';

class DetailsItem extends React.Component {
  constructor() {
    super();
    this.state = {
      product: '',
      loading: false,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      product: await this.getProductById(id),
      loading: true,
    });
  }

  getProductById = async (id) => {
    const enpoint = `https://api.mercadolibre.com/items/${id}`;
    const response = await fetch(enpoint);
    const data = await response.json();
    return data;
  }

  addCart = () => {
    const { product } = this.state;
    console.log(product);
    addProduct(product);
  }

  render() {
    const { product, loading } = this.state;
    console.log(product.attributes);
    return (
      <div>
        <p>Especficação Técnica</p>
        <img src={ product.thumbnail } alt={ product.title } />
        <ul data-testid="product-detail-name">
          <li>{ product.title }</li>
          <li>{ product.price }</li>
          { !loading ? <p>Ola</p>
            : product.attributes.map((elem) => (
              <li key={ elem.name }>
                Especficaçoes:
                <li>
                  {`${elem.name} - ${elem.value_name}`}
                </li>
              </li>
            ))}
        </ul>
        <button
          type="submit"
          onClick={ this.addCart }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

DetailsItem.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailsItem;
