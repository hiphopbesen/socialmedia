"use client"
import pb from 'src/lib/pocketbase.js'
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [dummy, setDummy] = useState(0);
    const isLoggedin = pb.authStore.isValid;
    let user = pb.authStore.baseModel? pb.authStore.baseModel : pb.authStore.model;


    const handleSubmit = async (event) => {
      setIsLoading(true);
      event.preventDefault();
      // Get data from the form.
      const data = new FormData(event.target);
      const username = data.get("username");
      const password = data.get("password");
      const authData = await pb
        .collection("users")
        .authWithPassword(username, password)
        .then((res) => {
          setIsLoading(false);
        }).catch((err) => {
          alert(err.message);
          setIsLoading(false);
        });
    };

    const requestVerification = async (mail) => {
      setIsLoading(true);
      await pb.collection('users').requestVerification(mail).then((res) => {
        alert('Verification mail sent, make sure to check your spam folder. currently have to log out and back in to see changes.');
        setIsLoading(false);
      }).catch((err) => {
        alert(err.message);
        setIsLoading(false);
      });
    };
    

    function logout() {
      pb.authStore.clear();
      setDummy(dummy + 1);
    }
    if (isLoggedin){
      console.log(user)
        return (
            <>
            <div className='grid' >
                {user.avatar && <img src={pb.baseUrl+"/api/files/"+user.collectionId +"/"+ user.id +"/" + user.avatar} alt='useravatar' />}
                <div>
                <hgroup>
                  <h1>{user.name}</h1>
                  <h3>@{user.username} {user.verified? <img className='icon' src='/icons/verified.png'></img>: <button onClick={()=> requestVerification(user.email)}>verifizieren</button>}</h3>
                </hgroup>
                <p>{user.email}</p>
                <button onClick={() => logout()}>Logout</button>
                </div>
            </div>
            </>
        )
    }
  return (
    <>
        <form className='loginform' onSubmit={handleSubmit}>
            <input type="text" name="username" />
            <input type="password" name="password" />
            <div className='grid'>
            {isLoading? <button aria-busy="true" type="submit">Login</button>:
            <button type="submit">Login</button>}
              <Link role='button' className='secondary' href="/register">Register</Link>
            </div>
        </form>
    </>
  )
}
