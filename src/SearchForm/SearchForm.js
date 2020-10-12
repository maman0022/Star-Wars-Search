import React from 'react';
import SharedContext from '../SharedContext';
import './SearchForm.css';

export default function SearchForm(props) {

  return (
    <SharedContext.Consumer>
      {
        ({ possibleSubjects }) => {
          let handleSubmit = async (e) => {
            e.preventDefault();
            let query = e.target.query.value.trim();
            query === '' ? query = null : void 0;
            let subject = e.target.subject.value;
            props.history.push(`/search/${subject}/${query}/1`)
          }
          return (<section className='flex-row justify-center'>
            <form onSubmit={handleSubmit} className='flex-column justify-between'>
              <label htmlFor='query'>Enter Your Search Query:</label>
              <input id='query' type='text'></input>
              <label htmlFor='subject'>Select Subject:</label>
              <select id='subject'>
                {possibleSubjects.map((subject, index) => <option key={index}>{subject}</option>)}
              </select>
              <input type='submit' value='Search'></input>
            </form>
          </section>)
        }
      }
    </SharedContext.Consumer>
  )
}