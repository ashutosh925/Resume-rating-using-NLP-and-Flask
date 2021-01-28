import axios from 'axios';
import { SET_SEARCH_RESULT, SET_ANALYSIS_RESULT } from './Constants';

export function analyseCandidates(url, history) {
    return (dispatch) => {
        axios.get(url)
            .then(response => {
                dispatch(setAnalysisResult(response.data));
                history.push('/analysis');
                console.log('Response of analysis API: ' + JSON.stringify(response));
            }).catch(error => {
                console.error('Error in analysis API : ' + JSON.stringify(error));
            });
    };
}

function setAnalysisResult(analysisResult) {
    return {
        type: SET_ANALYSIS_RESULT,
        analysisResult
    }
}

export function setSearchResult(searchResult) {
    return {
        type: SET_SEARCH_RESULT,
        searchResult
    }
}