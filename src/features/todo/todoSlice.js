import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import todoService from './todoService'

const initialState = {
    todos: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTodo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.todos.unshift(action.payload)
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
                state.isError = true
            })
            .addCase(getTodos.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.todos = action.payload
                state.isError = false
            })
            .addCase(getTodos.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
                state.isError = true
                state.todos = []
            })
            .addCase(deleteTodo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.todos = state.todos.filter((todo) => todo.id !== action.payload)
                state.isError = false
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
                state.isError = true
            })
    }
})

export const createTodo = createAsyncThunk('todos/create', async (todoData, thunkAPI) => {
    try {

        const user = thunkAPI.getState().auth.user
        return await todoService.createTodo(todoData, user)

    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const getTodos = createAsyncThunk('todos/getAll', async (_, thunkAPI) => {
    try {

        const user = thunkAPI.getState().auth.user
        return await todoService.getTodos(user)

    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteTodo = createAsyncThunk('todos/delete', async (id, thunkAPI) => {
    try {
        return await todoService.deleteTodo(id)

    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const { reset } = todoSlice.actions
export default todoSlice.reducer