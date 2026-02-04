/**
 * v0 by Vercel.
 * @see https://v0.app/t/jSixNdA7LFX
 * Documentation: https://v0.app/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { useEffect, useRef, useState } from "react"
import { Button } from "@coderina-ams/ui/components/button"
import jsQR from "jsqr";

// export default function Scanner() {
//     const videoRef = useRef<HTMLVideoElement>(null)
//     const [error, setError] = useState<string | null>(null)

//     useEffect(() => {
//         let stream: MediaStream | null = null

//         async function startCamera() {
//             try {
//                 stream = await navigator.mediaDevices.getUserMedia({
//                     video: {
//                         facingMode: "environment",
//                         width: 640,
//                         height: 480,
//                     },
//                     audio: false,
//                 })

//                 if (videoRef.current) {
//                     videoRef.current.srcObject = stream
//                 }
//             } catch (err) {
//                 console.error("Error accessing camera:", err)
//                 setError("Unable to access camera. Please ensure you have granted permission.")
//             }
//         }

//         startCamera()

//         return () => {
//             if (stream) {
//                 stream.getTracks().forEach(track => track.stop())
//             }
//         }
//     }, [])

//     return (
//         <div className="">
//             <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
//                 <div className="aspect-square relative overflow-hidden rounded-lg bg-black">
//                     {error ? (
//                         <div className="absolute inset-0 flex items-center justify-center text-white p-4 text-center">
//                             {error}
//                         </div>
//                     ) : (
//                         <>
//                             <video
//                                 ref={videoRef}
//                                 id="camera-feed"
//                                 className="w-full h-full object-cover"
//                                 autoPlay
//                                 playsInline
//                                 muted
//                             />
//                             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                                 <div className="w-64 h-64 border-4 border-primary rounded-lg" />
//                                 <Button variant="outline">Check In</Button>
//                                 <Button variant="outline">Cancel</Button>
//                             </div>
//                         </>
//                     )}
//                 </div>
//                 <div id="qr-result" className="mt-6 text-center text-gray-500 dark:text-gray-400 font-medium" />
//             </div>
//         </div>
//     )
// }


export const Camera = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [scannedCode, setScannedCode] = useState<string | null>(null);

    useEffect(() => {
        let animationFrameId: number;
        let stream: MediaStream | null = null;

        const scan = () => {
            if (videoRef.current && canvasRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
                const video = videoRef.current;
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");

                if (ctx) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height, {
                        inversionAttempts: "dontInvert",
                    });

                    if (code) {
                        setScannedCode(code.data);
                    }
                }
            }
            animationFrameId = requestAnimationFrame(scan);
        };

        // Run only in the browser
        if (typeof navigator !== "undefined" && navigator.mediaDevices) {
            navigator.mediaDevices
                .getUserMedia({ video: { facingMode: "environment" }, audio: false })
                .then((s) => {
                    stream = s;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream; // <-- attach stream correctly
                        videoRef.current.play().catch(() => { }); // optional, sometimes needed

                        // Start scanning if we have the library
                        // We'll need to import jsQR properly, but for now assuming global or imported
                        scan();
                    }
                })
                .catch((err) => {
                    // Start of fix for: "Camera access error: NotAllowedError: Permission denied"
                    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                        setError("Unable to access camera. Please check permissions.");
                    } else {
                        console.error("Camera access error:", err);
                        setError("Unable to access camera. Please check permissions.");
                    }
                });
        } else {
            setError("Camera API not supported in this browser.");
        }

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="flex flex-col items-center gap-4">
            {error && <p className="text-red-500 font-medium">{error}</p>}

            <div className="relative overflow-hidden rounded-lg border border-gray-300 bg-black">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full max-w-[500px]"
                />
                <canvas ref={canvasRef} className="hidden" /> {/* Hidden canvas for processing */}
            </div>

            {scannedCode && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm font-semibold text-green-800">Scanned Code:</p>
                    <p className="text-lg text-green-700 break-all">{scannedCode}</p>
                </div>
            )}
        </div>
    );
};
