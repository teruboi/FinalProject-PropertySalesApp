import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Sidebar } from './components/sidebar';

function render (content, id) {
  ReactDOM.render(content, document.getElementById(id))
}

render(<Sidebar />, 'sidebar')
render(<App />, 'root')
