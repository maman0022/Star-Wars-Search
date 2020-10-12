import React, { useState } from 'react';
import SharedContext from '../SharedContext';
import InformationList from '../InformationList/InformationList'

export default function Information(props) {
  const [fetchResult, setFetchResult] = useState(null);
  return (
    <SharedContext.Consumer>
      {
        ({ possibleSubjects, apiBaseUrl }) => {
          let subject = props.match.params.subject;
          let id = props.match.params.id;
          if (!possibleSubjects.includes(subject)) {
            props.history.replace('/');
          }
          async function fetchInfo() {
            let result = await (await fetch(`${apiBaseUrl}${subject}/${id}/`)).json();
            setFetchResult(result);
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
            <section>
              <InformationList result={fetchResult} history={props.history} />
            </section>
          )
        }
      }
    </SharedContext.Consumer>
  )
}