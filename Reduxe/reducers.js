import { SET_TASKS, SET_TASK_ID } from './action';

import { SET_PREVENTIVE, SET_PREVENTIVE_ID, SET_PLANNING_ITEM } from './action';
import { SET_PLANNING, SET_PLANNING_ID } from './action';
import { SET_CURATIVE, SET_CURATIVE_ITEM } from './action';
import { SET_HS, SET_HS_ITEM } from './action';
import { SET_INSTALLATION, SET_INSTALLATION_ITEM } from './action';
import { SET_MOTEUR, SET_MOTEUR_ITEM } from './action';

const initialState = {
    preventives: [],
    preventiveID: 1,
    planningItem: '',
}



// function taskReducer(state = initialState, action) {
//     switch (action.type) {
//         case SET_TASKS:
//             return { ...state, tasks: action.payload };
//         case SET_TASK_ID:
//             return { ...state, taskID: action.payload };
//         default:
//             return state;
//     }
// }


function preventiveReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PREVENTIVE:
            return { ...state, preventives: action.payload };
        case SET_PLANNING_ITEM:
            return { ...state, planningItems: action.payload};
        case SET_PREVENTIVE_ID:
            return { ...state, preventiveID: action.payload };
        default:
            return state;
    }
}


const initialStateCurative = {
    curatives:'',
    curativeItem: '',
}

function curativeReducer(state = initialStateCurative, action) {
    switch (action.type) {
        case SET_CURATIVE:
            return { ...state, curatives: action.payload };
        case SET_CURATIVE_ITEM:
            return { ...state, curativeItem: action.payload };
        default:
            return state;
    }
}


const initialStateInstallation = {
    installations:'',
    installationsItem: '',
}

function installationReducer(state = initialStateInstallation, action) {
    switch (action.type) {
        case SET_INSTALLATION:
            return { ...state, installations: action.payload };
        case SET_INSTALLATION_ITEM:
            return { ...state, installationItem: action.payload };
        default:
            return state;
    }
}

const initialStateHorservice = {
    HSS:'',
    hsItem: '',
}

function horserviceReducer(state = initialStateHorservice, action) {
    switch (action.type) {
        case SET_INSTALLATION:
            return { ...state, HSS: action.payload };
        case SET_INSTALLATION_ITEM:
            return { ...state, hsItem: action.payload };
        default:
            return state;
    }
}



export default (preventiveReducer, curativeReducer, horserviceReducer, installationReducer);