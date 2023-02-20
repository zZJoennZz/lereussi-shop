import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { authState } from "@/atoms"
import { isAuth } from "@/utilities"
import { NextComponentType, NextPageContext } from "next/types"
import { NextRouter } from "next/router"

interface AuthenticationProps {
    Component: NextComponentType<NextPageContext, any, any>;
    pageProps: any;
    router: NextRouter;
}
export default function Authentication ({ router, Component, pageProps }: AuthenticationProps): JSX.Element {
    const [authenticationState, setAuthenticationState] = useRecoilState(authState)

    useEffect(() => {
        async function checkToken() {
            const tokenIsValid = await isAuth(localStorage.getItem('token') || '', localStorage.getItem('refresh') || '')
            if (!tokenIsValid) {
                setAuthenticationState(false)
            } else {
                setAuthenticationState(true)
            }
        }
        checkToken()
    }, [authenticationState, setAuthenticationState])
    
    return <Component {...pageProps} />
}