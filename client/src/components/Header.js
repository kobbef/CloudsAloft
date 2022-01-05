import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

/* Class based component */
class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            {/* <a href="/auth/google"> Login with Google</a> */}
            <a href=""> Login with Google</a>
          </li>
        );
      default:
        return [
          // TBD
          // <li key="1"> <a href="">Home</a></li>,
          // <li key="2"> <a href="">Regions</a></li>,
          // <li key="3"> <a href="">Flight Plans</a></li>,
          // <li key="4"> <a href="">TAF</a></li>,
          // <li key="5"> <a href="">MOS</a></li>,
          // <li key="6"> <a href="">METAR</a></li>,
          // <li key="7"> <a href="/api/logout">Logout</a></li>
        ];
    }
  }

  render() {
    return (
      <div className="row">
        <nav>
          <div className="nav-wrapper blue-grey darken-4">
            <Link
              to={this.props.auth ? "/surveys" : "/"}
              className="left brand-logo"
            >
              FlightBag
            </Link>
            <ul className="right">{this.renderContent()}</ul>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Header);
