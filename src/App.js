import React, {useEffect, useState} from 'react';
import {Memory} from './Memory';
import {useSelector, useDispatch} from 'react-redux';
import {loadDay, startAddingMemory,enterEditMode} from './actions';
import './App.css';
/*
*/
function App(){
  const memories = useSelector(state => state.memories); 
  const dispatch = useDispatch(); 
  
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth()+1;
const day = date.getDay();
  useEffect( () => {
  dispatch(loadDay( month, day));

  }, [dispatch]);

  const onAdd = () => {
  const year=document.getElementById("txt1").value;
  const month=document.getElementById("txt2").value;
  const day=document.getElementById("txt3").value;
  const message = document.getElementById("txt4").value;
  const message2 = document.getElementById("txt5").value;
  

    dispatch(startAddingMemory(year, month, day,message,message2));
  }
  
  return(
       <div className = "memories-root">
       <div id = "add-button">
        Travel Recorder
        </div>
        <div id = "add">
      
        Enter Year:   <input type = "text"  id = "txt1" /> 
        Enter Month:  <input type = "text" id = "txt2" />
        Enter Day:  <input type = "text"  id = "txt3"/>
        Departure: <textarea type = "text" id = "txt4" />
        Arrival: <textarea type = "text" id = "txt5" />
        </div>
        <div id="buttonArea">
          <button id = "button1"onClick = {onAdd}>Add New Record</button>
        </div>
        <div id = "output">
      {memories.map(memory => <Memory key = {memory.id} memory  = {memory}/>)}</div>
    </div>
  );
}

export default App;