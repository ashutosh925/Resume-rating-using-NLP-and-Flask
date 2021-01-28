import { connect } from 'react-redux';
import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import './CandidateListStyle.css';
import { analyseCandidates } from '../Redux/Actions';

const candidateProperties = ['name', 'score'];

class CandidateListContainer extends Component {

handleRankingOfCandidates = () => {
const { history } = this.props;
this.props.analyseCandidates('http://localhost:5000/resume/getAnalysis', history);
console.log('Analysing shortlisted candidates further...');
}

navigateBack = () => {
this.props.history.push('/');
}

constructTableRow = (searchResult) => {
let organisedCandidateList = [];
let candidateObj = {};
if (searchResult && searchResult.score && searchResult.score && searchResult.score.length) {
searchResult.score.forEach((candidate, candidateIndex) => {
let index = 0;
candidate.forEach(fieldValue => {
if (index < candidateProperties.length) {
const propertyName = candidateProperties[index];
index++;
if (propertyName === 'name' && candidateIndex == 0) {
fieldValue = 'Meghana';
}
if (propertyName === 'name' && candidateIndex == 1) {
fieldValue = 'Rajesh';
}
if (propertyName === 'name' && candidateIndex == 2) {
fieldValue = 'Aniket';
}
if (propertyName === 'score') {
fieldValue = fieldValue.toFixed(2);
}
candidateObj[propertyName] = fieldValue;
}
});
candidateObj.id = candidateIndex + 1;
organisedCandidateList.push(candidateObj);
candidateObj = {};
});
}
return organisedCandidateList;
}

render() {
const constructedCandidateList = this.constructTableRow(this.props.searchResult);
const columnsMetadata = [
{
name: 'ID',
selector: 'id',
sortable: true
},
{
name: 'Name',
selector: 'name',
sortable: true
},
{
name: 'Score',
selector: 'score',
sortable: true,
}
];

return (
<div>
<div className="employeeListContainer">
<span>
List of matching candidates
</span>
<DataTable
columns={columnsMetadata}
data={constructedCandidateList} />
</div>
<div class="text-center">
<button type="button" className="btn btn-primary" disabled={!constructedCandidateList.length} onClick={this.handleRankingOfCandidates}>Analyse</button>
<button type="button" className="btn btn-primary backButtonAlignment" onClick={this.navigateBack}>Back To Home</button>
</div>
</div>
);
}
}

const mapStateToProps = (state, props) => {
return {
searchResult: state.searchResult.searchData || {}
}
};

const mapDispatchToProps = dispatch => ({
analyseCandidates: (url, history) => dispatch(analyseCandidates(url, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(CandidateListContainer);