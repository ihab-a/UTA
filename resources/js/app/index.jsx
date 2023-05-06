import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import Main from './comps/main.jsx';
import '/resources/css/index.css';

ReactDOM.createRoot(document.getElementById("root")).render(<Main/>)

const store = createContext();

export { store };