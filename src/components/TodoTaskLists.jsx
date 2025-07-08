import { useDispatch, useSelector } from "react-redux";
import chackBox from "../assets/checkbox.svg";
import pencil from "../assets/pencil.svg";
import box from "../assets/square-small.svg";
import deleteIcon from "../assets/trash.svg";

import { useEffect, useState } from "react";
import { deleteTodo, fetchTodos, updateTodo } from "../store/toDoSlice";

export default function ToDoTaskLists() {
  const user = useSelector((state) => state.auth.user);
  const toDoArr = useSelector((state) => state.toDo.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.uid) {
      dispatch(fetchTodos(user.uid));
    }
  }, [dispatch, user]);

  const handleToggleComplete = (id, isComplited) => {
    dispatch(
      updateTodo({ id: id, updatedFields: { isComplited: !isComplited } })
    );
  };

  const [editedTask, setEditedTask] = useState("");
  const [editedPriority, setEditedPriority] = useState("");
  const [editedDueDate, setEditedDueDate] = useState("");

  const handleToggleEdit = (id, isEditing) => {
    dispatch(updateTodo({ id: id, updatedFields: { isEditing: !isEditing } }));
  };

  const handleSaveEdit = (id) => {
    dispatch(
      updateTodo({
        id: id,
        updatedFields: {
          task: editedTask,
          dueDate:editedDueDate,
          priority2: editedPriority,
        },
      })
    );
    setEditedTask("");
    setEditedPriority("");
    setEditedDueDate("");
  };

  return (
    <>
      {toDoArr ? (
        toDoArr.map((toDo, i) => (
          <div
            key={i}
            className="bg-black/10 shadow-xl/30  py-2 px-5 sm:w-2/3 mx-auto w-[97%] rounded-2xl text-white my-3.5 relative min-h-42"
          >
            <div
              onClick={(e) => `
            ${handleToggleComplete(toDo.id, toDo.isComplited)}
            ${e.preventDefault()}`}
            >
              {toDo.isComplited ? (
                <img
                  src={chackBox}
                  className="w-5 absolute left-2 top-4 cursor-pointer"
                />
              ) : (
                <img src={box} className="w-9 absolute left-0 cursor-pointer" />
              )}
            </div>
            <div className="flex justify-between flex-wrap mt-8">
              <div className="flex gap-4">
                <h1>{`${i + 1}.`}</h1>
                {toDo.isEditing ? (
                  <div>
                    <input
                      defaultValue={toDo.task}
                      onChange={(e) => setEditedTask(e.target.value)}
                      className="border-2 border-amber-50 px-1.5 py-1 rounded-[8px]"
                    />
                  </div>
                ) : (
                  <h1
                    className={`text-wrap ${
                      toDo.isComplited ? "line-through" : ""
                    } min-h-9`}
                  >
                    {toDo.task}
                  </h1>
                )}
              </div>
              <div>
                {toDo.isEditing ? (
                  <input
                    className="border-2 border-black/30 rounded-2xl p-1 mx-1.5 my-1"
                    type="date"
                    defaultValue={toDo.dueDate}
                    onChange={(e) => setEditedDueDate(e.target.value)}
                  />
                ) : (
                  <h1 className="text-[12px] h-14 text-nowrap">{`Due Date:- ${toDo.dueDate}`}</h1>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-7 gap-4.5 ps-2.5 pb-2.5">
              <div>
                {toDo.isEditing ? (
                  <select
                    defaultValue={toDo.priority2}
                    onChange={(e) => setEditedPriority(e.target.value)}
                    className="border-2 border-black/30 rounded-2xl bg-blue-600"
                  >
                    <option value="Choose...">Choose...</option>
                    <option value={"Urgent"}>Urgent</option>
                    <option value={"Not Urgent"}>Not Urgent</option>
                  </select>
                ) : (
                  <h1 className="text-[12px]">{`${toDo.priority2}`}</h1>
                )}
              </div>
              <div className="flex gap-7.5">
                <div>
                  {toDo.isEditing ? (
                    <button
                      type="button"
                      className="cursor-pointer rounded-full w-6 bg-green-400 ml-2.5"
                      onClick={() => {
                        `
                        ${handleSaveEdit(toDo.id)}
                        ${handleToggleEdit(toDo.id, toDo.isEditing)}`;
                      }}
                    >
                      ✅
                    </button>
                  ) : (
                    <img
                      src={pencil}
                      alt="icon"
                      className="w-5 cursor-pointer"
                      onClick={(e) => `
            ${handleToggleEdit(toDo.id, toDo.isEditing)}
            ${e.preventDefault()}`}
                    />
                  )}
                </div>
                <img
                  src={deleteIcon}
                  alt=""
                  className="w-5 cursor-pointer"
                  onClick={(e) => `
            ${dispatch(deleteTodo(toDo.id))}
            ${e.preventDefault()}`}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div
          key={i}
          className="bg-black/10 shadow-xl/30  py-2 px-5 sm:w-2/3 mx-auto w-[97%] rounded-2xl text-white my-3.5 relative"
        >
          No to Do avaleble
        </div>
      )}
    </>
  );
}
