import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import toDoReducer from "./toDoSlice"
import authReducer from "./authSlice"

const rootReducer = combineReducers({
  modal: modalReducer,
  toDo: toDoReducer,
  auth : authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})