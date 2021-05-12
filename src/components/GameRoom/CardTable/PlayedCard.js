import React, { useEffect } from 'react';
import db from "database";
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import classnames from 'classnames';
import { userRoomState, userNameState } from 'store/user';
import { teamScoresState } from 'store/score';
import { thisRoundCardsState, isThisRoundEndState, trumpState, thisRoundSuitState } from 'store/game';
import { relationWithUser, OrderedStartFromTeamOne } from 'store/players';
import { getBiggestCard } from 'util/game';
import sleep from 'util/sleep';
import Card from 'components/GameRoom/Card';

const CardGroup = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    .played_card {
        position: absolute;
        &.user {
        left: 50%;
        bottom: 25px;
        transform: translateX(-50%);
        }
        &.cross {
            left: 50%;
            top: 25px;
            transform: translateX(-50%);
        }
        &.left {
            left: 25px;
            top: 50%;
            transform-origin: left top;
            transform: rotate(90deg) translate(-50%, -100%);
        }
        &.right {
            right: 25px;
            top: 50%;
            transform-origin: right top;
            transform: rotate(90deg) translateX(50%);
        }
    }
`

const PlayedCard = () => {
    const roomName = useRecoilValue(userRoomState);
    const user = useRecoilValue(userNameState);
    const { teammate, nextPlayer, previousPlayer } = useRecoilValue(relationWithUser);
    const teamArray = useRecoilValue(OrderedStartFromTeamOne);
    const trump = useRecoilValue(trumpState);
    const currentSuit = useRecoilValue(thisRoundSuitState);
    const [thisRoundCards, updateThisRoundCards] = useRecoilState(thisRoundCardsState);
    const [teamScores, updateTeamScores] = useRecoilState(teamScoresState);
    const isThisRoundEnd = useRecoilValue(isThisRoundEndState);
    const roomRef = db.database().ref(`/${roomName}`);

    useEffect(()=>{
        const cardsRef = db.database().ref(`/${roomName}`).child('gameInfo').child('thisRoundCards');
        cardsRef.on("value", d => {
            const cards = d.val() || [];
            updateThisRoundCards(orderCards(cards));
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=>{
        if(isThisRoundEnd){
            handleRoundEnded();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isThisRoundEnd])

    const handleRoundEnded = async () => {
        const currentPlayerRef = roomRef.child('gameInfo').child('currentPlayer');
        await currentPlayerRef.set(null);
        await sleep(2000);
        const winner = getRoundWinner();
        updatePoints(winner);
        await currentPlayerRef.set(winner);
        initRoundData();
    }

    const initRoundData = () => {
        const thisRoundSuitRef = roomRef.child('gameInfo').child('thisRoundSuit');
        const thisRoundCardsRef = roomRef.child('gameInfo').child('thisRoundCards');
        thisRoundSuitRef.remove();
        thisRoundCardsRef.remove();
    }

    const getRoundWinner = () => {
        const winnerIndex = getBiggestCard(trump.suit, currentSuit, thisRoundCards);
        const playersOrder = [teammate, nextPlayer, previousPlayer, user];
        return playersOrder[winnerIndex];
    };

    const updatePoints = winner => {
        const winnerTeam = teamArray
            .map((player, i) => ({ player, team: `team${i % 2 + 1}` }))
            .find(p => p.player === winner).team;

        updateTeamScores({
            ...teamScores,
            [winnerTeam]: teamScores[winnerTeam] + 1
        })
    };

    const orderCards = (cards) => {
        if(!cards.length) return [];
        const orderedPlayers = [teammate, nextPlayer, previousPlayer, user];
        const result = orderedPlayers.map(playerName => {
            const card = cards.find(card => card.player === playerName);
            return card?.card;
        })
        return result;
    }

    return (
        <CardGroup className="played_cards_group">
            {thisRoundCards.map((card,index) => {
                const order = ['cross', 'left', 'right', 'user'];
                return card && (
                <Card
                    key={order[index]}
                    className={classnames("played_card",order[index])}
                    number={card.number}
                    suit={card.suit}
                    hasDetail
                />
            )})}
        </CardGroup>
    )
}

export default PlayedCard