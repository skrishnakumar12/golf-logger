import React, { Component } from 'react';
import { auth, provider } from './firebase';
import { Button, InputGroup, Form, FormGroup, Input } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      idDelete: [],
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
    this.delete = this.delete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
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
  delete() {
    var queryString = this.state.user.displayName.split(' ').join('%20');
    for(let id in this.state.idDelete) {
      fetch(`/` + queryString + `/delete?id=${this.state.idDelete[id]}`)
      .then()
      .catch( err => console.log(err))
    }
    this.getScores();
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
    this.setState({
      course_name: '',
      date_score: '',
      score: ''
    });
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

  handleRowSelect(row, isSelected, e) {
    if(isSelected) {
      this.state.idDelete.push(row.id);
    }
    else {
      var index = this.state.idDelete.indexOf(row.id)
      if(index > -1) {
        this.state.idDelete.splice(index, 1);
      }
    }
  }

  render() {
    // To delete rows you be able to select rows
    const selectRowProp = {
      mode: 'checkbox',
      onSelect: this.handleRowSelect
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
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <InputGroup>
                    <Input type="text" name="course_name" placeholder="Enter Course Name" onChange={this.handleChange} value={this.state.course_name} />
                    <Input type="text" name="date_score" placeholder="Enter Date" onChange={this.handleChange} value={this.state.date_score} />
                    <Input type="text" name="score" placeholder="Enter Score" onChange={this.handleChange} value={this.state.score} />
                    <Button type="submit" color="success">Add Score</Button>
                  </InputGroup>
                </FormGroup>
              </Form>
              {this.state.scores.message !==  "There are no scores yet! Add one using the 'Add Score' button" ?
              <div>
              <Button color="danger" className="float-left" onClick={this.delete}>Delete</Button>
              <BootstrapTable data={this.state.scores} selectRow={selectRowProp} striped hover condensed>
                <TableHeaderColumn isKey dataField='id' width='150' hidden>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='course_name' width='150'>Course Name</TableHeaderColumn>
                <TableHeaderColumn dataField='date_score' width='150'>Date Entered</TableHeaderColumn>
                <TableHeaderColumn dataField='score' width='90'>Score</TableHeaderColumn>
              </BootstrapTable>
              </div>
              :
              <h2 color="red">Add a score to see it here!</h2>
              }
            </div>
          </div>
        :
          <h2>To see all of your scores, Login!</h2>
        }
      </div>
    );
  }
}

export default App;
