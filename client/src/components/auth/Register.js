import React, { Component } from 'react';
import styles from '../../CSS-Modules/auth/Register.module.css';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

import { Link } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {

    state = {
        login: '',
        email: '',
        password: '',
        errors: {}
    }

    inputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register = e => {
        e.preventDefault();
        const newUser = {
            login: this.state.login,
            email: this.state.email,
            password: this.state.password
        }

        this.props.registerUser(newUser, this.props.history);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount(){
        if(this.props.auth){
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <section className={styles.register}>
                <div className={styles.box}>
                    <div className={styles.arrow}>
                        <Link to="/"><i className="fas fa-arrow-left"></i></Link>
                    </div>
                    <h1 className={styles.title}>Register</h1>
                    <form className={styles.registerForm} onSubmit={this.register}>

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
                            placeholder="Email"
                            type="text"
                            name="email"
                            value={this.state.email}
                            error={this.state.errors.email}
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
                            <Link className={styles.bottomLink} to="/login">Arleady have an account?</Link>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    errors: state.error,
    auth: state.user.isAuthenticated
});

export default connect(mapStateToProps, { registerUser })(Register);