import React from 'react';
import SharedContext from '../SharedContext';
import './Loading.css';

export default function Loading(props) {
  return (
    <SharedContext.Consumer>
      {
        ({ setFetchResults, searchSubject, searchQuery, apiBaseUrl, loading, setLoading,pageNumber }) => {
          if (loading) {
            fetch(`${apiBaseUrl}${searchSubject}/${searchQuery===''?'?':searchQuery+'&'}page=${pageNumber}`)
              .then(resp => resp.json())
              .then(result => {
                if (result.results.length === 0) { props.history.replace('/results/none'); return; }
                setLoading(false)
                setFetchResults(result);
                props.history.replace(`/results/page/${pageNumber}`);
              })
          }
          return (
            <div className="flex-column justify-center align-center full-width full-height">
              <h2>Loading</h2>
              <div className="lds-dual-ring"></div>
            </div>
          )
        }
      }
    </SharedContext.Consumer>
  )
}