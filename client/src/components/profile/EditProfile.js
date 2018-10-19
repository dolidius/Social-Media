import React, { Component } from 'react';
import styles from '../../CSS-Modules/profile/EditProfile.module.css';

import { connect } from 'react-redux';
import { updateProfile, getProfile } from '../../actions/profileActions';
import PropTypes from 'prop-types';

import Nav from '../layout/Nav';
import ProfileFormGroup from './ProfileFormGroup';
import Spinner from '../common/Spinner';

class EditProfile extends Component {

    state = {
        profile: null,
        avatar: '',
        liveIn: '',
        attendedTo: '',
        number: '',
        work: ''
    }

    inputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentDidMount(){
        if(this.props.user.user.id !== this.props.match.params.id){
            this.props.history.push('/');
        }
        this.props.getProfile(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.profile.profile){
            this.setState({
                profile: nextProps.profile.profile
            });
        }


        if(nextProps.profile.profile.avatar){
            this.setState({
                avatar: nextProps.profile.profile.avatar
            });
        }
        
        if(nextProps.profile.profile.liveIn){
            this.setState({
                liveIn: nextProps.profile.profile.liveIn
            });
        }
        
        if(nextProps.profile.profile.attendedTo){
            this.setState({
                attendedTo: nextProps.profile.profile.attendedTo
            });
        }

        if(nextProps.profile.profile.number){
            this.setState({
                number: nextProps.profile.profile.number
            });
        }
        
        if(nextProps.profile.profile.work){
            this.setState({
                work: nextProps.profile.profile.work
            });
        }

    }

    submitProfile = e => {
        e.preventDefault();
        const profileData = {
            avatar: this.state.avatar,
            liveIn: this.state.liveIn,
            attendedTo: this.state.attendedTo,
            number: this.state.number,
            work: this.state.work
        };
        
        this.setState({
            profile: null
        });

        this.props.updateProfile(profileData, this.props.history, this.props.match.params.id);

    }

    render() {
        if(this.state.profile){
            return (
            <div>
                <Nav />
                <div className={styles.container}>
                    <div className={styles.formBox}>
                        <h1 className={styles.title}>Edit Profile</h1>
                        <form onSubmit={this.submitProfile} className={styles.form}>

                            <ProfileFormGroup onChange={this.inputChange} value={this.state.avatar} name="avatar" label="Avatar (link)" />
                            <ProfileFormGroup onChange={this.inputChange} value={this.state.liveIn} name="liveIn" label="Live in" />
                            <ProfileFormGroup onChange={this.inputChange} value={this.state.attendedTo} name="attendedTo" label="Attended to (school)" />
                            <ProfileFormGroup onChange={this.inputChange} value={this.state.number} name="number" label="Phone number" />
                            <ProfileFormGroup onChange={this.inputChange} value={this.state.work} name="work" label="Working at" />

                            <button className={styles.button} >Submit</button>

                        </form>
                    </div>
                </div>
            </div>
        )}else{
            return(
                <div>
                    <Nav />
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '10rem'}}>
                        <Spinner />
                    </div>
                </div>
            )
        }
    }
}

EditProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    profile: state.profile,
    user: state.user
});

export default connect(mapStateToProps, { updateProfile, getProfile })(EditProfile);