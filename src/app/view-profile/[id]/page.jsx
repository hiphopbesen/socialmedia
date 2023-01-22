import pb from './../../../lib/pocketbase.js'
import Post from 'components/Post.js';

async function getuser(id) {
    const records = await pb.collection("users").getOne(id, {
      });
    return records;
}
async function getposts(id) {
    // fetch a paginated records list
    const resultList = await pb.collection('posts').getList(1, 3, {
        filter: `user = "${id}"`,
        expand: 'user',
        sort: '-created'
    })
    return resultList.items;
}
export default async function Component({ params }) {
    const user = await getuser(params.id);
    const posts = await getposts(params.id);
    return (
        <>
            <article>
                <div className='grid' >
                    {user.avatar && <img src={pb.baseUrl+"/api/files/"+user.collectionId +"/"+ user.id +"/" + user.avatar} alt='useravatar' />}
                    <div>
                    <hgroup>
                    <h1>{user.name}</h1>
                    <h3>@{user.username}</h3>
                    </hgroup>
                    </div>
                </div>
            </article>
            <h2>recent posts</h2>
            <div className='grid'>
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
