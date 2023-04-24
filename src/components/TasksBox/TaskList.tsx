import React, { useState, useEffect, useContext, useRef } from "react";
import { TasksContext } from "./TasksContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faSave,
  faSquare,
  faCheckSquare,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";

function TaskList() {
  const { tasks, setTasks } = useContext(TasksContext);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const tasksPerPage = 4;
  const maxPage = Math.ceil(tasks.length / tasksPerPage) - 1;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editIndex !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editIndex]);

  const handleNextPage = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleModifyTask = (index: number) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  const handleCheckTask = (index: number) => {
    let newTasks = [...tasks];
    newTasks[index].checked = !newTasks[index].checked;
    setTasks(newTasks);
  };

  const handleSaveTask = (index: number) => {
    let newTasks = [...tasks];
    newTasks[index].text = editText;
    setTasks(newTasks);
    setEditIndex(null);
    setEditText("");
  };

  const handleRemoveTask = (index: number) => {
    let newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    let displayedTasks =
      tasks.slice(currentPage * tasksPerPage, (currentPage + 1) * tasksPerPage)
        .length - 1;
    if (displayedTasks === 0 && currentPage >= 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <ul className="task-list">
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks added...</p>
      ) : (
        tasks
          .slice(currentPage * tasksPerPage, (currentPage + 1) * tasksPerPage)
          .map((task, index) => {
            const taskIndex = currentPage * tasksPerPage + index;
            return (
              <li key={taskIndex} className="task-item">
                <input
                  type="checkbox"
                  id={`task-${taskIndex}`}
                  className="hidden-checkbox"
                  checked={task.checked}
                  onChange={() => handleCheckTask(taskIndex)}
                />
                <label htmlFor={`task-${taskIndex}`}>
                  <FontAwesomeIcon icon={faSquare} className="unchecked-icon" />
                  <FontAwesomeIcon
                    icon={faCheckSquare}
                    className="checked-icon"
                  />
                </label>
                {editIndex === taskIndex ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      ref={inputRef}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSaveTask(taskIndex);
                        }
                      }}
                    />
                    <button
                      title="Save"
                      onClick={() => handleSaveTask(taskIndex)}
                    >
                      <FontAwesomeIcon icon={faSave} size="sm" />
                    </button>
                  </>
                ) : (
                  <>
                    <span className="task-text" title={task.text}>
                      {task.text}
                    </span>
                    <button
                      title="Edit"
                      onClick={() => handleModifyTask(taskIndex)}
                    >
                      <FontAwesomeIcon icon={faEdit} size="sm" />
                    </button>
                    <button
                      title="Remove"
                      onClick={() => handleRemoveTask(taskIndex)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} size="sm" />
                    </button>
                  </>
                )}
              </li>
            );
          })
      )}
      <div className="page-buttons">
        <button onClick={handlePrevPage}>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} size="sm" />
        </button>
        <div className="page-display">
          <span className="task-text ">
            {maxPage === -1 ? currentPage : currentPage + 1} of {maxPage + 1}
          </span>
        </div>
        <button onClick={handleNextPage}>
          <FontAwesomeIcon icon={faArrowAltCircleRight} size="sm" />
        </button>
      </div>
    </ul>
  );
}

export default TaskList;
