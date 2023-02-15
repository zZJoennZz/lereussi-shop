import { useEffect } from "react"
import { useSetRecoilState } from "recoil"
import { authState } from "@/atoms"
// import { isAuth } from "@/utilities"
import { NextComponentType, NextPageContext } from "next/types"
import { NextRouter } from "next/router"

interface AuthenticationProps {
    Component: NextComponentType<NextPageContext, any, any>;
    pageProps: any;
    router: NextRouter;
}
export default function Authentication ({ router, Component, pageProps }: AuthenticationProps): JSX.Element {
    const setAuthenticationState = useSetRecoilState(authState)
    
    useEffect(() => {
        // const tokenIsValid: boolean = isAuth()
        const tokenIsValid: any = localStorage.getItem('token') || true
        setAuthenticationState(tokenIsValid)
    }, [setAuthenticationState])
    
    return <Component {...pageProps} />
}