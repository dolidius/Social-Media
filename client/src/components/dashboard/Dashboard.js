import React, { Component } from 'react';
import styles from '../../CSS-Modules/dashboard/Dashboard.module.css';

import { connect } from 'react-redux';
import { getPosts, likePost } from '../../actions/postActions';
import PropTypes from 'prop-types';

import Nav from '../layout/Nav';
import PostEditor from '../common/PostEditor';
import Post from './Post';
import Spinner from '../common/Spinner';

class Dashboard extends Component {

    state = {
        posts: null,
        errors: null
    }

    componentDidMount(){
        this.props.getPosts();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.posts){
            this.setState({
                posts: nextProps.posts
            });
        }

        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    render() {
        return (
            <div>
                <Nav />
                <div className={styles.centerContainer}>
                    <div className={styles.postCreator}>
                        <PostEditor errors={this.state.errors} />
                    </div>

                    <div className={styles.postsContainer}>
                        {this.state.posts && this.state.posts.posts.map(post => 
                            <div key={post._id} className={styles.postContainer}>
                                <Post text={post.text} 
                                author={post.login}
                                avatar={post.avatar}
                                likes={post.likes}
                                date={post.date}
                                id={post._id}
                                cut={true}
                                userID={this.props.user.user.id}
                                postUser={post.user}
                                likePost={this.props.likePost}
                                width='75rem'
                                />
                            </div>
                        )}
                    </div>

                    {!this.state.posts && <div style={{display: 'flex', justifyContent: 'center', marginTop: '3rem'}}><Spinner /></div>}
                    

                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    posts: state.posts,
    errors: state.error
})

export default connect(mapStateToProps, { getPosts, likePost })(Dashboard);


