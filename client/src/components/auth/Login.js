import React, { Component } from 'react';
import styles from '../../CSS-Modules/auth/Login.module.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

import { Link } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {

    state = {
        login: '',
        password: '',
        errors: {}
    }

    inputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    login = e => {
        e.preventDefault();
        const newUser = {
            login: this.state.login,
            password: this.state.password
        }
        
        this.props.loginUser(newUser, this.props.history);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            });
        }

        if(nextProps.auth){
            this.props.history.push('/dashboard');
        }

    }

    componentDidMount(){
        if(this.props.auth){
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <section className={styles.login}>
                <div className={styles.box}>
                    <div className={styles.arrow}>
                        <Link to="/"><i className="fas fa-arrow-left"></i></Link>
                    </div>
                    <h1 className={styles.title}>Login</h1>

                <form className={styles.loginForm} onSubmit={this.login}>

                    <TextFieldGroup
                        groupClass={styles.formGroup}
                        inputClass={styles.input}
                        onChange={this.inputChange}
                        placeholder="Login"
                        type="text"
                        name="login"
                        value={this.state.login}
                        error={this.state.errors.login}
                        errorClass={styles.error}
                    />

                    <TextFieldGroup
                        groupClass={styles.formGroup}
                        inputClass={styles.input}
                        onChange={this.inputChange}
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={this.state.password}
                        error={this.state.errors.password}
                        errorClass={styles.error}
                    />


                    <button className={styles.button}>Submit</button>

                    <div className={styles.links}>
                        <Link className={styles.bottomLink} to="/register">Dont have an account?</Link>
                        <Link className={styles.bottomLink} to="/login">Forgot password?</Link>
                    </div>

                </form>

                </div>
            </section>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    errors: state.error,
    auth: state.user.isAuthenticated
});

export default connect(mapStateToProps, { loginUser })(Login);