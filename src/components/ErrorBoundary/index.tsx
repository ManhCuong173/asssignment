import Box from "components/Box/Box"
import React from "react"

type States = {
    error: Error
}

/**
 * This component using Legacy Class component to utilizie getDerivedStateFromError to catch error and add fallback methods 
 */

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, States> {
    constructor(props: React.PropsWithChildren) {
        super(props)
        this.state = {error: null}
    }

    static getDerivedStateFromError(error: Error): States {
        return {error}
    }

    render(): React.ReactNode {
        const {error} = this.state

        if(error) 
            return <Box>Something went wrong</Box>
        return this.props.children
    }
}