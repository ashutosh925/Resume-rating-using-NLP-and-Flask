import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { fetchEmployeeList } from '../Redux/Actions';

class CandidateListContainer extends Component {

    componentDidMount() {
        this.props.fetchEmployeeList('http://10.20.8.145:8080/app/employees');
    }

    handleCreateNewEmployee = () => {
        console.log('Creating new employees');
    }

    render() {
        const { employeeList } = this.props;
        const columnsMetadata = [
            {
                name: 'ID',
                selector: 'id',
                sortable: true,
                cell: row => <div style={{ fontWeight: 700 }}><Link to={`/employee/${row.id}`} >{row.id}</Link></div>
            },
            {
                name: 'First Name',
                selector: 'first_name',
                sortable: true,
            },
            {
                name: 'Last Name',
                selector: 'last_name',
                sortable: true,
                right: true,
            },
            {
                name: 'Age',
                selector: 'age',
                sortable: true,
            },
            {
                name: 'Manager ID',
                selector: 'manager_id',
                sortable: true,
                right: true,
            }
        ];

        return (
            <div>
                <span className="createEmployeeButtonPosition">
                    <button type="button" onCLick={this.handleCreateNewEmployee}>Create New Employee</button>
                </span>
                <div className="employeeListContainer">
                    <span>
                        List of Employees
                </span>
                    <DataTable
                        columns={columnsMetadata}
                        data={employeeList} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        employeeList: state.employeeList
    }
};

const mapDispatchToProps = dispatch => ({
    fetchEmployeeList: (url) => dispatch(fetchEmployeeList(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(CandidateListContainer);