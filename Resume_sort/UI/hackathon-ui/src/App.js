import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundaryContainer from '../src/Components/Shared/ErrorHandling/ErrorBoundaryContainer';
import ResourceNotFoundComponent from '../src/Components/Shared/ResourceNotFound/ResourceNotFoundContainer';
import SeachCriteriaContainer from './Components/Specific/Search/View/SeachCriteriaContainer';
import CandidateListContainer from '../src/Components/Specific/Candidate/CandidateList/View/CandidateListContainer';
import ScoreAnalysisContainer from '../src/Components/Specific/ScoreAnalysis/View/ScoreAnalysisContainer';

function App() {
  return (
    <div className="App">
      <ErrorBoundaryContainer>
        <Router>
          <Switch>
            <Route exact path="/" component={SeachCriteriaContainer} />
            <Route exact path="/candidates" component={CandidateListContainer} />
            <Route exact path="/analysis" component={ScoreAnalysisContainer} />
            <Route component={ResourceNotFoundComponent} />
          </Switch>
        </Router>
      </ErrorBoundaryContainer>
    </div>
  );
}

export default App;
