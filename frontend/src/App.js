import React, { Component } from 'react';
import { Button, ButtonGroup, Table } from 'reactstrap';
import './App.css';
// import NavBar from './NavBar.js';
// import Entries from './Entries.js';

class App extends Component {
  state = {
    login: 'skrishnakumar',
    scores: [],
    userScore: {
      username: '',
      course_name: '',
      date_score: '',
      score: ''
    }
  }

  componentDidMount(){
    this.getScores()
  }

  getScores = () => {
    fetch(`/user?username='${login}'`)
    .then(response => response.json())
    .then(response => this.setState({ scores: response.data}))
    .catch(err => console.log(err))
  }

  renderScores = ({name, course, date, score}) => <div key={name}>{course} | {date} | {score}</div>

  addScore = () => {
    const { userScore } = this.state
    fetch(`/user/add?username='${userScore.username}'&course_name='${userScore.course_name}'&date_score='${userScore.date_score}'&score='${userScore.score}'`)
    .then(this.getScores)
    .catch( err => console.log(err))
  }

  render() {
    const { scores, userScore } = this.state
    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-primary fixed-top">
          <h4 className="navbar-brand">
          Golf Logger App
          </h4>
          <ButtonGroup>
          <Button color="success" onClick={this.addScore}>Login</Button>
          <Button color="secondary" onClick={this.addScore}>Sign Up</Button>
          </ButtonGroup>
        </nav>
      </div>
      // <div className="App">
      //   <nav className="navbar navbar-dark bg-primary fixed-top">
      //     <h4 className="navbar-brand">
      //     Golf Logger App
      //     </h4>
      //     <Button color="success" onClick={this.addScore}>Add Score</Button>
      //   </nav>

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
