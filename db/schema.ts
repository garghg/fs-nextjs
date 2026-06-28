import { relations } from 'drizzle-orm'
import { pgTable, serial, text, integer, boolean } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull().default(''),
  token: text('token').default(''),
})

export const blogs = pgTable('blogs', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  url: text('url').notNull(),
  likes: integer('likes').default(0).notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
})

export const readingList = pgTable('reading_list', {
  id: serial('id').primaryKey(),
  userId: integer('saved_user_id').references(() => users.id),
  blogId: integer('saved_blog_id').references(() => blogs.id),
  read: boolean('read').default(false).notNull()
})

export const userRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
}))

export const blogRelations = relations(blogs, ({ one }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
}))

export const readingListRelations = relations(readingList, ({ one }) => ({
  user: one(users, {
    fields: [readingList.userId],
    references: [users.id],
  }),
  blog: one(blogs, {
    fields: [readingList.blogId],
    references: [blogs.id],
  }),
}))