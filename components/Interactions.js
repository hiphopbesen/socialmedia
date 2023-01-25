"use client"
import pb from 'src/lib/pocketbase.js'
import { useState, useEffect } from 'react'


export default function Interactions({ post }) {
    const [likes, setLikes] = useState(post.likes)
    const [comments, setComments] = useState(post.expand.comments)
    const [sendComment, setSendComment] = useState(false)
    const [performedaction , setPerformedaction] = useState(false)

    const isLoggedin = pb.authStore.isValid
    const verified = pb.authStore.model.verified;
    const liked = isLoggedin? likes.includes(pb.authStore.model.id): false

    function like() {
        if(!isLoggedin){
            setPerformedaction(true)
            return
        }
        //wenn geliked, dann unlike
        if(likes.includes(pb.authStore.model.id)){
            const newLikes = likes.filter(id => id !== pb.authStore.model.id)
            setLikes(newLikes)
            pb.collection('posts').update(post.id, { likes: newLikes })
            return
        }
        //wenn nicht geliked, dann like
        const newLikes = [...likes, pb.authStore.model.id]
        setLikes(newLikes)
        pb.collection('posts').update(post.id, { likes: newLikes })
    }

    async function comment() {
        if(!isLoggedin){
            setPerformedaction(true)
            return
        }
        setSendComment(true)
        //new entry in comments
        const newComment = {
            comment: document.getElementById('commentinput').value,
            user: pb.authStore.model.id,
            post: post.id
        }
        async function send(data) {
            const record = await pb.collection('comments').create(data ,{
                expand: 'user',
            })
            return record
        }
        send(newComment)
        .then((record) => {
            //add comment to post
            let temparr = [] //temp array to store all comment ids 
            if(comments){
                comments.map((comment) => {
                    temparr.push(comment.id)
                })
                pb.collection('posts').update(post.id, { comments: [...temparr, record.id] } ,{
                    expand: 'user',
                })
                setComments([...comments, record])
            }else{
                pb.collection('posts').update(post.id, { comments: [record.id] } ,{
                    expand: 'user',
                })
                setComments([record])
            }
           
            //local update
            document.getElementById('commentinput').value = ''
            setSendComment(false)
        }).catch((error) => {
            console.log('error', error)
        })
    }
    function deleteComment(id){
        pb.collection('comments').delete(id);
        let tempComments = comments
        let final =[]
        tempComments.map((comment, index) => {
            if(comment.id !== id){
                final.push(comment)
            }
        })
        setComments(final)
    }

    function cancel(){
        setPerformedaction(false)
    }

    return (
        <div className='interactions'>
            <dialog open={performedaction}>
                <article>
                    <h3>Log in to Interact!</h3>
                    <p>
                    To interact with this post, you need to be logged in.
                    </p>
                    <footer>
                        <a href="#cancel" role="button" onClick={()=>cancel()} className="secondary">Cancel</a>
                        <a href="/login" role="button">Log in</a>
                    </footer>
                </article>
            </dialog>
            {
                comments?.map((comment) => {
                let user = comment.expand.user
                return (
                    <article className='small' key={comment.id}>
                    <div className='auth'>
                        {user.avatar && <img className='profilepreview' src={pb.baseUrl+"/api/files/"+user.collectionId +"/"+ user.id +"/" + user.avatar} alt='useravatar' />}
                        <p>{user.name}: </p>
                        <p >{comment.comment}</p>
                    </div>
                    {isLoggedin && user.id === pb.authStore.model.id && <a onClick={() =>deleteComment(comment.id)}  >🗑️</a>}
                    </article>
                )
                })
            }
            <hr />
            <textarea placeholder='Comment' id='commentinput' />
            <div className='grid'>
                {sendComment ? <p aria-busy role="button">🛫</p>
                :
                <p onClick={() =>comment()} role="button" className="contrast">🛫comment</p>
                }
            <p role='button' onClick={() =>like()}>{likes.length}  {liked && <img className='like' alt='pepeyes' src='/icons/pepe_yes.png'></img> }  Like!</p>
            </div>
        </div>
    )
}