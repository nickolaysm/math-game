import {observer} from "mobx-react-lite";
import {Col, Container, Row} from "react-bootstrap";
import {gameStore, IGameLog, PlayerType} from "./Game.store";
import React from "react";
import PlayerView from "./PlayerView";

const logToHTML = (
    gameStore.game.gameLog.map((elem: IGameLog)=>{
        return(
            <div>Игрок {elem.playerNumber}, взял: {elem.playerTaked}, осталось: {elem.total}</div>
        )
    })
)
function GameLog() {
    return (
        <Container>
            <Row>
                <Col>
                    <h3>Лог игры:</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    {logToHTML}
                </Col>
            </Row>
        </Container>
    );
}

const GameView = () => {

    return(
        <Container>
            <Row>
                <Col lg={9}>
                    <h1 className={"text-center"}>
                        Куча спичек:
                    </h1>
                    <h1 className={"text-center"} style={{"fontSize":'10em'}}>
                        {gameStore.game.totalCount}
                    </h1>
                    <Container>
                        <Row>
                            <Col>
                                <PlayerView player={1} lastStep={gameStore.game.user1LastStep} taked={gameStore.game.user1Taked} isUser={true}/>
                            </Col>
                            <Col>
                                <PlayerView player={2} lastStep={gameStore.game.user2LastStep} taked={gameStore.game.user2Taked} isUser={gameStore.game.player2Type == PlayerType.User}/>
                            </Col>

                        </Row>
                    </Container>
                </Col>
                <Col lg={3}>
                    <GameLog/>
                </Col>
            </Row>
        </Container>
    )
}

export default observer(GameView)