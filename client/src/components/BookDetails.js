import React from 'react';

import { graphql } from 'react-apollo';

import { getSingleBookQuery } from '../queries/queries';

const BookDetails = props => {
  let book = props.data.book;
  if (!book) {
    return null;
  }

  return (
    <div style={{ padding: '10px 0px' }}>
      {!props.data.loading ? (
        <React.Fragment>
          <b>Book Details:-</b>
          <div>Book Name: {book.name}</div>
          <div>Genre: {book.genre}</div>
          <div>Author Name: {book.author.name}</div>
          <div>Author Age: {book.author.age}</div>
          <hr />
        </React.Fragment>
      ) : (
        <i>Loading details...</i>
      )}
    </div>
  );
};

export default graphql(getSingleBookQuery, {
  options: props => ({
    variables: {
      id: props.bookId
    }
  })
})(BookDetails);
