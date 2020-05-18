export const Action = Object.freeze({
  LoadMemories: 'LoadMemories',
  FinishAddingMemory: 'FinishAddingMemory',
  EnterEditMode: 'EnterEditMode',
  LeaveEditMode: 'LeaveEditMode',
  FinishDeletingMemory: 'FinishDeletingMemory',
  FinishSavingMemory: 'FinishSavingMemory',
});
//this function 
export function loadMemories(memories){
  return {
    type: Action.LoadMemories,
    payload:memories,
  };
}

export function finishAddingMemory(memory){
  return {
    type: Action.FinishAddingMemory,
    payload:memory,
  };

  
}
export function finishSavingMemory(memory){
  return {
    type: Action.FinishSavingMemory,
    payload:memory,
  };

}
export function finishDeletingMemory(memory){
  return {
    type: Action.FinishDeletingMemory,
    payload:memory,
  };

}
export function enterEditMode(memory){
  return {
    type: Action.EnterEditMode,
    payload:memory,
  };
}
export function leaveEditMode(memory){
  return {
    type: Action.LeaveEditMode,
    payload:memory,
  };
}
export function startDeletingMemory(memory){
  const options = {
    method: 'DELETE', 
    };

    return dispatch => {
      fetch (`${host}/memories/${memory.id}`, options)
        .then(checkForErrors)
        .then(response=>response.json())
        .then(data => {
          if (data.ok){
          dispatch(finishDeletingMemory(memory));
          }
        })
        .catch(e => console.error(e));
    };
}

function checkForErrors(response)
{ 
  if(!response.ok){
    throw Error(`${response.status}: ${response.statusText}`)
  }
  return response;
}

const host = 'https://pop-api.duckdns.org:8442';

export function loadDay (month,day){
  return dispatch => {
  fetch(`${host}/memories`)
  .then(checkForErrors)
  .then(response => response.json())
  .then (data => {
    if (data.ok){
     dispatch(loadMemories(data.memories));
    }
  })
  .catch(e => console.error(e))
};
}
export function startSavingMemory(memory) {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(memory),
  }
  return dispatch => {
    fetch(`${host}/memories/${memory.id}`, options)
    .then(checkForErrors)
    .then(response => response.json()
    .then(data => {
      if (data.ok){
        dispatch(finishSavingMemory(memory));
      }
    })
    .catch(e => console.error(e)))
  };
}

export function startAddingMemory (year,month,day){
  const memory = {year, month, day, message: ''};
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(memory),
  }

  return dispatch => {
  fetch(`${host}/add`, options)
  .then(checkForErrors)
  .then(response => response.json())
  .then (data => {
    if (data.ok){
      memory.id = data.id;
      dispatch(finishAddingMemory(memory));
    }
  })
  .catch(e => console.error(e))
};
}