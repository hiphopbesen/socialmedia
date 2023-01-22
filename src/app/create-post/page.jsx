"use client"
import pb from 'src/lib/pocketbase.js'
import { useState, useEffect } from 'react';
import Link from 'next/link';

import Post from 'components/Post';

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [erfolg, setErfolg] = useState(false);
    const isLoggedin = pb.authStore.isValid;
    let user = pb.authStore.baseModel? pb.authStore.baseModel : pb.authStore.model;

    const handleSubmit = async (event) => {
      setIsLoading(true);
      event.preventDefault();
      // Get data from the form.
      const  formData = new FormData();
      const data = new FormData(event.target);
      const image = data.get("image");
      const title = data.get("title");
      const content = data.get("content");
      const date = new Date();
      formData.append('image', image);
      formData.append("heading", title);
      formData.append("text", content);
      formData.append("published", date);
      formData.append("user", user.id);
      // upload and create new record
      
      const createdRecord = await pb.collection('posts').create(formData,{expand: 'user'})
      .then((res) => {
        setIsLoading(false);
        setErfolg(res)
        console.log(res);
      });
    }

    if (erfolg){
      return (
        <>
          <div >
            <h1>Success!</h1>
            <Post post={erfolg} />
            <Link role='button' href="/">
              Back to Posts
            </Link>
          </div>
        </>
      )
    }
    if (isLoggedin){
        return (
            <>
              <div>
                <h1>Create Post</h1>
                  <form onSubmit={handleSubmit}>
                    <input type="file" name="image" />
                    <input type="text" name="title" required/>
                    <textarea type="text" name="content" required/>
                    {isLoading? <button aria-busy="true" type="submit">Create Post</button>:
                    <button type="submit">Create Post</button>}
                  </form>
              </div>
            </>
        )
    }else{
      return(
        <>
          <div>
            <Link role='button' href="/login">
              Login
            </Link>
          </div>
        </>
      )
      
    }
}
