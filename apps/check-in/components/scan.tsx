/**
 * v0 by Vercel.
 * @see https://v0.app/t/jSixNdA7LFX
 * Documentation: https://v0.app/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { useEffect, useRef, useState } from "react"
import { Button } from "@coderina-ams/ui/components/button"

export default function Scanner() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let stream: MediaStream | null = null

        async function startCamera() {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: "environment",
                        width: 640,
                        height: 480,
                    },
                    audio: false,
                })

                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                }
            } catch (err) {
                console.error("Error accessing camera:", err)
                setError("Unable to access camera. Please ensure you have granted permission.")
            }
        }

        startCamera()

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop())
            }
        }
    }, [])

    return (
        <div className="">
            <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="aspect-square relative overflow-hidden rounded-lg bg-black">
                    {error ? (
                        <div className="absolute inset-0 flex items-center justify-center text-white p-4 text-center">
                            {error}
                        </div>
                    ) : (
                        <>
                            <video
                                ref={videoRef}
                                id="camera-feed"
                                className="w-full h-full object-cover"
                                autoPlay
                                playsInline
                                muted
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-64 h-64 border-4 border-primary rounded-lg" />
                                <Button variant="outline">Check In</Button>
                                <Button variant="outline">Cancel</Button>
                            </div>
                        </>
                    )}
                </div>
                <div id="qr-result" className="mt-6 text-center text-gray-500 dark:text-gray-400 font-medium" />
            </div>
        </div>
    )
}

// "use client"; // Required in Next.js 13+ App Router for browser APIs

// import { useEffect, useRef, useState } from "react";


export const Camera = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Run only in the browser
        if (typeof navigator !== "undefined" && navigator.mediaDevices) {
            navigator.mediaDevices
                .getUserMedia({ video: { facingMode: "environment" }, audio: false })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream; // <-- attach stream correctly
                        videoRef.current.play(); // optional, sometimes needed
                    }
                })
                .catch((err) => {
                    console.error("Camera access error:", err);
                    setError("Unable to access camera. Please check permissions.");
                });
        } else {
            setError("Camera API not supported in this browser.");
        }
    }, []);

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ width: "100%", maxWidth: "500px", border: "1px solid #ccc" }}
            />
        </div>
    );
};
