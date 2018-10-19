import React, { Component } from 'react';
import styles from '../../CSS-Modules/profile/Profile.module.css';
import { Link } from 'react-router-dom';

import isEmpty from '../../utilities/isEmpty';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts, likePost } from '../../actions/postActions';
import { getProfile } from '../../actions/profileActions';

import Nav from '../layout/Nav';
import Post from '../dashboard/Post';
import Spinner from '../common/Spinner';
import Info from './Info';

class Profile extends Component {

    state = {
        posts: null,
        profile: null
    }

    componentDidMount(){
        this.props.getPosts();
        this.props.getProfile(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps){
        if(!isEmpty(nextProps.posts.posts)){
            const posts = nextProps.posts.posts.filter(post => post.user === this.props.match.params.id);
            this.setState({ posts });
        }

        if(nextProps.profile){
            this.setState({profile: nextProps.profile});
        }

        if(this.props.match.params.id !== nextProps.match.params.id){
            this.setState({
                posts: null,
                profile: null
            });
            this.props.getPosts();
            this.props.getProfile(nextProps.match.params.id);
        }

    }

    render() {
        let auth = false;
        if(this.props.match.params.id === this.props.user.user.id)auth = true;
        if(this.state.profile){
            const profile = this.state.profile.profile;
            const background = profile.background ? profile.background : 'https://images.pexels.com/photos/952670/pexels-photo-952670.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';

            return (
                <div>
                    <Nav />
                    <div className={styles.container}>
                        <section 
                            style={{
                            background: `url(${background})`, 
                            backgroundPosition: 'center', 
                            backgroundSize: 'cover'}} 
                            className={styles.topProfile}>

                            <div className={styles.avatarContainer}>
                                <img className={styles.avatar} src={profile.avatar} alt="User's avatar"/>
                            </div>

                            <h1 className={styles.login}>{profile.login}</h1>

                        </section>

                        <section className={styles.bottomProfile}>
                            <div className={styles.infoContainer}>
                                
                                {profile.liveIn && <Info info="Live in:" value={profile.liveIn} />}
                                {profile.joinDate && <Info info="Join date:" value={profile.joinDate} />}
                                {profile.attendedTo && <Info info="Attended to:" value={profile.attendedTo} />}
                                {profile.number && <Info info="Phone number:" value={profile.number} />}
                                {profile.email && <Info info="Email:" value={profile.email} />}
                                {profile.work && <Info info="Working:" value={profile.work} />}

                                {auth && <Link to={`/profile/edit/${this.props.match.params.id}`} className={styles.editInfo}>Edit</Link>}

                            </div>
                            <div className={styles.posts}>
                                {this.state.posts && 
                                    this.state.posts.map(post =>
                                        <div key={post._id} className={styles.post}>
                                        <Post text={post.text} 
                                        author={post.login}
                                        avatar={post.avatar}
                                        likes={post.likes}
                                        date={post.date}
                                        id={post._id}
                                        userID={this.props.user.user.id}
                                        postUser={post.user}
                                        cut={true}
                                        likePost={this.props.likePost}
                                        width='60rem'
                                        />
                                        </div>
                                    )
                                }
                            </div>
                        </section>

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

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    posts: state.posts,
    profile: state.profile
});

export default connect(mapStateToProps, { getPosts, likePost, getProfile })(Profile);