"use client"
import pb from 'src/lib/pocketbase.js'
import { useState, useEffect } from 'react';
import Post from 'components/Post';

export default  function Home() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true)
    async function getposts() {
      const records = await pb.collection('posts').getFullList(5, {
        expand: 'user,likes,comments,comments.user',
        sort: '-created'
      });
      return records
    }
    getposts().then((res) => {
      setPosts(res)
      setLoading(false)
      console.log(res)
    })
  }, [])


  if (loading) {
    return (
      <div className='container' aria-busy>
        <img src='/icons/pepebongo.gif' />
      </div>
    )
  }

  return (
    <>
      <hgroup>
        <h1>Posts</h1>
        <h3><a href='/create-post'>+create</a></h3>
      </hgroup>
      <div className='container'>
      {
        posts?.map((post) => {
          return (
            <Post key={post.id} post={post} />
          )
        })
      }
      </div>
    </>
  )
}
