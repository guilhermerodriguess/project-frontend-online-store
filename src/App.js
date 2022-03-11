import React from 'react';
import './App.css';
import Home from './component/Home';
// import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

class App extends React.Component {
  // componentDidMount() {
  //   getCategories();
  //   getProductsFromCategoryAndQuery(null, 'computador');
  // }
  // teste REQUISITO 1.

  render() {
    return ( 
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
