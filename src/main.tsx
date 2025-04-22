
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add global CSS variables for color themes
document.documentElement.style.setProperty('--background-color', '#F1F0FB');
document.documentElement.style.setProperty('--text-color', '#333333');

createRoot(document.getElementById("root")!).render(<App />);
