import React from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

const SurveyList = (props) => {
  React.useEffect(() => {
    props.fetchSurveys();
    //eslint-disable-next-line
  }, []);

  const renderSurveys = () =>
    props.surveys.reverse().map((survey) => (
      <div class="card blue-grey darken-1" key={survey._id}>
        <div class="card-content white-text">
          <span class="card-title">{survey.title}</span>
          <p>{survey.body}</p>
          <p className="right">
            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
          </p>
        </div>
        <div class="card-action">
          <a>Yes: {survey.yes}</a>
          <a>No: {survey.no}</a>
        </div>
      </div>
    ));

  return <div>{renderSurveys()}</div>;
};

const mapStateToProps = ({ surveys }) => ({ surveys });
const mapDispatchToProps = { fetchSurveys };

export default connect(mapStateToProps, mapDispatchToProps)(SurveyList);
