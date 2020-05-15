import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import ScreenHome from './ScreenHome';
import Nav from './Nav';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenSource from './ScreenSource';

import articleWhishList from './reducers/articles';
import token from './reducers/user';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';

const store = createStore(combineReducers({articleWhishList, token}));

function App() {

  return (
    <Provider store={store}>
        {/* <Nav /> */}
        <Router>
          <Switch>
            <Route path="/" exact component={ScreenHome} />
            <Route path="/screen_articles_bySource/:id" component={ScreenArticlesBySource} />
            <Route path="/screen_my_articles" component={ScreenMyArticles} />
            <Route path="/screen_source" component={ScreenSource} />
          </Switch>
        </Router>
    </Provider>
  );
}

export default App;
