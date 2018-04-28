// Dummy Test file created before for local development.
// Before connecting to mLab Db

const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

// Dummy Data
const books = [
  {
    name: 'Name of the Wind',
    genre: 'Fantasy',
    id: '1',
    authorId: '2'
  },
  {
    name: 'The Final Empire',
    genre: 'Fantasy',
    id: '2',
    authorId: '3'
  },
  {
    name: 'The Long Earth',
    genre: 'Sci-Fi',
    id: '3',
    authorId: '1'
  },
  {
    name: 'The Light Fantastic',
    genre: 'Fantasy',
    id: '4',
    authorId: '3'
  },
  {
    name: 'The Color of Magic',
    genre: 'Fantasy',
    id: '5',
    authorId: '3'
  },
  {
    name: 'Hero of Ages',
    genre: 'Fantasy',
    id: '6',
    authorId: '2'
  }
];

const authors = [
  {
    name: 'Pattrick Rothfus',
    age: 44,
    id: '1'
  },
  {
    name: 'Brandon Sanderson',
    age: 42,
    id: '2'
  },
  {
    name: 'Terry Smith',
    age: 66,
    id: '3'
  }
];

// Object types on graph
// Book Type to be used in root query
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    genre: {
      type: GraphQLString
    },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

// Author Type
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        // When we receive the query resolve is fired
        // We will have access to args passed in query
        // code to get data from db
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        // When we receive the query resolve is fired
        // We will have access to args passed in query
        // code to get data from db
        return _.find(authors, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    }
  }
});

// Export the RootQuery
module.exports = new GraphQLSchema({
  query: RootQuery
});
