import { observable, action, computed } from 'mobx'
import React, { Component } from 'react'
import ReactDom, {Fragment} from 'react-dom'
import { observer, PropTypes as ObservablePropTypes } from 'mobx-react'
import PropTypes from 'prop-types'

// ---- 数据结构  ----
class Todo {
  id = Math.random()
  @observable title = ''
  @observable finished = false

  constructor(title) {
    this.title = title
  }

  @action.bound toggle() {
    this.finished = !this.finished
  }
}

// ---- state management ----
class Store {
  @observable todos = []

  @action.bound createTodo(title) {
    this.todos.unshift(new Todo(title));
  }

  @action.bound removeTodo(todo) {
    this.todos.remove(todo)
  }

  @computed get left() {
    return this.todos.filter(todo => !todo.finished).length
  }
}

const store = new Store()

// ---- 业务逻辑 ----
@observer
class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired, 
      finished: PropTypes.bool.isRequired
    }).isRequired
  }

  handleToggle = e => {
    this.props.todo.toggle()
  }
  
  render() {
    const todo = this.props.todo
    return (
      <React.Fragment>
        <input type="checkbox" className="toggle" checked={todo.finished} onChange={this.handleToggle} />
        <span className={['title', todo.finished && 'finished'].join(" ")}>{todo.title}</span>
      </React.Fragment>
    )
  }
}

@observer
class TodoList extends Component {
  static propTypes = {
    createTodo: PropTypes.func,
    store: PropTypes.shape({
      todos: ObservablePropTypes.observableArrayOf(ObservablePropTypes.observableObject).isRequired
    }).isRequired
  }

  state = {inputValue: ''}

  handleSubmit = (e) => {
    e.preventDefault()
    var store = this.props.store;
    var inputValue = this.state.inputValue
    store.createTodo(inputValue)
    this.setState({
      inputValue: ''
    })
  }

  handleChange = (e) => {
    var inputValue = e.target.value
    this.setState({
      inputValue
    })
  }

  render() {
    const store = this.props.store
    const todos = store.todos

    return (
      <div className="todo-list">
        <header>
          <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange} value={this.state.inputValue}
              className="input" placeholder="What needs to be finished?"
            />
          </form>
        </header>
        <ul>{todos.map(todo => {
          return (
            <li key={todo.id} className="todo-item">
              <TodoItem todo={todo} />
              <span className="delete" onClick={e => store.removeTodo(todo)}>X</span>
            </li>
          )
        })}</ul>
        <footer>{store.left} item{store.left > 1 ? 's' : ''} unfinished!</footer>
      </div>
    )
  }
}

// ---- service ----
ReactDom.render(<TodoList store={store} />, document.querySelector('#root'))
