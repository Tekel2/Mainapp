import { SET_TASKS, SET_TASK_ID } from './action';

import { SET_PREVENTIVE, SET_PREVENTIVE_ID } from './action';

const initialState = {
    preventive: [],
    preventiveID: 1,
}

function taskReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TASKS:
            return { ...state, tasks: action.payload };
        case SET_TASK_ID:
            return { ...state, taskID: action.payload };
        default:
            return state;
    }
}


function preventiveReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PREVENTIVE:
            return { ...state, preventive: action.payload };
        case SET_PREVENTIVE_ID:
            return { ...state, preventiveID: action.payload };
        default:
            return state;
    }
}



export default (taskReducer, preventiveReducer);