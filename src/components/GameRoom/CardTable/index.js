import React from 'react';
import styled from 'styled-components';

import Nameplate from './Nameplate';

const Table = styled.div`
    width: 60vw;
    height: 60vw;
    background-color: #f9f9f9;
    border-radius: 10px;
    position: relative;
`

const CardTable = () => {
    return (
        <Table className="card_table">
            <Nameplate />
        </Table>
    )
}

export default CardTable