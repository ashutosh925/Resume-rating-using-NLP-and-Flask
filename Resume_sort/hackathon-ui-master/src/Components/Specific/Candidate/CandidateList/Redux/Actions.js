import axios from 'axios';
import { SET_EMPLOYEE_LIST } from './Constants';

export function fetchEmployeeList(url) {
    return (dispatch) => {
        axios.get(url)
            .then(response => {
                const { data } = response;
                if (data) {
                    dispatch(setEmployeeList(data))
                }
            })
            .catch(error => {
                console.error('Error in fetching employee list : ' + JSON.stringify(error));
            })
    };
}

function setEmployeeList(employeeList) {
    return {
        type: SET_EMPLOYEE_LIST,
        employeeList
    }
}