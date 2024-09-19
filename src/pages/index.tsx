// pages/index.tsx
import TodoApp from '../components.tsx/TodoApp';
import "../app/globals.css"

export default function Home() {
  return (
    <div className="  min-h-screen bg-gray-800  justify-center items-center text-white flex ">
      <TodoApp />
    </div>
  );
}
