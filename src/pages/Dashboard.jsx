import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getTodos, reset } from '../features/todo/todoSlice'

//"Spinner" from components for isLoading
import Spinner from '../components/Spinner'

//Components
import TodoForm from '../components/TodoForm';
import Todo from '../components/Todo'

function Dashboard() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth)
  const { todos, isLoading, isError, message } = useSelector((state) => state.todos)

  useEffect(() => {

    if (!user) {
      navigate('/login')
    }

    if (isError) {
      console.log(message);
    }

    dispatch(getTodos())

    return () => {
      if (user) {
        dispatch(reset())
      }
    }

  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <TodoForm />
      </section>
      <section className='content'>
        {todos.length > 0 ? (
          <div className='todos'>
            {todos.map((todo) => (
              <Todo key={todo.id} t={todo} />
            ))}
          </div>
        ) : (
          <h3>You Haven't Added To Dos Yet</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard