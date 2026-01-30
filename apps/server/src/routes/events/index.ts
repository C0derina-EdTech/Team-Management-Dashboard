import type { ElysiaApp } from "../../server.ts"
import Elysia, { t } from "elysia"
import { authGuard } from "../../auth/auth.ts"
import {
  deleteOne,
  getPosts,
  getSinglePost,
  getUserPosts,
  insertOne,
  updateOne,
} from "../../db/index.ts"
import { models } from "../../db/model.ts"

const { events: eventInsert } = models.insert

export type NewEvent = typeof eventInsert

export default (events: ElysiaApp) => events.model({
  Event: t.Object(eventInsert as any),
})
  .guard({
    tags: ["Events"],
    detail: {
      description: "Require user to be logged in",
    },
  })
  .use(authGuard)
  .get("", ({ query: { page, pageSize }, user: { id: userId } }: { query: { page?: number, pageSize?: number }, user: { id: string } }) =>
    getPosts(userId, page, pageSize), {
    auth: true,
    query: t.Object({
      page: t.Optional(t.Number()),
      pageSize: t.Optional(t.Number()),
    }),
  })
  .get("/:id", ({ params: { id } }: { params: { id: string } }) => getSinglePost(id), {
    params: t.Object({
      id: t.String(),
    }),
    auth: true,
  })
  .get("/user", ({ user: { id: userId } }: { user: { id: string } }) => getUserPosts(userId), {
    auth: true,
  })
  .post("/new", ({
    user: { id: user_id },
    body,
  }: {
    body: NewEvent
    user: { id: string }
  }) => insertOne("events", {
    ...body,
    user_id,
    status: "published",
  }), {
    body: t.Object(eventInsert as any),
    auth: true,
  })
  .put("/:id", ({
    params: { id },
    body,
  }: {
    params: { id: string }
    body: { body: NewEvent }
  }) => updateOne("events", id, body), {
    body: t.Partial(t.Object(eventInsert as any)),
    params: t.Object({
      id: t.String(),
    }),
    auth: true,
  })
  .delete("/:id", ({ params: { id } }: { params: { id: string } }) => {
    deleteOne("events", id)
  }, {
    auth: true,
  })


