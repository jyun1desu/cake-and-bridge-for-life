import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { navState } from 'store/user';
import { useRecoilState } from 'recoil';

const Toggler = styled.button`
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        width: 17vw;
        height: 17vw;
        padding: 0;
        border-radius: 50%;
        background-color: ${props => props.color};
`

const SideNav = styled.div`
    display: flex;
    position: absolute;
    left: 100%;
    bottom: 7vw;
    width: 50vw;
    height: ${props => props.height};
    transition: .5s all ease-in-out;

    &.isOpen {
        transform: translateX(-100%);
    }

    &.hide {
        transform: translateX(50%);
    }

    .content_box {
        background-color: white;
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 8px;
        margin-top: -15px;
        border-bottom-left-radius: 6px;
        border-top-left-radius: 6px;
        overflow-y: scroll;

        .title {
            text-align: center;
            font-size: 14px;
            letter-spacing: 1px;
            padding-bottom: 5px;
            margin-bottom: 5px;
            border-bottom: 1px solid ${props => props.color};
        }
    }
`

const SideInfo = ({title, type, renderIcon, content, className, color, height}) => {
    const [nowNav, setNowNav] = useRecoilState(navState);

    const handleToggle = () => {
        if(type === nowNav){
            setNowNav(null);
        } else {
            setNowNav(type);
        }
    }

    return (
        <SideNav 
            height={height}
            color={color}
            className={classnames(
                "side_nav", 
                className,
                {"isOpen": type===nowNav,
                "hide": nowNav && type!==nowNav})}>
            <Toggler 
                onClick={handleToggle}
                color={color}
                className="toggler">
                {React.cloneElement(renderIcon, {isOpen: type===nowNav})}
            </Toggler>
            <div className="content_box">
                <p className="title">{title}</p>
                { content }
            </div>
        </SideNav>
    )
}

export default SideInfo