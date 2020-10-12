import React, { useState } from 'react';
import SharedContext from '../SharedContext';
import ResultList from '../ResultList/ResultList';
import './SearchResults.css';

export default function SearchResults(props) {
  const [fetchResult, setFetchResult] = useState(null);
  const [error, setError] = useState(false);

  return (
    <SharedContext.Consumer>
      {
        ({ possibleSubjects, apiBaseUrl }) => {
          let subject = props.match.params.subject;
          let query = props.match.params.query;
          query = query !== 'null' ? `search=${query}&` : '';
          let page = props.match.params.page;

          if (!possibleSubjects.includes(subject)) {
            props.history.replace('/');
          }

          function fetchInfo() {
            fetch(`${apiBaseUrl}${subject}/?${query}page=${page}`)
              .then(resp => {
                if (!resp.ok) {
                  return Promise.reject();
                }
                return resp.json();
              })
              .then(setFetchResult)
              .catch(() => setError(true))
          }

          if (error) {
            return (
              <section className='flex-row justify-center'>
                <h2>An error occured while retrieving the results</h2>
              </section>
            )
          }

          else if (!fetchResult) {
            fetchInfo();
            return (
              <div className="flex-column justify-center align-center full-width full-height">
                <h2>Loading</h2>
                <div className="lds-dual-ring"></div>
              </div>
            )
          }

          else {
            let totalPages = Math.ceil(fetchResult.count / 10);

            function handlePageClick(e) {
              setFetchResult(null);
              let page = e.currentTarget.innerHTML;
              props.history.push(`/search/${subject}/${props.match.params.query}/${page}`)
            }

            function generatePages() {
              if (!isNaN(totalPages)) {
                let output = [];
                for (let i = 1; i <= totalPages; i++) {
                  output.push(<button onClick={handlePageClick}>{i}</button>)
                }
                return output;
              }
            }

            return (
              <section id='results-section' className='flex-column align-center justify-between'>
                <h2 id='result-header'>{subject}</h2>
                {fetchResult.count ? void 0 : <h2>No Results</h2>}
                <ResultList fetchResult={fetchResult} />
                <nav id='results-page-nav' className='flex-row justify-evenly align-center'>
                  <button onClick={() => props.history.push('/')}>&#11013; Search Again</button>
                  {fetchResult.next || fetchResult.previous ? generatePages() : void 0}
                </nav>
              </section>
            )
          }
        }
      }
    </SharedContext.Consumer>
  )
}