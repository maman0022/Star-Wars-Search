import React, { useState } from 'react';
import './App.css';
import Header from './Header/Header';
import SearchForm from './SearchForm/SearchForm';
import Results from './Results/Results';
import NoResults from './NoResults/NoResults';
import SharedContext from './SharedContext';
import { Route, Switch } from 'react-router-dom';
import Loading from './Loading/Loading';
import Information from './Information/Information';

function App(props) {

  const [possibleSubjects] = useState(['planets', 'starships', 'vehicles', 'people', 'films', 'species']);
  const [fetchResults, setFetchResults] = useState(null,);
  const [searchSubject, setSearchSubject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [apiBaseUrl] = useState('https://swapi-thinkful.herokuapp.com/api/');
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(null);

  const SharedContextValues = {
    possibleSubjects,
    fetchResults,
    searchSubject,
    searchQuery,
    apiBaseUrl,
    loading,
    pageNumber,
    setFetchResults,
    setSearchSubject,
    setSearchQuery,
    setLoading,
    setPageNumber
  }

  return (
    <React.Fragment>
      <SharedContext.Provider value={SharedContextValues}>
        <Header />
        <main>
          <Switch>
            <Route exact path={'/'} component={SearchForm} />
            <Route exact path={'/loading'} component={Loading} />
            <Route exact path={'/results/page/:page'} component={Results} />
            <Route exact path={'/results/none'} component={NoResults} />
            <Route exact path={'/information/:subject/:id'} component={Information} />
            <Route exact path={'/*'} component={SearchForm} />
          </Switch>
        </main>
      </SharedContext.Provider>
    </React.Fragment>
  );
}

export default App;