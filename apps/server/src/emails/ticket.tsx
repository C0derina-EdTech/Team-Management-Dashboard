import { Section, Tailwind, Text } from "@react-email/components"
import * as React from "react"

export default function OTPEmail({ otp }: { otp: number }) {
  return (
    <Tailwind>
      <Section className="flex justify-center items-center w-full min-h-screen font-sans">
        <Section className="flex flex-col items-center w-76 rounded-2xl px-6 py-1 bg-gray-50">
          <Text className="text-xs font-medium text-violet-500">
            Your ticket is attached.
          </Text>
          <Text className="text-gray-500 my-0">
            Thank you for  joining  us
          </Text>
        </Section>
      </Section>
    </Tailwind>
  )
}

OTPEmail.PreviewProps = {
  otp: 123456,
}
