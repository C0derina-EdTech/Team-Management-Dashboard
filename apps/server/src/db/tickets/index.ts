import { and, desc, eq } from "drizzle-orm"
import { PAGE_SIZE } from "../constants.ts"
import { db, getPaginatedMeta } from "../index.ts"
import * as schema from "../schema.ts"


export async function getUserTickets(userId: string, page = 1, pageSize = PAGE_SIZE) {
    const data = await db.query.ticket.findMany({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        with: {
            // post_media: true,
            // user: true,
        },
        orderBy: [desc(schema.ticket.createdAt)],
        where: and(eq(schema.ticket.user_id, userId), eq(schema.ticket.status, "valid")),
    })
    const total = await db.$count(
        schema.ticket,
        and(eq(schema.ticket.user_id, userId), eq(schema.ticket.status, "valid")),
    )

    return {
        message: `Successfully retrieved all ticket`,
        data,
        meta: getPaginatedMeta(page, pageSize, total),
    }
}

export async function getSingleTicket(ticketId: string) {
    const data = await db.query.ticket.findFirst({
        where: eq(schema.ticket.id, ticketId),
        with: {
            // post_media: true,
            // user: true,
        },
        orderBy: [desc(schema.ticket.createdAt)],
    })
    return {
        message: `Successfully retrieved a ticket`,
        data,
    }
}