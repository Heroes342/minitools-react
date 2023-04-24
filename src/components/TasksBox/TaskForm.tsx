import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faFaceKiss,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import EmojiPicker from "emoji-picker-react";

type TaskFormProps = {
  onAddTask: (taskText: string) => void;
};

function TaskForm({ onAddTask }: TaskFormProps) {
  const [newTaskText, setNewTaskText] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const onEmojiClick = (emojiObject: { emoji: string }, event: MouseEvent) => {
    setNewTaskText(newTaskText + emojiObject.emoji);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowEmojiPicker(false);
    onAddTask(newTaskText);
    setNewTaskText("");
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(event.target.value);
  };

  return (
    <form className="addtask-form" onSubmit={handleSubmit}>
      <div style={{ position: "relative" }}>
        <input
          required
          placeholder="Insert a new Task"
          className="addtask-input"
          type="text"
          value={newTaskText}
          onChange={handleInputChange}
        />
        <button title="Add Task" type="submit">
          <FontAwesomeIcon icon={faPlusCircle} size="sm" />
        </button>
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          {showEmojiPicker ? (
            <FontAwesomeIcon icon={faX} size="sm" />
          ) : (
            <FontAwesomeIcon icon={faFaceKiss} size="sm" />
          )}
        </button>
        {showEmojiPicker && (
          <div
            className="emoji-picker"
            style={{
              position: "absolute",
              zIndex: 1,
              right: 0,
              bottom: "100%",
            }}
          >
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>
      {showMessage && <div className="add-bubble">Task added...</div>}
    </form>
  );
}

export default TaskForm;
