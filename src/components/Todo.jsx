import { useDispatch } from 'react-redux'
import { deleteTodo } from '../features/todo/todoSlice'

function Todo({ t }) {

    const dispatch = useDispatch()

    return (
        <div className='todo'>
            <h2>{t.todo}</h2>
            <button onClick={() => dispatch(deleteTodo(t.id))} className="close material-symbols-outlined">Delete</button>
        </div>
    )
}

export default Todo