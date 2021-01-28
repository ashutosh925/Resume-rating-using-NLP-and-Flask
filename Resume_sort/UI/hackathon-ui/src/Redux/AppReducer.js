import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import searchResult from '../Components/Specific/Candidate/CandidateList/Redux/SearchResultReducer';

const store = combineReducers({
    searchResult,
    form: formReducer
});

export default store;