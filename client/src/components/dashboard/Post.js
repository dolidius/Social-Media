import React, { Component } from 'react';
import styles from '../../CSS-Modules/dashboard/Post.module.css'

import { Link } from 'react-router-dom';

class Post extends Component {

    state = {
        likeStyles: {
            backgroundColor:'#49CB34', 
            fontWeight: 'bold'
        },

        likeStyles2: {
            color:'#4A65E0', 
            fontWeight:'bold'
        }
        
    }

    like = () => {
        this.props.likePost(this.props.id, this.props.singlePost);
    }

    render() {
        let likeStyles = {};
        let likeStyles2 = {};
        if(this.props.likes.filter(like => like.user.toString() === this.props.userID).length > 0){
            likeStyles  = this.state.likeStyles;
            likeStyles2 = this.state.likeStyles2;
        }
        return (
            <div className={styles.post}>
                <div className={styles.info}>
                    <div style={likeStyles2} className={styles.likes}><i className="far fa-thumbs-up"></i> {this.props.likes.length}</div>
                    <div className={styles.userContainer}>
                        <Link className={styles.link} to={`/profile/${this.props.postUser}`}>
                            <img className={styles.avatar} src={this.props.avatar} alt=""/>
                        </Link>
                        <Link className={styles.link} to={`/profile/${this.props.postUser}`}>
                            <span className={styles.author}>{this.props.author}</span>
                        </Link>
                    </div>
                    <span className={styles.date}>{this.props.date}</span>
                </div>
                {this.props.cut && <p className={styles.postContent}>
                    {this.props.text.length > 350 ? this.props.text.substring(0,300) + '...' : this.props.text }
                </p>}
                
                {!this.props.cut && <p className={styles.postContent}>{this.props.text}</p>}
                <div className={styles.postButtons}>
                    <button 
                        style={likeStyles}
                        onClick={this.like} 
                        className={`${styles.button} 
                        ${styles.like}`}>
                            <i className="far fa-thumbs-up"></i>
                            Like it
                    </button>
                    {!this.props.singlePost &&
                    <Link to={`/post/${this.props.id}`}>
                        <button className={`${styles.button} ${styles.comments}`}><i className="far fa-comments"></i>Comments</button>
                    </Link>}
                </div>
            </div>
        )
    }
}

export default Post;