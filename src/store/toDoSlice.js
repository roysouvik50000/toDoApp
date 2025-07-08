import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (user, { rejectWithValue }) => {
    try {
      // console.log("fatch to do called");
      const todosCollectionRef = collection(db, 'todos');
      const q = query(todosCollectionRef, where("user", "==", user), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const todos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return todos;
    } catch (error) {
      console.log(error.message)

      return rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (todoData, { rejectWithValue }) => {

    try {
      console.log(" todo added");
      const todosCollectionRef = collection(db, 'todos');
      const docRef = await addDoc(todosCollectionRef, todoData);
      return { id: docRef.id, ...todoData };
    } catch (error) {
      console.log("error in add todo");
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (todoId, { rejectWithValue }) => {
    try {
      console.log("delect to do called");
      const todoDocRef = doc(db, 'todos', todoId);
      await deleteDoc(todoDocRef);
      return todoId; // Return the ID of the deleted todo
    } catch (error) {
      console.log(error.message)
      return rejectWithValue(error.message);
    }
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, updatedFields }, { rejectWithValue }) => {
    try {
      const todoDocRef = doc(db, 'todos', id);
      await updateDoc(todoDocRef, updatedFields);
      return { id, ...updatedFields }; // Return updated todo data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearToDos: (state) => {
      state.todos = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Todo
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Delete Todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Update Todo
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
        );
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearToDos } = todoSlice.actions;

export default todoSlice.reducer;