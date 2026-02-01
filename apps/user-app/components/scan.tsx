/**
 * v0 by Vercel.
 * @see https://v0.app/t/jSixNdA7LFX
 * Documentation: https://v0.app/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@coderina-ams/ui/components/button"

export default function Scanner() {
    return (
        <div className="">
            <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="aspect-square relative overflow-hidden rounded-lg">
                    <video id="camera-feed" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-64 h-64 border-4 border-primary rounded-lg" />
                    </div>
                </div>
                <div id="qr-result" className="mt-6 text-center text-gray-500 dark:text-gray-400 font-medium" />
            </div>
        </div>
    )
}