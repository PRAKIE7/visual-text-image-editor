import React from 'react'
import dbService from '../Appwrite/Database'
import { Link } from 'react-router-dom'

function PostCard({$id, Title, Image}) {
  return (
    <div>
      <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={dbService.filePreview(Image)} alt={Title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{Title}</h2>
        </div>
      </Link>
    </div>
  )
}

export default PostCard
