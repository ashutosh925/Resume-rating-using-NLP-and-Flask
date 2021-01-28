import {SET_EMPLOYEE_LIST} from './Constants';

const initialState = [];

const employeeList = (state = initialState, action) => {
    switch (action.type) {
        case SET_EMPLOYEE_LIST:
            return action.employeeList
        default:
            return state;
    }
}

export default employeeList;