import { connect } from 'react-redux';
import React, { Component } from 'react';
import CandidateInformationContainer from './CandidateInformationContainer';
import StackedBarContainer from './StackedBarContainer';

class ScoreAnalysisContainer extends Component {

    render() {
        return (
            <div>
                <CandidateInformationContainer/>
                <StackedBarContainer {...this.props}/>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {}
};

export default connect(mapStateToProps, null)(ScoreAnalysisContainer);