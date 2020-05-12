import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import ScreenHome from './ScreenHome';
import Nav from './Nav';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenSource from './ScreenSource';

function App() {

  return (
    <div>
      {/* <Nav /> */}
      <Router>
        <Switch>
          <Route path="/" exact component={ScreenHome} />
          <Route path="/screen_articles_bySource/:id" component={ScreenArticlesBySource} />
          <Route path="/screen_my_articles" component={ScreenMyArticles} />
          <Route path="/screen_source" component={ScreenSource} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
