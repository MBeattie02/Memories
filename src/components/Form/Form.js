import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import useStyles from './styles';
import {createPost, updatePost} from '../../actions/posts';
            
const Form = ({currentId, setCurrentId}) =>{
    const [postData, setPostData] = useState({creator: '', title:'', message:'', tags:'', selectedFile: '',});
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) :null));
    const classes = useStyles();
    const dispatch = useDispatch();


    useEffect (() => {
        if(post) setPostData(post);
    }, [post]);

    const clear = () => {
        setCurrentId(0);
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (currentId === 0) {
          dispatch(createPost(postData));
          clear();
        } else {
          dispatch(updatePost(currentId, postData));
          clear();
        }
      };

     
    return(
        <Paper className = {classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                <Typography varient ="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory' }</Typography>
                <TextField name="creator" varient="outlined" label="creator" fullWidth value={postData.creator} onChange={(e) => setPostData ({...postData, creator: e.target.value})}/>
                <TextField name="title" varient="outlined" label="title" fullWidth value={postData.title} onChange={(e) => setPostData ({...postData, title: e.target.value})}/>
                <TextField name="message" varient="outlined" label="message" fullWidth value={postData.message} onChange={(e) => setPostData ({...postData, message: e.target.value})}/>
                <TextField name="tags" varient="outlined" label="tags(coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData ({...postData, tags: e.target.value.split(',')})}/>
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={(base64) => setPostData({...postData, selectedFile: base64})} /></div>
                
                <Button className={classes.buttonSubmit} varient="contained" color="primary" size="large" type="submit" fullWidth>SUBMIT</Button>
                <Button varient="contained" color="secondary" size="small" onClick={clear} fullWidth>CLEAR</Button>
            </form>


        </Paper>
    );
}

export default Form;