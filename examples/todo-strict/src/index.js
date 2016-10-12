import React from 'react'
import ReactDOM from 'react-dom'
import Model from '../../../Model'
import Store from '../../../Store'
import ObservableValue from '../../../ObservableValue'
import { observer } from 'mobx-react'
import { action, useStrict, computed } from 'mobx'
import DevTools from 'mobx-react-devtools'

useStrict(true) // use strict gives better debugging, note we wrap all mutating methods in the 'action' decorator

/** Models */

class Todo extends Model {
  static fields = ['id', 'text', 'completed']

  // Process the data before it is assigned, here we just make sure that the completed flag starts
  // out as false instead of undefined so React doesn't think our checkboxes are uncontrolled.
  static process(data) {
    if (data.completed === undefined) {
      data.completed = false
    }
    return data
  }

  // Explicitly wrap the state mutating functions in the action decorator. This gives better debugging.
  constructor(data) {
    super(data)
    this.mutateText = action(this.mutateText.bind(this))
    this.toggleCompleted = action(this.toggleCompleted.bind(this))
  }

  mutateText(val) {
    this.text = val
  }

  toggleCompleted() {
    this.completed = !this.completed
  }
}


/** Stores */

// The UiStore is used for all Ui state. This allows us to build only 'presentational' components and let MobX handle
// the wiring of them together.
const UiStore = {
  filter: new ObservableValue('all', {
    onSet: function (val) {
      console.log('setting filter', val)
    }
  })
}

const TodoStore = new Store(Todo)

TodoStore.add = () => { TodoStore.findOrInitialize({text: 'New Todo'}) }

TodoStore.all = computed(() => TodoStore.objects)
TodoStore.completed = computed(() => TodoStore.objects.filter(o => o.completed))
TodoStore.incomplete = computed(() => TodoStore.objects.filter(o => !o.completed))



/** Components */

const TodoItem = observer(({ todo }) => (
  <li>
    {todo._oid}:
    &nbsp;
    <input type="text" value={todo.text} onChange={(e) => { todo.mutateText(e.target.value) }} />
    <input type="checkbox" checked={todo.completed} onChange={() => { todo.toggleCompleted() }} />
  </li>
))

const FilterSelector = observer(({ filter }) => (
  <select value={filter.value} onChange={(e) => { filter.set(e.target.value) }}>
    <option value="all">All</option>
    <option value="completed">Completed</option>
    <option value="incomplete">Incomplete</option>
  </select>
))

// The App component merely is a function of the current state. This is due to the UiStore component which holds all
// the Ui related state. Note the use of 'get' on observable components. This allows us to avoid using a decorator.
// MobX will work with or without the decorator, it's up to how you prefer to use it.
const App = observer(({ TodoStore, UiStore }) => (
  <div>
    <FilterSelector filter={UiStore.filter} />
    <ul>
      {TodoStore[UiStore.filter.value].get().map(todo =>
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
  <App TodoStore={TodoStore} UiStore={UiStore} />,
  document.getElementById('root')
)
