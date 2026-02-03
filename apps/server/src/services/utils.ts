import { format } from "date-fns"
import QRCode from "qrcode";



export enum ResendNotificationTemplatesSubject {
  VERIFICATION_OTP = "Your Email Verification OTP",
  VERIFICATION = "Verify your email address",
  SIGN_IN_OTP = "Your Sign-in OTP",
  RESET_OTP = "Your Password Reset OTP",
  INVITATION = "Your invitation to join your team",
}

export function replaceLocalhostUrl(url: string, frontendUrl: string) {
  return url.replace(/^https?:\/\/[^/]+/, frontendUrl)
}

export const formatDate = (date: Date = new Date()) => format(date, "yyyy-MM-dd")


export const generateQRCode = async (payload: string) => {
  const qrSvg = await QRCode.toString(payload, {
    type: "svg",
    errorCorrectionLevel: "H"
  });
  return qrSvg
}


