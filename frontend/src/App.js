import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase';
import { Button, ButtonGroup, InputGroup, Form, FormGroup, Input } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      course_name: '',
      date_score: '',
      score: '',
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
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var queryString = this.state.user.displayName.split(' ').join('%20');
    fetch(`/` + queryString + `/add?course=${this.state.course_name}&date=${this.state.date_score}&score=${this.state.score}`)
    .then(this.getScores())
    .catch( err => console.log(err))
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        this.getScores();
      } 
    });
  }

  getScores() {
    var queryString = this.state.user.displayName.split(' ').join('%20');
    fetch(`/` + queryString)
    .then(response => response.json())
    .then(response => this.setState({ scores: response}))
    // .then(console.log(this.state.scores))
    .catch(err => console.log(err))
  }

  // addScore = () => {
  //   const { userScore } = this.state
  //   fetch(`/user/add?username='${userScore.username}'&course_name='${userScore.course_name}'&date_score='${userScore.date_score}'&score='${userScore.score}'`)
  //   .then(this.getScores)
  //   .catch( err => console.log(err))
  // }
  

  render() {
    function buttonFormatter(cell, row){
      return <ButtonGroup><Button color="danger">Delete</Button><Button color="secondary">Edit</Button></ButtonGroup>;
    }
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
            <div className='container'>
              <section className='add-item'>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <InputGroup>
                      <Input type="text" name="course_name" placeholder="Enter Course Name" onChange={this.handleChange} value={this.state.user.course_name} />
                      <Input type="text" name="date_score" placeholder="Enter Date" onChange={this.handleChange} value={this.state.date_score} />
                      <Input type="text" name="score" placeholder="Enter Score" onChange={this.handleChange} value={this.state.score} />
                      <Button type="submit" color="success">Add Score</Button>
                    </InputGroup>
                  </FormGroup>
                </Form>
              </section>
              <BootstrapTable ref='table' data={this.state.scores} striped hover condensed>
                <TableHeaderColumn isKey dataField='course_name' width='150'>Course Name</TableHeaderColumn>
                <TableHeaderColumn dataField='date_score' width='150'>Date Entered</TableHeaderColumn>
                <TableHeaderColumn dataField='score' width='90'>Score</TableHeaderColumn>
                <TableHeaderColumn dataField="button" width='150' dataFormat={buttonFormatter} headerAlign='center' dataAlign='center'>Actions</TableHeaderColumn>
              </BootstrapTable>
            </div>
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
