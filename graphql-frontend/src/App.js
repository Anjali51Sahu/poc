import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

// Setup Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

// Define GraphQL query
const GET_STUDENTS = gql`
  query {
    getStudents {
      id
      email
      firstName
      lastName
    }
  }
`;

// Component to fetch and display students
const StudentList = () => {
  const { loading, error, data } = useQuery(GET_STUDENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {data.getStudents.map(({ id, email, firstName, lastName }) => (
          <li key={id}>
            <div>Student Name: {firstName} {lastName}</div>
            <div>Student Id: {id}</div>
            <div>Email: {email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main App component
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Student Management</h1>
        <StudentList />
      </div>
    </ApolloProvider>
  );
}

export default App;
