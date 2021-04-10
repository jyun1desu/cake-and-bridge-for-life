import React from "react";
import { animated } from "react-spring";
import styled from 'styled-components';


const ModalPage = ({children, className,onDeactive,style, littleMask = false}) => {
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
    background-color: ${props => (props.littleMask ? 'rgba(0, 0, 0, 0.1)': 'rgba(0, 0, 0, 0.35)')};
	width: 100%;
	height: 100%;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
    z-index: 20;
`

export default styledModalPage