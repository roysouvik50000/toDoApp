import { useDispatch, useSelector } from "react-redux";
import chackBox from "../assets/checkbox.svg";
import box from "../assets/square-small.svg";
import deleteIcon from "../assets/trash.svg";

import { useState } from "react";
import { deleteTodo, updateTodo } from "../store/toDoSlice";

export default function EditToDoTask({ toDo , i}) {
  const dispatch = useDispatch();

  const [editedTask, setEditedTask] = useState(toDo.task);
  const [editedPriority, setEditedPriority] = useState(toDo.priority2);
  const [editedDueDate, setEditedDueDate] = useState(toDo.dueDate);

  const handleToggleEdit = (id, isEditing) => {
    dispatch(updateTodo({ id: id, updatedFields: { isEditing: !isEditing } }));
  };

  const handleSaveEdit = (id) => {
    dispatch(
      updateTodo({
        id: id,
        updatedFields: {
          task: editedTask,
          dueDate: editedDueDate,
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
      <div className="bg-black/10 shadow-xl/30  py-2 px-5 sm:w-2/3 mx-auto w-[97%] rounded-2xl text-white my-3.5 relative min-h-42">
        <div>
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
            <div>
              <input
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
                className="border-2 border-amber-50 px-1.5 py-1 rounded-[8px]"
              />
            </div>
          </div>
          <div>
            <input
              className="border-2 border-black/30 rounded-2xl p-1 mx-1.5 my-1"
              type="date"
              value={editedDueDate}
              placeholder="Date"
              onChange={(e) => setEditedDueDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between mt-7 gap-4.5 ps-2.5 pb-2.5">
          <div>
            <select
              value={editedPriority}
              onChange={(e) => setEditedPriority(e.target.value)}
              className="border-2 border-black/30 rounded-2xl bg-blue-600"
            >
              <option value="Choose...">Choose...</option>
              <option value={"Urgent"}>Urgent</option>
              <option value={"Not Urgent"}>Not Urgent</option>
            </select>
          </div>
          <div className="flex gap-7.5">
            <div>
              <button
                type="button"
                className="cursor-pointer rounded-full w-6 bg-green-400 ml-2.5"
                onClick={() => {
                  ` ${handleSaveEdit(toDo.id)}
                    ${handleToggleEdit(
                        toDo.id,
                        toDo.isEditing
                    )}`;
                }}
              >
                ✅
              </button>
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
    </>
  );
}
