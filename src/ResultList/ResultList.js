import React from 'react';

export default function ResultList(props) {
  return (
    <ul id='result-list' className='flex-row flex-wrap justify-between align-between'>
      {props.fetchResult.results.map((result, index) =>
        <li className='result-list-item' key={index}>
          <a href={result.url.replace('https://swapi-thinkful.herokuapp.com/api', '/information')}><h5>{result.name || result.title}</h5></a>
        </li>
      )}
    </ul>
  )
}