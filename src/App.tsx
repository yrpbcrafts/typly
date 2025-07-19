import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Router } from '@/routes/router';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Router />
    </div>
  );
}

export default App;
