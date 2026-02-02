import type { ElysiaApp } from "../../server.ts"
import Elysia, { t } from "elysia"
import { authGuard } from "../../auth/auth.ts"
import {
  deleteOne,
  getSingleTicket,
  getUserTickets,
  insertOne,
  updateOne,
} from "../../db/index.ts"
import { models } from "../../db/model.ts"

const { tickets: ticketInsert } = models.insert

export type NewTicket = typeof ticketInsert

export default (events: ElysiaApp) => events.model({
  Ticket: t.Object(ticketInsert as any),
})
  .guard({
    tags: ["Tickets"],
    detail: {
      description: "Require user to be logged in",
    },
  })
  .use(authGuard)
  .get("", ({ query: { page, pageSize }, user: { id: userId } }: { query: { page?: number, pageSize?: number }, user: { id: string } }) =>
    getUserTickets(userId, page, pageSize), {
    auth: true,
    query: t.Object({
      page: t.Optional(t.Number()),
      pageSize: t.Optional(t.Number()),
    }),
  })
  .get("/:id", ({ params: { id } }: { params: { id: string } }) => getSingleTicket(id), {
    params: t.Object({
      id: t.String(),
    }),
    auth: true,
  })
  .post("/new", ({
    user: { id: user_id },
    body,
  }: {
    body: NewTicket
    user: { id: string }
  }) => insertOne("ticket", {
    ...body,
    user_id,
  }), {
    body: t.Object(ticketInsert as any),
    auth: true,
  })
  .put("/:id", ({
    params: { id },
    body,
  }: {
    params: { id: string }
    body: { body: NewTicket }
  }) => updateOne("ticket", id, body), {
    body: t.Partial(t.Object(ticketInsert as any)),
    params: t.Object({
      id: t.String(),
    }),
    auth: true,
  })
  .delete("/:id", ({ params: { id } }: { params: { id: string } }) => {
    deleteOne("ticket", id)
  }, {
    auth: true,
  })


