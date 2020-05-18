import React, {useEffect} from 'react';
import {Memory} from './Memory';
import {useSelector, useDispatch} from 'react-redux';
import {loadDay, startAddingMemory,enterEditMode} from './actions';
import './App.css';

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth()+1;
const day = date.getDay();

function App(){
  const memories = useSelector(state => state.memories); 
  

  const dispatch = useDispatch();

  useEffect( () => {
  dispatch(loadDay( month, day));

  }, [dispatch]);

  const onAdd = () => {
    dispatch(startAddingMemory(year, month, day));
  }
  const onEdit = () => {
    dispatch(startAddingMemory(year, month, day));
  }

  return(
       <div className = "memories-root">
       <div id = "add-button">
      <button id = "button1"onClick = {onEdit}> New Record</button>
        Travel Record
        </div>
      {memories.map(memory => <Memory key = {memory.id} memory  = {memory}/>)}
    </div>
  );
}

export default App;