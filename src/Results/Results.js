import React from 'react';
import SharedContext from '../SharedContext';
import ResultList from '../ResultList/ResultList';
import './Results.css';
import Loading from '../Loading/Loading';

export default function Results(props) {
  return (
    <SharedContext.Consumer>
      {
        ({ fetchResults, setLoading, searchSubject, loading, apiBaseUrl, setPageNumber }) => {

          if (!fetchResults || !fetchResults.count || !fetchResults.results) {
            props.history.push('/');
            return;
          }

          let totalPages = Math.ceil(fetchResults.count / 10);

          if (props.match.params.page > totalPages) {
            props.history.push('/');
            return;
          }

          function handlePageClick(e) {
            setPageNumber(e.currentTarget.innerHTML);
            setLoading(true);
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

          if(loading){
            return (
              <Loading history={props.history}/>
            )
          }

          return (
            <section id='results-section' className='flex-column align-center justify-between'>
              <h2 id='result-header'>{searchSubject.charAt(0).toUpperCase() + searchSubject.substring(1)}</h2>
              <ResultList />
              <nav id='results-page-nav' className='flex-row justify-evenly align-center'>
                {fetchResults.next || fetchResults.previous ? generatePages() : void 0}
              </nav>
            </section>
          )
        }
      }
    </SharedContext.Consumer>
  )
}