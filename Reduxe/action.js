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
export const SET_PLANNING_ITEM = 'SET_PLANNING_ITEM';
export const SET_PREVENTIVE_ID = 'SET_PREVENTIVE_ID';

export const setPreventives = preventives => dispatch => {
    dispatch({
        type: SET_PREVENTIVE,
        payload: preventives,
    });
};

export const setPreventiveID = preventiveID => dispatch => {
    dispatch({
        type: SET_PREVENTIVE_ID,
        payload: preventiveID,
    });
};
export const setPlanningItem = planningItem => dispatch => {
    dispatch({
        type: SET_PLANNING_ITEM,
        payload: planningItem,
    });
};

// Action sur les moteurs
export const SET_MOTEUR = 'SET_MOTEUR';
export const SET_MOTEUR_ITEM = 'SET_MOTEUR_ITEM';

export const setMoteurs = moteurs => dispatch => {
    dispatch({
        type: SET_MOTEUR,
        payload: moteurs,
    });
};

export const setMoteurItem = moteurItem => dispatch => {
    dispatch({
        type: SET_MOTEUR_ITEM,
        payload: moteurItem,
    });
};


// Action sur les interventions curative
export const SET_CURATIVE = 'SET_CURATIVE';
export const SET_CURATIVE_ITEM = 'SET_CURATIVE_ITEM';

export const setCuratives = curatives => dispatch => {
    dispatch({
        type: SET_CURATIVE,
        payload: curatives,
    });
};

export const setCurativeItem = curativeItem => dispatch => {
    dispatch({
        type: SET_CURATIVE_ITEM,
        payload: curativeItem,
    });
};


// Action sur les interventions de mise Hors service
export const SET_HS = 'SET_HS';
export const SET_HS_ITEM = 'SET_HS_ITEM';

export const setHSS = HSS => dispatch => {
    dispatch({
        type: SET_HS,
        payload: HSS,
    });
};

export const setHSItem = hsItem => dispatch => {
    dispatch({
        type: SET_HS_ITEM,
        payload: hsItem,
    });
};

// Action sur les Installation
export const SET_INSTALLATION = 'SET_INSTALLATION';
export const SET_INSTALLATION_ITEM = 'SET_INSTALLATION_ITEM';

export const setInstallations = installations => dispatch => {
    dispatch({
        type: SET_INSTALLATION,
        payload: installations,
    });
};

export const setInstallationItem = installationItem => dispatch => {
    dispatch({
        type: SET_INSTALLATION_ITEM,
        payload: installationItem,
    });
};