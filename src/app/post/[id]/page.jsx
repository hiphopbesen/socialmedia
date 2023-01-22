import pb from './../../../lib/pocketbase.js'
import Interactions from 'components/Interactions.js';

async function getposts(id) {
    const records = await pb.collection("posts").getOne(id, {
        expand: "user",
      });
    return records;
}

export default async function Component({ params }) {
    const post = await getposts(params.id);
    const date = new Date(post.created)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const published = date.toLocaleDateString('de-DE', options)
    const preview = post.text.substring(0, 100) + '...'
    const author = post.expand.user
    return (
        <>
            <div>
                <img src={pb.baseUrl+"/api/files/"+post.collectionId +"/"+ post.id +"/" + post.image} alt='useravatar' />
                <h1>{post.heading}</h1>
                <p>{post.text}</p>
                <small>Published {published}</small>
                <a href={'/view-profile/'+author.id}>
                <div className='auth'>
                    <small><mark> by {author.name} </mark></small>
                    {author.avatar && <img className='profilepreview' src={pb.baseUrl+"/api/files/"+author.collectionId +"/"+ author.id +"/" + author.avatar} alt='useravatar' />}
                </div>
                </a>
                <Interactions post={post} />
            </div>
        </>
    )
}
