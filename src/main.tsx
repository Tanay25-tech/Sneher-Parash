import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent unhandled promise rejection crashes (e.g. from restricted iframe clipboard permissions)
window.addEventListener('unhandledrejection', (event) => {
  console.warn('Handled rejection gracefully:', event.reason);
  event.preventDefault();
});

createRoot(document.getElementById('root')!).render(<App />);
