import * as z from "zod"

  export interface ActionResponse<T = any> {
      success: boolean
      message: string
      errors?: {
          [K in keyof T]?: string[]
      }
      inputs?: T
  }
  export const eventformSchema = z.object({
"eventName": z.string({ error: 'This field is required' }),
"description": z.string({ error: 'This field is required' }).optional(),
"date": z.object({from: z.date({error: 'This field is required'}), to: z.date({error: 'This field is required'})}),
"event-type": z.string().min(1, 'Please select an item'),
"format": z.string().min(1, 'Please select an item'),
"organizer": z.array(z.object({
        id: z.string(),
        text: z.string(),
      }), { error: "Please enter at least one tag" }).min(1, "Please enter at least one tag").optional(),
"attendees": z.coerce.number({error: 'Please enter a valid number'})
});