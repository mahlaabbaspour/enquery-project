import Fade, { FadeProps } from '@mui/material/Fade'
import { forwardRef, ReactElement, Ref } from "react";


export const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Fade ref={ref} {...props} />
})
