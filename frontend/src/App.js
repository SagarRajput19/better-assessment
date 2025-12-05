import React from 'react';
import TaskList from './components/TaskList';

export default function App(){
  return (
    <div style={{padding:20,fontFamily:'Arial'}}>
      <h1>Task Manager</h1>
      <TaskList />
    </div>
  )
}
