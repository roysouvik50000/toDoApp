import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { modalHandelar } from "../store/modalSlice";
import { addTodo, fetchTodos } from "../store/toDoSlice";

const AddToDoTaskModal = () => {
  const [loading , setLoading] = useState(false);
  const notify = () => toast("New task added . ");
  const user = useSelector((state) => state.auth.user);
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority1, setPriority1] = useState("");
  const [priority2, setPriority2] = useState("");
  const dispatch = useDispatch();

  const submitToDo = () => {
    const todoData = {
        task: task,
        dueDate: dueDate,
        priority1: priority1,
        priority2: priority2,
        isComplited: false,
        isEditing: false,
        createdAt: new Date().toISOString(),
        user: user.uid,
      }
    dispatch(
      addTodo(todoData)
    );
    setTask("");
    setDueDate("");
    setPriority1("");
    setPriority2("");
  };

  const isOpen = useSelector((state) => state.modal.isOpen);



  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Add To-Do's</h2>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-5xl"
          onClick={() => dispatch(modalHandelar())}
        >
          &times;
        </button>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div>
            <label>New Task :-</label>
            <input
              className="border-2 border-black/30 rounded-2xl p-1 mx-1.5 my-1"
              placeholder="Add a new task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>

          <div>
            <label>Date :-</label>
            <input
              className="border-2 border-black/30 rounded-2xl p-1 mx-1.5 my-1"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div>
            <label>Priorityes :-</label>
            <select
              value={priority1}
              onChange={(e) => setPriority1(e.target.value)}
              className="border-2 border-black/30 rounded-2xl p-1 mx-1.5 my-1"
            >
              <option value="Choose...">Choose...</option>
              <option value={"Importent"}>Importent</option>
              <option value={"Not Importent"}>Not Importent</option>
            </select>
            <select
              value={priority2}
              onChange={(e) => setPriority2(e.target.value)}
              className="border-2 border-black/30 rounded-2xl p-1 mx-1.5 my-1"
            >
              <option value="Choose...">Choose...</option>
              <option value={"Urgent"}>Urgent</option>
              <option value={"Not Urgent"}>Not Urgent</option>
            </select>
          </div>

          <button
            variant="primary"
            className="cursor-pointer px-1.5 py-1 rounded-3xl bg-blue-950 text-white font-bold hover:bg-blue-600 hover:text-white my-7 float-right w-16"
            type="submit"
            onClick={() => `
              ${submitToDo()}
              ${setLoading(true)}
              ${setTimeout(() => setLoading(false), 1000)}
              ${notify()}
              `}
          >
            <div className="mt-0.5">
              {loading ? (
                <ClipLoader color="#ffffff" loading={loading} size={20} />
              ) : (
                <div>Submit</div>
              )}
            </div>
          </button>
        </form>
        <button
          type="button"
          className="cursor-pointer px-1.5 py-1 rounded-3xl bg-blue-950 text-white font-bold hover:bg-blue-600 hover:text-white mx-1 my-7"
          onClick={() => dispatch(modalHandelar())}
        >
          Done
        </button>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default AddToDoTaskModal;
