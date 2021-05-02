import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { useRecoilState, useRecoilValue } from 'recoil';
import { themeState } from 'store/theme';
import { trumpState } from 'store/game';
import { teamShouldWinState } from 'store/bind';
import { color } from 'style/theme';
import { suitColor, suitInPoker } from 'util/suit'
import InfoBox from './InfoBox';

const Board = styled.div`
    display: flex;
    justify-content: space-between;
    width: 60vw;
    margin-top: 40px;

    & > div {
        &:first-child {
            flex: 1 0 auto;
        }
        &:last-child {
            flex: 1.2 0 auto;
            margin-left: 15px;
        }
    }
`

const Point = styled.div`
        &.team1 {
            .team__name {
                transition: .5s all;
                background-color: ${({ theme }) => themeData[theme].team1color};
            }
        }

        &.team2 {
            &::before {
            content: "";
            display: block;
            width: 100%;
            border-top: 1px solid ${({ theme }) => themeData[theme].border};
            margin: 5px 0;
            }
            .team__name {
                transition: .5s all;
                background-color: ${({ theme }) => themeData[theme].team2color};
            }
        }

        .team__name {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 10px;
        border-radius: 100%;
        }

        .team__tricks {
        letter-spacing: 1px;
        .now_win {
            font-size: 14px;
            margin-right: 3px;
            transition: .5s all;
            color: ${({theme}) => themeData[theme].fc};
        }
        .should_win {
            font-size: 12px;
            color: #7e7e7e;
        }
    }
`

const Suit = styled.span`
    font-size: 20px;
    transition: .5s all;
    color: ${({suitColor, theme}) => themeData[theme].suit[suitColor]};
`

const themeData = {
    light: {
        border: color.$orange_color,
        fc: color.$default_font_color,
        suit: {
            red: color.$red_suit_color,
            black: color.$black_suit_color
        },
        team1color: color.$pink_color,
        team2color: color.$brown_color
    },
    dark: {
        border: color.$dark_dim_border_color,
        fc: color.$light_pink_color,
        suit: {
            red: color.$dark_red_suit_color,
            black: color.$light_pink_color,
        },
        team1color:color.$fluorescent_pink_color,
        team2color: color.$fluorescent_yellow_color
    },
}

const PointInfo = ({ team }) => {
    const [theme] = useRecoilState(themeState);
    const [teamShouldWin] = useRecoilState(teamShouldWinState);
    return (
        <Point theme={theme} className={classnames('team', team)}>
            <span className="team__name"></span>
            <span className="team__tricks">
                <span className="now_win">0</span>
                <span className="should_win">/{teamShouldWin[team]}</span>
            </span>
        </Point>
    )
}

const MainInfo = () => {
    const [theme] = useRecoilState(themeState);
    const trump = useRecoilValue(trumpState);
    return (
        <Board theme={theme} className="main_info">
            <InfoBox
                theme={theme}
                title="王牌"
                className="trump">
                <Suit theme={theme}
                    className="suit"
                    suitColor={suitColor(trump?.suit)}
                >{suitInPoker(trump?.suit)}&#xFE0E;</Suit>
            </InfoBox>
            <InfoBox theme={theme} title="戰況" className="team">
                <PointInfo team="team1" />
                <PointInfo team="team2" />
            </InfoBox>
        </Board>
    )
}

export default MainInfo;