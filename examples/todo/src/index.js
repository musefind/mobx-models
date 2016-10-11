import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { TodoStore } from './Todo'

const TodoItem = observer(({ todo }) => (
  <li>
    {todo._oid}:
    &nbsp;
    <input type="text" value={todo.text} onChange={(e) => { todo.text = e.target.value }} />
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
  </div>
))

ReactDOM.render(
  <App TodoStore={TodoStore} />,
  document.getElementById('root')
)
