import React, { Component, Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';

import './App.css';
class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
  };

  // Search github users
  handleSearchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({
      users: res.data.items,
      loading: false,
    });
  };

  // Get  single Github user
  handleGetUsers = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    console.log(res);
    this.setState({
      user: res.data,
      loading: false,
    });
  };

  //Clear github users
  handleClearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  // Set Alloert
  handleAlert = (msg, type) => {
    this.setState({
      alert: {
        msg,
        type,
      },
    });
    setTimeout(() => this.setState({ alert: null }), 2000);
  };

  render() {
    const { users, user, loading } = this.state;
    return (
      <div className='App'>
        <Navbar title='Efd-Risiti' />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <Fragment>
                  <Search
                    searchUsers={this.handleSearchUsers}
                    clearUsers={this.handleClearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.handleAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/user/:login'
              render={(props) => (
                <Fragment>
                  <User
                    {...props}
                    getUser={this.handleGetUsers}
                    user={user}
                    loading={loading}
                  />
                </Fragment>
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
