import { useRouter } from "next/router"

ProductPage.Layout = "LWS"
export default function ProductPage(): JSX.Element {
    const router = useRouter()
    const { prodId } = router.query
    return (
        <>
            <div className="lws-container">
                <div className="lws-container-inner">
                    {prodId}
                </div>
            </div>
        </>
    )
}