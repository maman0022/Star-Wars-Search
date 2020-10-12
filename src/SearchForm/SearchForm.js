import React from 'react';
import SharedContext from '../SharedContext';
import './SearchForm.css';

export default function SearchForm(props) {

  return (
    <SharedContext.Consumer>
      {
        ({ possibleSubjects, setSearchQuery, setSearchSubject, setLoading, setPageNumber }) => {
          let handleSubmit = async (e) => {
            e.preventDefault();
            let query = e.target.query.value;
            let searchString = query.trim() === '' ? '' : `?search=${query}`;
            let subject = e.target.subject.value;
            setPageNumber(1);
            setSearchSubject(subject);
            setSearchQuery(searchString);
            setLoading(true);
            props.history.push('/loading');
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