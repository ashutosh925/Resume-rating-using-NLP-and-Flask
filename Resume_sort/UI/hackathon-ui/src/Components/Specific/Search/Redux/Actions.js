import axios from 'axios';
import { setSearchResult } from '../../Candidate/CandidateList/Redux/Actions';

export function submitSearchCriteria(url, history, skillRequirement, totalExperience, highestEducation, role) {
    return (dispatch) => {
        axios.get(url, {
            params: {
                skillRequirement,
                totalExperience,
                highestEducation,
                role
            }
        }).then(response => {
            dispatch(setSearchResult(response.data));
            history.push('/candidates')
            console.log('Response of search criteria submission API: ' + JSON.stringify(response));
        }).catch(error => {
            console.error('Error in search criteria submission API : ' + JSON.stringify(error));
        });
    };
}