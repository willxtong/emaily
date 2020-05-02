import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const content = () => {
    switch (props.auth) {
      case null:
        return null;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
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
