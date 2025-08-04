import React, { useState, useRef } from 'react';
import './App.css';

// PUBLIC_INTERFACE
/**
 * The main App component for the todo list application.
 *
 * Provides a modern, minimal, light-themed UI to add, edit, delete, and mark todos as complete.
 * Utilizes in-memory state for todos (no backend/storage).
 */
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef();

  // Color theme variables according to requirements
  const THEME_COLORS = {
    accent: '#ff9800',
    primary: '#1976d2',
    secondary: '#424242',
    // Text and background are set by CSS vars in App.css
  };

  // PUBLIC_INTERFACE
  /**
   * Handles adding a new todo item.
   * @param {Event} e - Form submit event.
   */
  const handleAddTodo = (e) => {
    e.preventDefault();
    const title = input.trim();
    if (!title) return;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        title,
        completed: false,
      },
    ]);
    setInput('');
    if (inputRef.current) inputRef.current.focus();
  };

  // PUBLIC_INTERFACE
  /**
   * Handles marking a todo item as completed or not.
   * @param {number} id - Todo id.
   */
  const toggleTodo = (id) => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // PUBLIC_INTERFACE
  /**
   * Initializes editing of a todo.
   * @param {number} id - Todo id.
   * @param {string} title - Current value.
   */
  const startEdit = (id, title) => {
    setEditId(id);
    setEditValue(title);
  };

  // PUBLIC_INTERFACE
  /**
   * Saves the edited todo item.
   * @param {Event} e - Form event.
   */
  const handleEditSave = (e) => {
    e.preventDefault();
    const newTitle = editValue.trim();
    if (!newTitle) return;
    setTodos(todos =>
      todos.map(todo =>
        todo.id === editId ? { ...todo, title: newTitle } : todo
      )
    );
    setEditId(null);
    setEditValue('');
  };

  // PUBLIC_INTERFACE
  /**
   * Cancels the edit mode.
   */
  const cancelEdit = () => {
    setEditId(null);
    setEditValue('');
  };

  // PUBLIC_INTERFACE
  /**
   * Deletes a todo item.
   * @param {number} id - Todo id.
   */
  const deleteTodo = (id) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="App" style={{ background: 'var(--bg-primary)' }}>
      <header className="todo-header">
        <h1 className="todo-title">
          Todo List
        </h1>
        <span className="todo-subtitle">
          Simple modern, minimal UI &mdash; stay productive.
        </span>
      </header>
      <main className="todo-main">
        <form className="todo-add-form" onSubmit={handleAddTodo}>
          <input
            className="todo-input"
            ref={inputRef}
            type="text"
            aria-label="Add new todo"
            placeholder="Add a new task..."
            style={{ borderColor: THEME_COLORS.primary }}
            value={input}
            onChange={e => setInput(e.target.value)}
            maxLength={80}
            autoFocus
          />
          <button
            type="submit"
            className="todo-add-btn"
            style={{ background: THEME_COLORS.primary, color: "#fff" }}
            aria-label="Add Todo"
            disabled={!input.trim()}
          >
            +
          </button>
        </form>
        <ul className="todo-list" aria-label="Todo List">
          {todos.length === 0 &&
            <li className="todo-empty">No todos yet. Add your first task!</li>
          }
          {todos.map(todo => (
            <li
              key={todo.id}
              className={`todo-item${todo.completed ? ' completed' : ''}${editId === todo.id ? ' editing' : ''}`}
              style={{
                borderColor: THEME_COLORS.secondary,
                background: 'var(--bg-secondary)'
              }}
            >
              <div className="todo-left">
                <input
                  className="todo-checkbox"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
                  style={{
                    accentColor: THEME_COLORS.accent,
                    minWidth: '1.2rem',
                    minHeight: '1.2rem'
                  }}
                />
                {editId === todo.id ? (
                  <form className="todo-edit-form" onSubmit={handleEditSave}>
                    <input
                      className="todo-edit-input"
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      maxLength={80}
                      aria-label="Edit todo"
                      autoFocus
                    />
                    <button type="submit" className="todo-save-btn" style={{ color: THEME_COLORS.primary }}>
                      <span role="img" aria-label="Save">💾</span>
                    </button>
                    <button type="button" className="todo-cancel-btn" style={{ color: THEME_COLORS.secondary }} onClick={cancelEdit}>
                      <span role="img" aria-label="Cancel">&#10005;</span>
                    </button>
                  </form>
                ) : (
                  <span
                    className="todo-title-text"
                    onDoubleClick={() => startEdit(todo.id, todo.title)}
                    title="Double-click to edit"
                  >
                    {todo.title}
                  </span>
                )}
              </div>
              <div className="todo-actions">
                {editId !== todo.id &&
                  <>
                    <button
                      className="todo-action-btn"
                      style={{ color: THEME_COLORS.accent }}
                      onClick={() => startEdit(todo.id, todo.title)}
                      aria-label="Edit Todo"
                    >
                      <span role="img" aria-label="Edit">&#9998;</span>
                    </button>
                    <button
                      className="todo-action-btn"
                      style={{ color: THEME_COLORS.secondary }}
                      onClick={() => deleteTodo(todo.id)}
                      aria-label="Delete Todo"
                    >
                      <span role="img" aria-label="Delete">&#128465;</span>
                    </button>
                  </>
                }
              </div>
            </li>
          ))}
        </ul>
      </main>
      <footer className="todo-footer">
        <span className="footer-text">
          <span style={{ color: THEME_COLORS.accent, fontWeight: 700 }}>Todo App</span> &nbsp;| &nbsp;Modern & Minimal&nbsp; &copy; {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}

export default App;
