import { SET_SEARCH_RESULT, SET_ANALYSIS_RESULT } from './Constants';

const initialState = {
   searchData: {},
   analysisData: []
};

const searchResult = (state = initialState, action) => {
   switch (action.type) {
      case SET_SEARCH_RESULT: {
         const updatedState = { ...state, searchData: action.searchResult };
         return updatedState;
      }
      case SET_ANALYSIS_RESULT: {
         const updatedState = { ...state, analysisData: action.analysisResult };
         return updatedState;
      }
      default:
         return state;
   }
}

export default searchResult;