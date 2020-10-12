import React from 'react';
import './InformationList.css';

export default function InformationList(props) {
  let keys = Object.keys(props.result);
  function replaceUrl(url) {
    let newUrl = url.replace('https://swapi-thinkful.herokuapp.com/api', `${window.location.protocol}//${window.location.host}/information`);
    return <a href={newUrl}>{newUrl}</a>;
  }
  return (
    <dl>
      {keys.map((key, index) => {
        if (!["edited", "url", "created"].includes(key) && !Array.isArray(props.result[key]))
          return (
            <React.Fragment key={index}>
              <dt>{key.replace('_', ' ')}</dt>
              <dd>{props.result[key].includes('http') ? replaceUrl(props.result[key]) : props.result[key]}</dd>
            </React.Fragment>
          )
          return void 0
      })}
    </dl>
  )
}