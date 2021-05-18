import React from "react";
import { animated } from "react-spring";
import styled from 'styled-components';


const ModalPage = ({children, className,onDeactive,style}) => {
    return (
        <animated.div
        style={style}
        onClick={onDeactive}
        className={className}>
            {children}
        </animated.div>
    )
}

const styledModalPage = styled(ModalPage)`
    background-color: rgba(0, 0, 0, 0.25);
	width: 100%;
	height: 100%;
    top: 0;
    left: 0;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
    z-index: 20;

    &.result_modal {
        background-color: rgba(0, 0, 0, 0.5);
    }

    & > div {
        min-width: 65vw;
    }
`

export default styledModalPage