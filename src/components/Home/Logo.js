import React from 'react';
import LogoSVG from 'assets/logo.svg';
import name from 'assets/name.jpg';
import styled from 'styled-components';

const Logo = ({className}) => {
    return (
        <div className={className}>
        <img className="image" src={LogoSVG} alt="logo" />
        <img className="name" src={name} alt="name" />
    </div>
    );
}

const styledLogo = styled(Logo)`
    margin: 30px auto 0;
    border-radius: 100%;
    background-color: #fff;
    text-align: center;
    width: 70vw;
    height: 70vw;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;

    .image {
        width: 60%;
        margin-bottom: 20px;
    }

    .name {
        width: 70%;
    }
`

export default styledLogo;