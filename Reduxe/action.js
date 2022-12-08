export const SET_TASKS = 'SET_TASKS';
export const SET_TASK_ID = 'SET_TASK_ID';

export const setTasks = tasks => dispatch => {
    dispatch({
        type: SET_TASKS,
        payload: tasks,
    });
};

export const setTaskID = taskID => dispatch => {
    dispatch({
        type: SET_TASK_ID,
        payload: taskID,
    });
};


// Action pour les intevetion preventive
export const SET_PREVENTIVE = 'SET_PREVENTIVE';
export const SET_PREVENTIVE_ID = 'SET_PREVENTIVE_ID';

export const setPreventive = preventive => dispatch => {
    dispatch({
        type: SET_PREVENTIVE,
        payload: preventive,
    });
};

export const setPreventiveID = preventiveID => dispatch => {
    dispatch({
        type: SET_PREVENTIVE_ID,
        payload: preventiveID,
    });
};
