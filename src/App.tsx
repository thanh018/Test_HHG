import React from 'react';
import './App.css';
import Counter from './components/counter';
import EmployeeList from './components/employeeList';

function App() {
  return (
    <div className="App">
      <Counter />
      <EmployeeList />
    </div>
  );
}

export default App;
