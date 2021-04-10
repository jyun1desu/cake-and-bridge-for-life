import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { color } from 'style/theme';
import { suitColor, suitInPoker } from 'util/suit'
import InfoBox from './InfoBox';

const Board = styled.div`
    display: flex;
    justify-content: space-between;
    width: 60vw;
    margin-top: 40px;

    & > div {
        flex: 2 1 50%;
        & + div {
            flex: 1 0 auto;
            margin-left: 15px;
        }
    }
`

const Point = styled.div`
        &.team1 {
            .team__name {
                background-color: ${color.$pink_color};
            }
        }

        &.team2 {
            &::before {
            content: "";
            display: block;
            width: 100%;
            border-top: 1px solid #f5ab57;
            margin: 5px 0;
            }
            .team__name {
                background-color: ${color.$brown_color};
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
        }
        .should_win {
            font-size: 12px;
            color: #7e7e7e;
        }
        }
`

const PointInfo = ({team}) => {
    return (
        <Point className={classnames('team',team)}>
                <span className="team__name"></span>
                <span className="team__tricks">
                    <span className="now_win">0</span>
                    <span className="should_win">/7</span>
                </span>
        </Point>
    )
}

const Suit = styled.span`
    font-size: 20px;
    color: ${props => (props.suitColor === 'red'
                    ? `${color.$red_suit_color}`
                    : `${color.$black_suit_color}`)};
`

const MainInfo = ({ suit = 'club'}) => (
    <Board className="main_info">
        <InfoBox title="王牌" className="trump">
            <Suit 
                className="suit"
                suitColor={suitColor(suit)}
            >{suitInPoker(suit)}&#xFE0E;</Suit>
        </InfoBox>
        <InfoBox title="戰況" className="">
            <PointInfo team="team1" />
            <PointInfo team="team2" />
        </InfoBox>
    </Board>
)

export default MainInfo;