const blogs = [
  {
    id: 1,
    title: 'Understanding Sequelize Migrations',
    author: 'Bruce Wayne',
    url: 'https://example.com/sequelize-migrations',
    likes: 12,
  },
  {
    id: 2,
    title: 'Docker Compose in Practice',
    author: 'Jane Doe',
    url: 'https://example.com/docker-compose',
    likes: 7,
  },
  {
    id: 3,
    title: 'GraphQL vs REST',
    author: 'Bob Smith',
    url: 'https://example.com/graphql-vs-rest',
    likes: 23,
  },
  {
    id: 4,
    title: 'TypeScript Tips',
    author: 'Jane Doe',
    url: 'https://example.com/ts-tips',
    likes: 5,
  },
  {
    id: 5,
    title: 'CI/CD with GitHub Actions',
    author: 'Clark Kent',
    url: 'https://example.com/ci-cd',
    likes: 15,
  },
]

let nextId = 6

export const getBlogs = () => {
  return blogs.toSorted((a, b) => b.likes - a.likes)
}

export const addBlog = async (title: string, author: string, url: string) => {
  const newBlog = {
    id: nextId++,
    title,
    author,
    url,
    likes: 0,
  }
  blogs.push(newBlog)
}

export const getBlogbyId = async (id: number) => {
  const blog = blogs.find(b => b.id === id)
  return blog
}

export const addLike = async (id: number) => {
  const blog = blogs.find(b => b.id === id)
  if (blog) {
    blog.likes += 1
  }
}
