import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');

if (!rootElement) {
  alert("CRITICAL ERROR: The 'root' div is missing from index.html!");
} else {
  createRoot(rootElement).render(
    <div style={{ padding: 50, fontSize: 30, color: 'red', fontWeight: 'bold' }}>
      REACT IS WORKING! The issue is inside App.jsx or index.css.
    </div>
  );
}
