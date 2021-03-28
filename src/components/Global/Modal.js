import React from "react";
import styled from 'styled-components';


const ModalPage = ({children, className}) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

const styledModalPage = styled(ModalPage)`
    background-color: rgba(0, 0, 0, 0.5);
	width: 100%;
	height: 100%;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
`

export default styledModalPage