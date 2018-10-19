// TODO: ADD ANIMATION WHEN IMAGES CHANGE
import React, { Component } from 'react'
import styles from '../../CSS-Modules/layout/Landing.module.css';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Landing extends Component {

    state = {
        srcPosibilities: ['1.jpg', '2.jpeg', '3.jpeg'],
        active: 0,
    }

    componentDidMount() {
        if(this.props.auth){
            this.props.history.push('/dashboard');
        }
        this.timerID = setInterval( () => this.tick(), 3500);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick = () => {
        if(this.state.active === 2){
            this.setState({
                active: 0,
            });
        }else{
            this.setState(perviousState => ({
                active: perviousState.active + 1,
            }));
        }
    }

    render() {
        return (
            <section className={styles.landing}>
                <div className={styles.landing__background}>
                    <img style={this.state.bgStyle} src={`./img/landing/${this.state.srcPosibilities[this.state.active]}`} alt="" 
                    className={styles.landing__background} />
                </div>    
                <header className={styles.landing__header}>
                    <h1 className={styles.landing__title}>Looking for new good experience?</h1>
                    <h2 className={styles.landing__title_secondary}>Our social media is open for everyone</h2>
                    <div className={styles.buttons}>
                        <Link className={`${styles.loginButton} ${styles.button}`} to="/login">Login</Link>
                        <Link className={`${styles.registerButton} ${styles.button}`} to="/register">Register</Link>
                    </div>
                </header>
            </section>
        )
    }
}

Landing.propTypes = {
    auth: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    auth: state.user.isAuthenticated
});

export default connect(mapStateToProps, null)(Landing);
