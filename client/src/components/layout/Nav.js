import React, { Component } from 'react';

import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

class Nav extends Component {

    logout = () => {
        this.props.logoutUser();
    }

    render() {
        const { user } = this.props.user;
        return (
            <nav className="nav">

                <div className="nav_left">
                    <Link to="/" className="nav_link">Logo</Link>
                </div>

                <div className="spacer"></div>

                <div className="nav_right">                
                    <Link className="nav_link nav_toProfile" to={`/profile/${user.id}`}>
                     <img className="nav_avatar" src={user.avatar} alt="User Avatar" />{user.login}
                    </Link>
                    <Link to="/login" className="nav_link" onClick={this.logout}>Logout</Link>
                </div>

            </nav>
        )
    }
}

Nav.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { logoutUser })(Nav);