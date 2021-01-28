import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import candidateList from '../Components/Specific/Candidate/CandidateList/Redux/CandidateListReducer';

const store = combineReducers({
    candidateList,
    form: formReducer
});

export default store;