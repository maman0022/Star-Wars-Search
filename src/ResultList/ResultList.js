import React from 'react';
import SharedContext from '../SharedContext';

export default function ResultList(props) {
  return (
    <SharedContext.Consumer>
      {
        ({ fetchResults, setInfoLoading }) => {
          let handleLinkClick = e => {
            setInfoLoading(true);
          }
          return (
            <ul id='result-list' className='flex-row flex-wrap justify-between align-between'>
              {fetchResults.results.map((result, index) =>
                <li className='result-list-item' key={index}>
                  <a href={result.url.replace('https://swapi-thinkful.herokuapp.com/api', '/information')} onClick={handleLinkClick}><h5>{result.name || result.title}</h5></a>
                </li>
              )}
            </ul>
          )
        }
      }
    </SharedContext.Consumer>
  )
}