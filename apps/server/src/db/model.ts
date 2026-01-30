import { table } from "./schema.js"
import { spreads } from "./utils.js"

export const models = {
  insert: spreads(
    {
      user: table.user,
      account: table.account,
      session: table.session,
      verification: table.verification,
      credentials: table.credentials,
      events: table.events,
      files: table.files,
    },
    "insert",
  ),

  select: spreads(
    {
      user: table.user,
      account: table.account,
      session: table.session,
      verification: table.verification,
      credentials: table.credentials,
      files: table.files,
    },
    "select",
  ),
} as const
