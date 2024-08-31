import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode >
      <div
          style={{ width: '100%',
              height: '100vh',
              margin: '0',
              padding: '0',
              background: '#dad5b5',
          }}
      >
          <App />
      </div>
  </React.StrictMode>,
);
