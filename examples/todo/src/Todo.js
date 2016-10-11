import Model from '../../../Model'
import Store from '../../../Store'

export class Todo extends Model {
  static fields = ['id', 'name', 'completed']
}

export const TodoStore = new Store(Todo)

TodoStore.add = () => {
  TodoStore.findOrInitialize({text: 'New Todo'})
}
