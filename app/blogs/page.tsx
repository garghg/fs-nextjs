import { getBlogs } from "../services/blogs"

const Blogs = () => {
    const blogs = getBlogs()
    return (
        <div>
            <h2>Blogs</h2>
            <ul>
            {blogs.map(b => (
                <li key={b.id}>{b.title}</li>
            ))} 
            </ul>
        </div>
    )
}

export default Blogs