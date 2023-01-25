"use client"
import pb from 'src/lib/pocketbase.js'
import { useState, useEffect } from 'react';
import Link from 'next/link';

import Post from 'components/Post';

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [erfolg, setErfolg] = useState(false);

    const handleSubmit = async (event) => {
      setIsLoading(true);
      event.preventDefault();
      // Get data from the form.
      const  formData = new FormData();
      const data = new FormData(event.target);
      const image = data.get("image");
      const email = data.get("email");
      formData.append('avatar', data.get("image"));
      formData.append("name", data.get("Name"));
      formData.append("username", data.get("username"));
      formData.append("email", email);
      formData.append("password", data.get("pwd"));
      formData.append("passwordConfirm", data.get("cpwd"));
      formData.append("emailVisibility", true);
      // upload and create new record
      const createdRecord = await pb.collection('users').create(formData,{expand: 'user'})
      .then((res) => {
        pb.collection('users').requestVerification(email);
        setIsLoading(false);
        setErfolg(res)
        console.log(res);
      }).catch((err) => {
        alert(err.message);
        setIsLoading(false);
      });
    }
    if (erfolg){
        return (
            <>
            <div>
                <h1>Profile created</h1>
                <p>Please confirm your email.</p>
            </div>
            </>
        )
    }

    return (
      <>
        <div>
          <h1>Create Profile</h1>
            <form onSubmit={handleSubmit}>
              <label>Profilepicture</label>
              <input type="file" name="image" />
              <label>Name</label>
              <input type="text" placeholder='Name' name="Name" required/>
              <label>Username (displayed public)</label>
              <input type="text" placeholder='Username' name="username" required/>
              <label>Email - (private)</label>
              <input type="text" placeholder='e-mail' name="email" required/>
              <label>Password</label>
              <input type="password" placeholder='password' name="pwd" required/>
              <label>confirm password</label>
              <input type="password" placeholder='password' name="cpwd" required/>
              {isLoading? <button aria-busy="true" type="submit">Create Profile</button>:
              <button type="submit">Create Profile</button>}
            </form>
        </div>
      </>
  )
}