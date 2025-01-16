import React from 'react';
import App from './App';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '/src/main.css';


const rootElement = document.getElementById('root')

createRoot(rootElement).render(
    <StrictMode>
        <App />
    </StrictMode>
);