import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import { fetchUser } from '../actions';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

const App = (props) => {
  useEffect(() => {
    props.fetchUser();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      <BrowserRouter>
        <>
          <Header />
          <Route exact path="/" component={Landing}></Route>
          <Route exact path="/surveys" component={Dashboard}></Route>
          <Route path="/surveys/new" component={SurveyNew}></Route>
        </>
      </BrowserRouter>
    </div>
  );
};

export default connect(null, { fetchUser })(App);
