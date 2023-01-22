import pb from 'src/lib/pocketbase.js'
import Interactions from './Interactions'

export default function Post({ post }) {
    //convert published to german date
    const date = new Date(post.created)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const published = date.toLocaleDateString('de-DE', options)
    const preview = post.text.substring(0, 100) + '...'
    const author = post.expand.user

    
    return (
        <article>
            <a  href={'/post/'+ post.id}>
            <img src={pb.baseUrl+"/api/files/"+post.collectionId +"/"+ post.id +"/" + post.image} alt='postimage' />
            <hgroup>
                <h2>{post.heading}</h2>
                <h3>{preview}</h3>
            </hgroup>
            </a>
            <hr />
            <small>Published {published}  💙{post.likes.length} / 💬 {post.comments.length}</small>
            <a href={'/view-profile/'+author.id}>
            <div className='auth'>
                <small><mark> by {author.name} </mark></small>
                {author.avatar && <img className='profilepreview' src={pb.baseUrl+"/api/files/"+author.collectionId +"/"+ author.id +"/" + author.avatar} alt='useravatar' />}
            </div>
            </a>
        </article>
    )
}