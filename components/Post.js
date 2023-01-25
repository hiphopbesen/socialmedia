import pb from 'src/lib/pocketbase.js'
import Interactions from './Interactions'
import Image from 'next/image'

export default function Post({ post }) {
    //convert published to german date
    const date = new Date(post.created)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const published = date.toLocaleDateString('de-DE', options)
    const preview = post.text.substring(0, 100) + '...'
    const author = post.expand.user

    //get fileformat from post.image
    const fileformat = post.image.split('.').pop()
    //check if fileformat is image
    const isImage = fileformat === 'jpg' || fileformat === 'png' || fileformat === 'gif' || fileformat === 'jpeg'
    //check if fileformat is video
    const isVideo = fileformat === 'mp4' || fileformat === 'webm' || fileformat === 'ogg' || fileformat === 'MOV'

    
    return (
        <article>
            <a  href={'/post/'+ post.id}>
            <div className='imagecontainer'>
                {isImage && 
                <Image 
                    src={pb.baseUrl+"/api/files/"+post.collectionId +"/"+ post.id +"/" + post.image} alt='postimage'
                    fill
                    objectFit='contain'
                    placeholder='blur'
                    blurDataURL='/icons/pepebongo.gif'
                    sizes='(max-width: 1200px) 100vw, 100vw'
                />
                }
                {isVideo &&
                    <video controls>
                        <source src={pb.baseUrl+"/api/files/"+post.collectionId +"/"+ post.id +"/" + post.image} type="video/mp4" />
                    </video>
                }
            </div>
           
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