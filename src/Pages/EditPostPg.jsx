import React, { useState, useEffect } from 'react'
import { Container, PostForm} from '../Components/Imports'
import dbService from '../Appwrite/Database'
import { useNavigate, useParams } from 'react-router-dom';

function EditPostPg() {
    const [post, setPost]= useState([]);
    const {slug}= useParams()
    const navigate= useNavigate()
    useEffect(()=>{
        if(slug){
            dbService.getPost(slug).then((post)=>{
                if(post) setPost(post);
            })
        } else{
            navigate('/');
        }
    }, [slug, navigate])
  return post ? (
    <div>
      <Container>
        <PostForm post={post}/>
      </Container>
    </div>
  ) : null
}

export default EditPostPg
