import { Resend } from "resend"
import { config } from "../config.js"

const resend = new Resend(config.RESEND_API_KEY)

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string[]
  subject: string
  html: string
}) {
  const { data, error } = await resend.emails.send({
    from: "hello@nemma.space",
    to,
    subject,
    html,
  })

  if (error) {
    return console.error({ error })
  }

  console.log({ data })
}
