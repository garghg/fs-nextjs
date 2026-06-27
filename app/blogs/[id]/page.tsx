import { likeBlog } from "@/app/actions/blogs"
import { getBlogById } from "../../services/blogs"
import { notFound } from "next/navigation"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const blog = await getBlogById(Number(id))

    if (!blog) {
        notFound()
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <h3>{blog.author}</h3>
            <p>{blog.url}</p>
            <p>likes: {blog.likes}</p>
            <form action={likeBlog}>
                <input type="hidden" name="id" value={id} />
                <button type="submit">Like</button>
            </form>
        </div>
    )
}

export default BlogPage