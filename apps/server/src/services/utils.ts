import { format } from "date-fns"

export enum ResendNotificationTemplatesSubject {
  VERIFICATION_OTP = "Your Email Verification OTP",
  VERIFICATION = "Verify your email address",
  SIGN_IN_OTP = "Your Sign-in OTP",
  RESET_OTP = "Your Password Reset OTP",
  INVITATION = "Your invitation to engage Lagos",
}

export function replaceLocalhostUrl(url: string, frontendUrl: string) {
  return url.replace(/^https?:\/\/[^/]+/, frontendUrl)
}

export const formatDate = (date: Date = new Date()) => format(date, "yyyy-MM-dd")
