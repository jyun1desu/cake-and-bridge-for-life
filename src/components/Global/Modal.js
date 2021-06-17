import React from "react";
import { useTransition, animated } from "react-spring";
import { useRecoilValue } from 'recoil';
import { color } from 'style/theme';
import { themeState } from 'store/theme';
import styled from 'styled-components';

const themeData = {
    light: { bg: '#f3e9e9' },
    dark: { bg: color.$dark_bg_color },
}

const StyledModalPage = styled(animated.div)`
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

    &.no-opacity {
        background-color: ${({ theme }) => themeData[theme].bg};
    }


    &.result_modal {
        background-color: rgba(0, 0, 0, 0.5);
    }

    & > div {
        min-width: 65vw;
    }
`

const ModalPage = ({ active, children, className, onDeactive }) => {
    const theme = useRecoilValue(themeState);

    const transitions = useTransition(active, {
        from: { opacity: 0, transform: "translateY(-15px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(-15px)" }
    });

    return (
        <>
            {transitions((props, item) => item && (
                <StyledModalPage
                    style={props}
                    onClick={onDeactive}
                    theme={theme}
                    className={className}
                >
                    {children}
                </StyledModalPage>))
            }
        </>
    )
}

export default ModalPage