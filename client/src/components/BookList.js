import React from 'react';

import { graphql } from 'react-apollo';

import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const Header = () => <h1>Books List</h1>;

class BookList extends React.Component {
  state = {
    selected: null
  };
  render() {
    return (
      <React.Fragment>
        <Header />
        {this.props.data.loading ? (
          <div>
            <i>Loading...</i>
          </div>
        ) : (
          <React.Fragment>
            <ul>
              {this.props.data.books.map(m => (
                <li
                  key={m.id}
                  onClick={e => {
                    this.setState({
                      selected: m.id
                    });
                  }}
                >
                  {m.name}
                </li>
              ))}
            </ul>
            <BookDetails bookId={this.state.selected} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
