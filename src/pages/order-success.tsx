import Meta from "@/components/Meta"
import Script from "next/script"

export default function OrderSuccess(): JSX.Element {
    return <>
        <Meta title="Order Success | Le REUSSI" />
        <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></Script>
        <div className="flex items-center flex-col text-center" style={{ minHeight: '55vh' }}>
            <div dangerouslySetInnerHTML={{ __html: `<lottie-player src="https://assets4.lottiefiles.com/packages/lf20_txpagpud.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay></lottie-player>`}}></div>
            <h1 className="text-2xl font-bold">Thank you for ordering from Le Reussi Cakes!</h1>
            <p>Your order is currently being processed.</p>
            <p>Please check your email inbox.</p>
        </div>
    </>
}