import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../features/posts/postActions'; // Adjust the import path as necessary

const PostsPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts); // Assuming your posts state is structured like this

    useEffect(() => {
        // Fetch posts when the component mounts
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div>
            <h2>Posts</h2>
            {posts.map(post => (
                <div key={post.id} style={{ marginBottom: '20px' }}>
                    <h4>{post.title}</h4>
                    <p><i>Creator: {post.creator}</i>, <i>Timestamp: {post.timestamp}</i></p>
                    <p>{post.text}</p>
                </div>
            ))}
        </div>
    );
};

export default PostsPage;
