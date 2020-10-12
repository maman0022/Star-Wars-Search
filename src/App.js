import React, { useState } from 'react';
import './App.css';
import Header from './Header/Header';
import SearchForm from './SearchForm/SearchForm';
import SearchResults from './SearchResults/SearchResults';
import SharedContext from './SharedContext';
import { Route, Switch } from 'react-router-dom';
import Information from './Information/Information';

function App(props) {

  const [possibleSubjects] = useState(['planets', 'starships', 'vehicles', 'people', 'films', 'species']);
  const [apiBaseUrl] = useState('https://swapi-thinkful.herokuapp.com/api/');

  const SharedContextValues = {
    possibleSubjects,
    apiBaseUrl
  }

  return (
    <React.Fragment>
      <SharedContext.Provider value={SharedContextValues}>
        <Header />
        <main>
          <Switch>
            <Route exact path={'/'} component={SearchForm} />
            <Route exact path={'/information/:subject/:id'} component={Information} />
            <Route exact path={'/search/:subject/:query/:page'} component={SearchResults} />
            <Route exact path={'/*'} component={SearchForm} />
          </Switch>
        </main>
      </SharedContext.Provider>
    </React.Fragment>
  );
}

export default App;