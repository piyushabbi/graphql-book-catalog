import React from 'react';

import { graphql, compose } from 'react-apollo';

import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from '../queries/queries';

class AddBook extends React.Component {
  state = {
    name: '',
    genre: '',
    authorId: ''
  };
  submitForm = e => {
    e.preventDefault();
    //alert(JSON.stringify(this.state, undefined, 2));
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [
        {
          query: getBooksQuery
        }
      ]
    });
  };
  render() {
    return (
      <React.Fragment>
        {this.props.getAuthorsQuery.loading ? (
          <div>
            <i>Loading Authors...</i>
          </div>
        ) : (
          <form onSubmit={this.submitForm}>
            <div className="field">
              <label>Book Name:</label>
              <input
                type="text"
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Genre:</label>
              <input
                type="text"
                onChange={e => this.setState({ genre: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Author:</label>
              <select
                onChange={e => this.setState({ authorId: e.target.value })}
              >
                <option>Select Author</option>
                {this.props.getAuthorsQuery.authors.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
            <button>+</button>
          </form>
        )}
      </React.Fragment>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, {
    name: 'getAuthorsQuery'
  }),
  graphql(addBookMutation, {
    name: 'addBookMutation'
  })
)(AddBook);
