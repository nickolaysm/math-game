import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import React from "react";
import {gameStore, PlayerType} from "./Game.store";

const PlayerView = (props) => {
    function getStrategyName(strategy: PlayerType) {
        if(strategy == PlayerType.RandomStrategy) return "Стратегия случайного числа";
        if(strategy == PlayerType.StrongStrategy) return "Оптимальная стратегия";
        return "Ходит человек";
    }

    return(
        <Container>
            <Row>
                <Col>
                    <h1 className={"text-left"}>
                        Игрок {props.player}
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <span className={"fs-6"}>
                    {getStrategyName(props.strategy)}
                    </span>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3 className={"text-left"}>
                        Последний ход: {props.lastStep}
                    </h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3 className={"text-left"}>
                        Всего взято спичек: {props.taked}
                    </h3>
                </Col>
            </Row>
            <Row>
                { props.isUser
                    ? (
                        <Col>
                            <span className={"fs-3"}>
                            Взять:
                            </span>
                            <ButtonGroup size="lg">
                                <Button variant="outline-primary" onClick={()=>gameStore.nextStep(1)}>1</Button>
                                <Button variant="outline-primary" onClick={()=>gameStore.nextStep(2)}>2</Button>
                                <Button variant="outline-primary" onClick={()=>gameStore.nextStep(3)}>3</Button>
                                <Button variant="outline-primary" onClick={()=>gameStore.nextStep(4)}>4</Button>
                            </ButtonGroup>
                        </Col>
                    )
                    : null
                }
            </Row>

        </Container>
    )
}

export default PlayerView;