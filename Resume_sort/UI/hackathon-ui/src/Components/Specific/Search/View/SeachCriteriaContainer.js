import { connect } from 'react-redux';
import React, { Component } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { Col, Row } from "react-bootstrap";
import { submitSearchCriteria } from '../Redux/Actions';
import './SearchCriteria.css';

const validate = values => {
    const errors = {}
    if (!values.skillRequirement) {
        errors.skillRequirement = '* Required'
    }
    if (!values.totalExperience) {
        errors.totalExperience = '* Required'
    }
    if (!values.highestEducation) {
        errors.highestEducation = '* Required'
    }
    if (!values.role) {
        errors.role = '* Required'
    }
    return errors
}

class SeachCriteriaContainer extends Component {

    handleSearchCriteriaSubmission = () => {
        const { skillRequirement, role, totalExperience, highestEducation, history } = this.props
        this.props.submitSearchCriteria('http://localhost:5000/resume/compare', history, skillRequirement, totalExperience, highestEducation, role);
        this.props.reset();
    }

    handleReset = () => {
        this.props.reset();
    }

    renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
        <Row>
            <Col md={2} className="fieldLabelAlignment">
                <label className="control-label">{label}</label>
            </Col>
            <Col md={4}>
                <input {...input} placeholder={label} type={type} className="form-control" />
                {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
            </Col>
        </Row>
    )

    render() {
        const { pristine, submitting, invalid } = this.props
        return (
            <div className="searchContainerAlignment">
                <form>
                    <div className="form-group">
                        <Field name="skillRequirement" component={this.renderField} label="Skill Requirement" />
                    </div>
                    <div className="form-group">
                        <Field name="totalExperience" component={this.renderField} type="number" label="Total Experience in months" />
                    </div>
                    <div className="form-group">
                        <Field name="highestEducation" component={this.renderField} label="Highest Education" />
                    </div>
                    <div className="form-group">
                        <Field name="role" component={this.renderField} label="Role" />
                    </div>
                    <div className="form-group buttonSectionAlignment">
                        <button type="button" className="btn btn-primary" disabled={invalid || pristine || submitting} onClick={this.handleSearchCriteriaSubmission}>Search</button>
                        <button type="button" className="btn btn-primary resetButtonAlignment" disabled={pristine} onClick={this.handleReset}>Reset</button>
                    </div>
                </form>
            </div>
        );
    }
}

const selector = formValueSelector('searchCriteria');
const mapStateToProps = (state, props) => {
    const { skillRequirement, totalExperience, highestEducation, role } = selector(state, 'skillRequirement', 'totalExperience', 'highestEducation', 'role');
    return {
        initialValues: {},
        skillRequirement,
        totalExperience,
        highestEducation,
        role
    }
};

const mapDispatchToProps = dispatch => ({
    submitSearchCriteria: (url, history, skillRequirement, totalExperience, highestEducation, role) => dispatch(submitSearchCriteria(url, history, skillRequirement, totalExperience, highestEducation, role))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'searchCriteria',
    validate,
    enableReinitialize: true
})(SeachCriteriaContainer))