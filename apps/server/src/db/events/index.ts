import { and, desc, eq } from "drizzle-orm"
import { db, getPaginatedMeta } from "../index.ts"
import * as schema from "../schema.ts"
import { PAGE_SIZE } from "../constants.ts"


export async function getSingleEvent(eventId: string) {
    const post = await db.query.events.findFirst({
        where: eq(schema.events.id, eventId),
        with: {
            // post_media: true,
        },
        orderBy: [desc(schema.events.startDate)],
    })
    return {
        message: `Successfully retrieved a event`,
        data: post,
    }
}
export async function getUserEvents(userId: string, page = 1, pageSize = PAGE_SIZE) {
    const data = await db.query.events.findMany({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        with: {
            // post_media: true,
            // user: true,
            tickets: {
                where: eq(schema.ticket.user_id, userId),
            }
        },
        orderBy: [desc(schema.events.createdAt)],
        where: and(eq(schema.ticket.user_id, userId), eq(schema.events.status, "valid")),
    })
    const total = await db.$count(
        schema.events,
        and(eq(schema.ticket.user_id, userId)),
    )

    return {
        message: `Successfully retrieved all tickets`,
        data,
        meta: getPaginatedMeta(page, pageSize, total),
    }
}