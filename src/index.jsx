import { observable, action } from 'mobx'
import React, { Component } from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import { observer, PropTypes as ObservablePropTypes } from 'mobx-react'

// ---- state management ----
class Store {
  @observable cache = { queue: [] }

  @action.bound refresh() {
    this.cache.queue.push(1)
  }
}

const store = new Store()

// ---- 业务逻辑 ----
@observer
class Bar extends Component {
  static propTypes = {
    queue: ObservablePropTypes.observableArray
  }

  render() {
    const queue = this.props.queue

    return <span>{queue.length}</span>
  }
}

class Foo extends Component {
  static propTypes = {
    cahche: ObservablePropTypes.observableObject
  }

  render() {
    const cache = this.props.cache

    return (
      <div>
        <button onClick={this.props.refresh}>Refresh</button>
        <Bar queue={cache.queue} />
      </div>
    )

  }
}

// ---- service ----
ReactDom.render(<Foo cache={store.cache} refresh={store.refresh} />, document.querySelector('#root'))
