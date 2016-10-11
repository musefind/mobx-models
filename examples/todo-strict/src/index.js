import React from 'react'
import ReactDOM from 'react-dom'
import Model from '../../../Model'
import Store from '../../../Store'
import { observer } from 'mobx-react'
import { action, useStrict } from 'mobx'
import DevTools from 'mobx-react-devtools'

useStrict(true)

class Todo extends Model {
  static fields = ['id', 'text', 'completed']

  constructor(data) {
    super(data)
    this.mutateText = action(this.mutateText.bind(this))
  }

  mutateText(val) {
    this.text = val
  }
}

const TodoStore = new Store(Todo)

TodoStore.add = () => { TodoStore.findOrInitialize({text: 'New Todo'}) }

const TodoItem = observer(({ todo }) => (
  <li>
    {todo._oid}:
    &nbsp;
    <input type="text" value={todo.text} onChange={(e) => { todo.mutateText(e.target.value) }} />
  </li>
))

const App = observer(({ TodoStore }) => (
  <div>
    <ul>
      {TodoStore.objects.map(todo =>
        <TodoItem key={todo._oid} todo={todo} />
      )}

      <button onClick={TodoStore.add}>
        Add
      </button>
    </ul>
    <DevTools />
  </div>
))

ReactDOM.render(
  <App TodoStore={TodoStore} />,
  document.getElementById('root')
)
