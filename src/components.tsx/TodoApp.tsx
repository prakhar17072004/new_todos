import '../../src/app/globals.css'

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Todo {
  id: string;
  title: string;
  is_complete: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos from Supabase
  const fetchTodos = async () => {
    const { data, error } = await supabase.from('todos').select('*').order('id');
    if (error) console.error('Error fetching todos:', error.message);
    else setTodos(data || []);
  };

  // Add a new todo
  const addTodo = async () => {
    if (newTodo.trim()) {
      const { error } = await supabase.from('todos').insert([{ title: newTodo }]);
      if (error) console.error('Error adding todo:', error.message);
      else fetchTodos();
      setNewTodo('');
    }
  };

  // Toggle the completion status of a todo
  const toggleComplete = async (id: string, isComplete: boolean) => {
    const { error } = await supabase.from('todos').update({ is_complete: !isComplete }).eq('id', id);
    if (error) console.error('Error updating todo:', error.message);
    else fetchTodos();
  };

  // Delete a todo
  const deleteTodo = async (id: string) => {
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) console.error('Error deleting todo:', error.message);
    else fetchTodos();
  };

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-lg w-full bg-gray-700 p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-100 mb-6">Todo App</h1>
      
      {/* Input and Add Button */}
      <div className="flex mb-4">
        <input
          className="flex-grow bg-gray-600 text-gray-100 border-none p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New todo"
        />
        <button
          className="bg-blue-600 text-white p-2 rounded-lg ml-2 hover:bg-blue-700"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
      
      {/* Todo List */}
      <ul className="list-none space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between bg-gray-600 p-2 rounded-lg">
            {/* Checkbox and Todo Title */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={todo.is_complete}
                onChange={() => toggleComplete(todo.id, todo.is_complete)}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span
                className={`flex-grow ${
                  todo.is_complete ? 'line-through text-gray-400' : 'text-gray-100'
                }`}
              >
                {todo.title}
              </span>
            </div>
            
            {/* Delete Button */}
            <button
              className="bg-red-600 text-white p-1 rounded-lg hover:bg-red-700"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
