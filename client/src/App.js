import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Query, Mutation } from 'react-apollo';
import { PERSON } from './Queries';
import { CREATE_USER,LOGIN_USER } from './Mutations';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      birthDate: ''
    }
  }
  getPerson(id){
    var query = `query GetPerson($id: ID!){
      packageInfo{
        name
        version
      }
      person(id: $id) {
        name
        height
        homeworld{
          name
          rotation_period
          orbital_period
        }
      }
    }`;
    
    fetch('http://localhost:4000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: {id}
      })
    })
      .then(res => res.json())
      .then(res => console.log(res.data));
  }
  componentDidMount(){
    // this.getPerson(1);
    // this.getPerson(2);
    // this.getPerson(10);
  }
  render() {
    const {email, password, name, birthDate} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <Mutation mutation={CREATE_USER}>
            {createUserLink => {
              return <form onSubmit={e => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;
                createUserLink({variables: {email, password}});
              }}>
                <input type="text" name="email" />
                <input type="password" name="password" />
                <button>Submit</button>
              </form>
            }}
          </Mutation>
          <Mutation mutation={LOGIN_USER} onCompleted={data => {
            localStorage.setItem('AUTH_TOKEN', data.login);
          }}>
            {loginUserLink => {
              return <form onSubmit={e => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;
                loginUserLink({variables: {email, password}});
              }}>
                <input type="text" name="email" />
                <input type="password" name="password" />
                <button>Submit</button>
              </form>
            }}
          </Mutation>
          <Query query={PERSON} variables={{id: 1}}>
          {({loading, data, error}) => {
            if(loading) return <p>Loading...</p>
            if(error) return <p>Error</p>
            return <div>{data.person.name} // {data.person.homeworld.name}</div>
          }}
          </Query>
        </p>
      </div>
    );
  }
}

export default App;
