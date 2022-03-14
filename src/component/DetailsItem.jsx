/* eslint-disable lines-between-class-members */
import React from 'react';

class DetailsItem extends React.Component {
  constructor() {
    super();
    this.state = {
      product: '',
    };
  }
  // eslint-disable-next-line space-before-blocks
  async componentDidMount(){
    const { match: { params: { id } } } = this.props;
    this.setState({
      product: await this.getProductById(id),
    });
  }

  getProductById = async (id) => {
    const enpoint = `https://api.mercadolibre.com/items/${id}`;
    const response = await fetch(enpoint);
    const data = await response.json();
    return data;
  }

  render() {
    const { product } = this.state;
    console.log(product.attributes);
    return (
      <div>
        <p>Especficação Técnica</p>
        <img src={ product.thumbnail } alt={ product.title } />
        <ul data-testid="product-detail-name">
          <li>{ product.title }</li>
          <li>{ product.price }</li>
          { product.attributes.map(({ name, values }) => (
            <li key={ name }>
              Especficaçoes:
              <li>
                {`${name} - ${values}`}
              </li>
            </li>
          ))}
        </ul>
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
