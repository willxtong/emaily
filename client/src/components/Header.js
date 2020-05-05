import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StripeWrapper from './StripeWrapper';

const Header = (props) => {
  const content = () => {
    switch (props.auth) {
      case null: // initializing
        return null;
      case false: // not logged in
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        // logged in
        return (
          <>
            <li>
              <StripeWrapper />
            </li>
            <li style={{ margin: '0 10px' }}>Credits: {props.auth.credits}</li>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          </>
        );
    }
  };
  return (
    <nav>
      <div className="nav-wrapper">
        <Link
          to={props.auth ? '/surveys' : '/'}
          className="left brand-logo"
          href="">
          Emaily
        </Link>
        <ul className="right">{content()}</ul>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Header);
