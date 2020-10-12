import React, { useState } from 'react';
import SharedContext from '../SharedContext';
import InformationList from '../InformationList/InformationList';
import './Information.css';

export default function Information(props) {
  const [fetchResult, setFetchResult] = useState(null);
  const [error, setError] = useState(false);

  return (
    <SharedContext.Consumer>
      {
        ({ possibleSubjects, apiBaseUrl }) => {
          let subject = props.match.params.subject;
          let id = props.match.params.id;

          if (!possibleSubjects.includes(subject)) {
            props.history.replace('/');
          }

          function fetchInfo() {
            fetch(`${apiBaseUrl}${subject}/${id}/`)
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

          if (!fetchResult) {
            fetchInfo();
            return (
              <div className="flex-column justify-center align-center full-width full-height">
                <h2>Loading</h2>
                <div className="lds-dual-ring"></div>
              </div>
            )
          }

          return (
            <section className='flex-column align-center'>
              <button onClick={() => props.history.goBack()}>Go Back</button>
              <InformationList result={fetchResult} history={props.history} />
              <button onClick={() => props.history.goBack()}>Go Back</button>
            </section>
          )
        }
      }
    </SharedContext.Consumer>
  )
}