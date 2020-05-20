import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends React.Component {
  renderFields = () =>
    formFields.map(({ label, name }) => (
      <Field
        type="text"
        component={SurveyField}
        label={label}
        name={name}
        key={name}
      />
    ));

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Review
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  destroyOnUnmount: false, // requires class component
  form: 'surveyForm',
  validate: (values) => {
    const errors = {};
    errors.recipients = validateEmails(values.recipients || '');
    formFields.forEach(({ name }) => {
      if (!values[name]) errors[name] = 'Error: you must provide a value.';
    });
    return errors;
  }
})(SurveyForm);
