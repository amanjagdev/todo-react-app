import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todo';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
//import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import './App.css';
import { Component } from 'react/cjs/react.production.min';

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => {
      this.setState({ todos: res.data });
    });
  }

  //Toggle Todo Complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    }) });
  }

  //Delete Todo
  delTodo = (id) => {
    var todos = [];
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => {
      todos = [...this.state.todos.filter(todo => todo.id !== id)];
      this.setState({ todos: todos});
    });
  }

  //Add Todo
  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: title,
      component: false
    })
    .then(res => {
      this.setState({ todos: [...this.state.todos, res.data] });
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />

            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;