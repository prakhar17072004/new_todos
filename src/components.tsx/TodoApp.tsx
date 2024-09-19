// components/TodoApp.tsx
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
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-5">Todo App</h1>
      <div className="flex mb-4">
        <input
          className="flex-grow border-2 border-gray-300 p-2 rounded-lg"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New todo"
        />
        <button
          className="bg-blue-500 text-black p-2 rounded-lg ml-2"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center mb-2">
            <span
              className={`flex-grow cursor-pointer ${
                todo.is_complete ? 'line-through text-gray-400' : ''
              }`}
              onClick={() => toggleComplete(todo.id, todo.is_complete)}
            >
              {todo.title}
            </span>
            <button
              className="bg-red-500 text-white p-1 rounded-lg"
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
