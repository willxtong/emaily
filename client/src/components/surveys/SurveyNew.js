import React from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

const SurveyNew = () => {
  const [showFormReview, setShowFormReview] = React.useState(false);

  const content = showFormReview ? (
    <SurveyFormReview onCancel={() => setShowFormReview(false)} />
  ) : (
    <SurveyForm onSurveySubmit={() => setShowFormReview(true)} />
  );

  return <div>{content}</div>;
};

export default reduxForm({ form: 'surveyForm' })(SurveyNew);
