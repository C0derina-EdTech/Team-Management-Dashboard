import { and, desc, eq, lte } from "drizzle-orm"
import { db, getPaginatedMeta, updateOne } from "../index.ts"
import * as schema from "../schema.ts"
import { PAGE_SIZE } from "../constants.ts"
import { gte } from "better-auth"


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
export async function getSingleEventStats(eventId: string) {
    const event = await db.query.events.findFirst({
        where: eq(schema.events.id, eventId),
        with: {
            tickets: true,
            // post_media: true,
        },
        orderBy: [desc(schema.events.startDate)],
    })
    // get issued tickets
    // get checked-in tickets
    // get total tickets

    const issuedTickets = await db?.query?.events.findFirst({
        where: eq(schema.events.id, eventId),
        with: {
            // post_media: true,
            tickets: {
                where: eq(schema.ticket.status, "ISSUED"),
            }
        },
        orderBy: [desc(schema.ticket.createdAt)],
    })
    const checkedInTickets = await db?.query?.events.findFirst({
        where: eq(schema.events.id, eventId),
        with: {
            // post_media: true,
            tickets: {
                where: eq(schema.ticket.status, "CHECKED_IN"),
            }
        },
        orderBy: [desc(schema.ticket.createdAt)],
    })


    return {
        message: `Successfully retrieved event stats`,
        data: {
            event,
            issuedTickets,
            checkedInTickets,
        },
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

export async function EventCheckin(ticketCode: string, eventId: string) {

    // Event is currently active
    // Ticket exists
    // Ticket belongs to this event
    // Ticket status == ISSUED
    try {
        const event = await db.query.events.findFirst({
            where: and(
                eq(schema.events.id, eventId),
                eq(schema.events.status, "ongoing"),
                // lte(schema.events.startDate, new Date()), 
                // gte(schema.events.endDate, new Date())
            ),
        })
        const ticket = await db.query.ticket.findFirst({
            where: and(eq(schema.ticket.ticket_code, ticketCode), eq(schema.ticket.status, "ISSUED")),
        })
        if (!event || !ticket) {
            throw new Error("Event or ticket not found")
        }

        await db.update(schema.ticket).set({
            status: "CHECKED_IN",
            updatedAt: new Date(),
        }).where(eq(schema.ticket.id, ticket.id))

        return {
            message: "Ticket checked in successfully",
            data: ticket,
        }

    } catch (error) {
        throw error

    }


}