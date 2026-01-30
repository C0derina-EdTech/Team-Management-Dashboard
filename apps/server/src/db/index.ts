import type { SQLWrapper } from "drizzle-orm"
import { and, desc, eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/postgres-js"
import { reset, seed } from "drizzle-seed"
import { NotFoundError } from "elysia"
import postgres from "postgres"
import { config } from "../config.js"
import { PAGE_SIZE } from "./constants.js"
import * as schema from "./schema.js"

type TableName = keyof typeof schema

const queryClient = postgres(config.DATABASE_URL)

export const db = drizzle({
  client: queryClient,
  casing: "snake_case",
  schema,
})

export async function clearDb() {
  await reset(db, schema)
}
export async function seedDb() {
  await seed(db, schema, {
    count: 100,
  })
}
export async function updateUserRole(userId: string, role: string = "admin") {
  return db.update(schema.user)
    .set({ role })
    .where(eq(schema.user.id, userId))
    .returning()
}

function getPaginatedMeta(page: number, pageSize: number, total: number) {
  return {
    page,
    total,
    prev: page > 1 ? page - 1 : 1,
    next: total === pageSize ? page + 1 : page,
    pageSize,
  }
}
export async function insertOne<T extends TableName>(
  table: T,
  body: any,
) {
  try {
    const tableRef = schema[table] as unknown as SQLWrapper
    const res = await db.insert(tableRef as any).values(body).returning()
    // console.log({ body })
    return {
      message: `Successfully created a ${table}`,
      data: res[0],
    }
  }
  catch (error) {
    console.log({ error })
    throw new Error(`Failed to insert ${table}`, { cause: error })
  }
}
export async function updateOne<T extends TableName>(
  table: T,
  id: string,
  body: any,
) {
  try {
    const tableRef = schema[table] as unknown as SQLWrapper
    const res = await db
      .update(tableRef as any)
      .set(body)
      .where(eq((tableRef as any).id, id))
      .returning()
    return {
      message: `Successfully updated a ${table}`,
      data: res[0],
    }
  }
  catch (error) {
    console.log({ error })
    throw new Error(`Failed to update ${table}`, { cause: error })
  }
}

export async function getOneByID<T extends TableName>(
  table: T,
  id: string,
  // opts?: { includeRelations?: boolean },
) {
  try {
    const tableRef = schema[table] as any

    let row: any = null
    const res = await db
      .select()
      .from(tableRef)
      .where(eq(tableRef.id, id))
      .limit(1)

    row = res[0]

    if (!row)
      throw new NotFoundError(`Failed to find ${table} with id ${id}`)

    return {
      message: `Successfully retrieved ${table}`,
      data: row,
    }
  }
  catch (error) {
    if (error instanceof NotFoundError)
      throw error
    throw new Error(`Failed to find ${table}`, { cause: error })
  }
}

export async function deleteOne<T extends TableName>(
  table: T,
  id: string,
) {
  try {
    const tableRef = schema[table] as unknown as SQLWrapper
    const res = await db
      .delete(tableRef as any)
      .where(eq((tableRef as any).id, id))
      .returning()
    return {
      message: `Successfully deleted a ${table}`,
      data: res[0],
    }
  }
  catch (error) {
    console.log({ error })
    throw new Error(`Failed to delete ${table}`, { cause: error })
  }
}
export async function getPosts(userId: string, page = 1, pageSize = PAGE_SIZE) {
  const data = await db.query.posts.findMany({
    limit: pageSize,
    offset: (page - 1) * pageSize,
    with: {
      // post_media: true,
      // user: true,
    },
    orderBy: [desc(schema.posts.createdAt)],
    where: and(eq(schema.posts.user_id, userId), eq(schema.posts.status, "published")),
  })
  const total = await db.$count(
    schema.posts,
    and(eq(schema.posts.user_id, userId), eq(schema.posts.status, "published")),
  )

  return {
    message: `Successfully retrieved all posts`,
    data,
    meta: getPaginatedMeta(page, pageSize, total),
  }
}
export async function getSinglePost(postId: string) {
  const post = await db.query.posts.findFirst({
    where: eq(schema.posts.id, postId),
    with: {
      // post_media: true,
    },
    orderBy: [desc(schema.posts.createdAt)],
  })
  return {
    message: `Successfully retrieved a post`,
    data: post,
  }
}
export async function getUserPosts(userId: string) {
  const posts = await db.query.posts.findMany({
    where: eq(schema.posts.user_id, userId),
    with: {
      // post_media: true,
    },
    orderBy: [desc(schema.posts.createdAt)],
  })
  return {
    message: `Successfully retrieved all users post`,
    data: posts,
  }
}
export async function getUserMedia(userId: string) {
  const data = await db.query.files.findMany({
    where: eq(schema.files.uploaded_by, userId),
    orderBy: [desc(schema.files.createdAt)],
  })
  return {
    message: `Successfully retrieved all users media`,
    data,
  }
}
export async function getCommunityPosts(communityId: string, page = 1, pageSize = PAGE_SIZE) {
  const copilots = await db.query.posts.findMany({
    limit: pageSize,
    offset: (page - 1) * pageSize,
    with: {
      // post_media: true,
    },
    orderBy: [desc(schema.posts.createdAt)],
  })
  const total = await db.$count(
    schema.posts,
    eq(schema.posts.user_id, communityId),
  )

  return {
    message: `Successfully retrieved all posts`,
    data: copilots,
    meta: getPaginatedMeta(page, pageSize, total),
  }
}
