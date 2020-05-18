import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {enterEditMode, leaveEditMode, startDeletingMemory, startSavingMemory} from './actions';
import './Memory.css';

const months = [
  "January", "February", "March", "April", "May", "June", "Junly", "August", "September", "October", "November", "December"
];

export function Memory(props){
  const memory = props.memory;
  const dispatch = useDispatch();
  const [year, setYear] = useState(memory.year);
  const [month, setMonth] = useState(memory.month);
  const [day, setDay] = useState(memory.day);
  const [message, setMessage] = useState(memory.message);

  const onEdit = () => {
    dispatch(enterEditMode(memory));
  }
  const onSave = () => {
    dispatch(startSavingMemory(memory));
  }
  const onCancel = () => {
    dispatch(leaveEditMode(memory));
  }
  const onDelete = () => {
    dispatch(startDeletingMemory(memory));
  }

  if (memory.isEditing){
    return (
    <div className = "memory">
      <div className = "memory-left">
        Enter Year   <input type = "text" value = {year} onChange = {e => setYear(parseInt(e.target.value))}/> 
        Enter Month  <input type = "text" value = {month} onChange = {e=> setMonth(parseInt(e.target.value))}/>
        
        Destination <textarea value = {message} onChange = {e=> setMessage(e.target.value)}/>
        
        <button id = "save-button"onClick = {onSave}>Save</button>
        <button id = "cancel-button"onClick = {onCancel}>Cancel</button>
      
      </div>
      <div className="memory-right">
      </div>
    </div>
    
  );}
  else {
  return (
    <div className = "memory">
    <link rel="stylesheet" type="text/css" href="Memory.css"></link>
      <div className = "memory-left">
        <span onClick = {onDelete} className = "delete-button"> &#x2716;</span>
        <span className = "year">{memory.year}</span>
        <span className = "month">{months[memory.month - 1]}  </span>
        
      </div>
      <div className="memory-right">
        {memory.message}
      </div>
    </div>
  );

  }

}

