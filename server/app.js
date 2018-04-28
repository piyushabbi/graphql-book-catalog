const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema/schema');

const app = express();

// Connect to mlab db
mongoose.connect(
  'mongodb://piyush:test123@ds261479.mlab.com:61479/gql-ninja-piy'
);
mongoose.connection.once('open', () => {
  console.log('Connected to mLab db!');
});

// Add graphql on a single endpoint. Each req is routed through this route.
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log('Listening on port 4000! ');
});
