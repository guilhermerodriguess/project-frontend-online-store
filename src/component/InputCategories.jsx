import React from 'react';
import Proptypes from 'prop-types';

class InputCategories extends React.Component {
  render() {
    const { name, id } = this.props;
    return (
      <label htmlFor={ id } data-testid="category" key={ id }>
        <input
          type="radio"
          id={ id }
          name="categories"
          value={ name }
        />
        { name }
      </label>

    );
  }
}

InputCategories.propTypes = {
  name: Proptypes.string.isRequired,
  id: Proptypes.string.isRequired,
};

export default InputCategories;
