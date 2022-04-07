import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './component/Home';
import Cart from './component/Cart';
import DetailsItem from './component/DetailsItem';

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
        <BrowserRouter>
          <Switch>
            <Route exact path="/project-frontend-online-store" component={ Home } />
            <Route exact path="/project-frontend-online-store/cart" component={ Cart } />
            <Route exact path="/project-frontend-online-store/product-detail/:id" component={ DetailsItem } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
