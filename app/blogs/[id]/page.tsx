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
        <div className="mx-auto max-w-2xl p-6">
            <h2 className="mb-2 text-2xl font-bold">{blog.title}</h2>
            <h3 className="mb-1 text-lg text-gray-600">{blog.author}</h3>
            <a href={blog.url} className="mb-4 inline-block text-blue-600 hover:underline">{blog.url}</a>
            <div className="flex items-center gap-3">
                <p className="text-gray-700">likes: {blog.likes}</p>
                <form action={likeBlog}>
                    <input type="hidden" name="id" value={id} />
                    <button type="submit" className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
                        Like
                    </button>
                </form>
            </div>
        </div>
    )
}

export default BlogPage