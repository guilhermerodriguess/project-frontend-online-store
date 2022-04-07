import React from 'react';
import Proptypes from 'prop-types';

class InputCategories extends React.Component {
  render() {
    const { name, id, func } = this.props;
    return (
      <label htmlFor={ id } data-testid="category" key={ id }>
        <input
          type="radio"
          id={ id }
          name="categories"
          value={ name }
          onClick={ func }
        />
        { name }
      </label>

    );
  }
}

InputCategories.propTypes = {
  name: Proptypes.string.isRequired,
  id: Proptypes.string.isRequired,
  func: Proptypes.func.isRequired,
};

export default InputCategories;
