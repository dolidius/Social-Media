import React, { Component } from 'react';
import style from '../../CSS-Modules/dashboard/Comments.module.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPost, likePost, createComment, deleteComment } from '../../actions/postActions';

import Nav from '../layout/Nav';
import Post from './Post';
import Spinner from '../common/Spinner';

class Comments extends Component {

    state = {
        post: null,
        text: '',
        errors: {}
    }

    componentDidMount(){
        this.props.getPost(this.props.match.params.id);
    }
  
    componentWillReceiveProps(nextProps){
        if(nextProps.post.post){
            this.setState({
                post: nextProps.post.post
            });
        }

        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    addComment = e => {
        e.preventDefault();
        const commentData = {
            text: this.state.text
        }

        if(commentData.text === ''){
            alert("Comment can't be empty");
        }else{
            this.props.createComment(commentData, this.props.match.params.id);
            this.setState({ text: '' });
        }
    }

    inputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    deleteComment = e => {
        this.props.deleteComment(this.props.match.params.id, e.target.id);
    }

    render() {
        return (
            <div>
                <Nav />
                {this.state.post &&
                <div>  
                    <div className={style.flexContainer}>
                        <div className={style.postContainer}>
                            <Post text={this.state.post.text} 
                            author={this.state.post.login}
                            avatar={this.state.post.avatar}
                            likes={this.state.post.likes}
                            date={this.state.post.date}
                            id={this.state.post._id}
                            userID={this.props.user.user.id}
                            likePost={this.props.likePost}
                            singlePost={true}
                            width='75rem'
                            />
                        </div>
                    </div>
                    <div className={style.commentsContainer}>
                        <div className={style.commentsBox}>
                            <form onSubmit={this.addComment} className={style.commentForm}>
                                <div className={style.formGroup}>
                                    <input 
                                        className={style.commentInput} 
                                        type="text" 
                                        name="text" 
                                        placeholder="Add new comment..."
                                        value={this.state.text}
                                        onChange={this.inputChange} 
                                        />
                                    <button className={style.commentButton}>Submit</button>
                                </div>
                            </form>

                            {this.state.post.comments.map(comment => (
                                <div key={comment._id} className={style.comment}>
                                    <div className={style.commentAvatar}>
                                        <img 
                                        className={style.commentAvatar} 
                                        src={comment.avatar} 
                                        alt="Avatar"
                                        />
                                    </div>
                                    <div className={style.commentText}>
                                        <p><strong>{comment.login}: </strong> {comment.text} </p>
                                        <span id={comment._id} onClick={this.deleteComment} className={style.deleteSymbol}>&#10005;</span>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>} 
                {!this.state.post && <div style={{display: 'flex', justifyContent: 'center', marginTop: '10rem'}}><Spinner /></div>}
            </div>
    )
  }
}

Comments.propTypes = {
    post: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    createComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post: state.posts,
    user: state.user,
    errors: state.error
});

export default connect(mapStateToProps, { getPost, likePost, createComment, deleteComment })(Comments);