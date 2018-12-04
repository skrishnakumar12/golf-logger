import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase';
import { Button, InputGroup, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { BrowserRouter, Route} from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentScore: '',
      username: '',
      scores: [],
      user: null
    }
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({user});
      });
  }
  logout() {
    auth.signOut()
      .then(() => {
        this.setState({user: null});
      });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.state.user.displayName || this.state.user.email
    }
    itemsRef.push(item);
    this.setState({
      currentItem: '',
      username: ''
    });
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
    // const itemsRef = firebase.database().ref('items');
    // itemsRef.on('value', (snapshot) => {
    //   let items = snapshot.val();
    //   let newState = [];
    //   for (let item in items) {
    //     newState.push({
    //       id: item,
    //       title: items[item].title,
    //       user: items[item].user
    //     });
    //   }
    //   this.setState({
    //     items: newState
    //   });
    // });
    //console.log(user);
  }

  // getScores = () => {
  //   fetch(`/${login}`)
  //   .then(response => response.json())
  //   .then(response => this.setState({ scores: response.data}))
  //   .catch(err => console.log(err))
  // }

  // addScore = () => {
  //   const { userScore } = this.state
  //   fetch(`/user/add?username='${userScore.username}'&course_name='${userScore.course_name}'&date_score='${userScore.date_score}'&score='${userScore.score}'`)
  //   .then(this.getScores)
  //   .catch( err => console.log(err))
  // }

  render() {
    const { scores, userScore } = this.state
    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark fixed-top">
          <h4 className="navbar-brand">
            Golf Logger App
          </h4>
          {this.state.user ?
            <Button onClick={this.logout}>Logout</Button>
            :
            <Button onClick={this.login}>Login</Button>
          }
        </nav>
        {this.state.user ?
          <div>
            <h2>User: {this.state.user.displayName} has logged in!</h2>
          </div>
        :
          <h2>To see all of your scores, Login!</h2>
        }
      </div>
      // <div className="App">
      //   {scores.map(this.renderScores)}

      //   <Table>
      //     <thead>
      //       <tr>
      //         <th>Name</th>
      //         <th>Course</th>
      //         <th>Date</th>
      //         <th>Score</th>
      //       </tr>
      //     </thead>
      //     <tbody>
      //       <tr>
      //         <td>{userScore.name}</td>
      //         <td>{userScore.course}</td>
      //         <td>{userScore.date}</td>
      //         <td>{userScore.score}</td>
      //       </tr>
      //     </tbody>
      //     {/* <input
      //       value={userScore.name}
      //       onChange={e => this.setState({ userScore: {...userScore, name:e.target.value}})} />
      //       <input
      //       value={userScore.course}
      //       onChange={e => this.setState({ userScore: {...userScore, course:e.target.value}})} />
      //       <input
      //       value={userScore.date}
      //       onChange={e => this.setState({ userScore: {...userScore, date:e.target.value}})} />
      //       <input
      //       value={userScore.score}
      //       onChange={e => this.setState({ userScore: {...userScore, score:e.target.value}})} />
      //       <Button color="secondary" onClick={this.editScore}> Edit</Button>
      //       <Button color="danger" onClick={this.deleteScore}> Delete</Button> */}
      //   </Table>
      //   <Button color="secondary" onClick={this.editScore}> Edit</Button>
      //   <Button color="danger" onClick={this.deleteScore}> Delete</Button>
      // </div>
    );
  }
}

export default App;
