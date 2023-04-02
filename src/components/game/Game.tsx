import {observer, useLocalObservable} from "mobx-react-lite"
import {gameStore, IGameLog, PlayerType} from "./Game.store";
import Modal from 'react-bootstrap/Modal';
import React from "react";
import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form';

const Game = () =>{

    const game = useLocalObservable(() => ({
        isShowStartModal: false,
        initCount: "24",
        initPlayer2Type: PlayerType.RandomStrategy,
        countValid: true,

        checkInputValue(){
            this.countValid = isInt(this.initCount);
            return this.countValid;
        },

        open(){
            console.log(' +++++ open');
            this.checkInputValue();
            this.isShowStartModal = true;
            gameStore.clean();
        },

        init(value: number){
            gameStore.initGame(value, game.initPlayer2Type);
            this.isShowStartModal = false;
        },

        close(){
            this.isShowStartModal = false;
        }
    }))

    const isInt = (value) =>{
        console.log("value", value);
        return value == parseInt(value, 10);
    }

    const onChange = (event) => {
        game.initCount = event.target.value;
        game.checkInputValue();
    }

    const onSelectChange = (event) => {
        console.log("onSelectChange", event.target.value);
        game.initPlayer2Type = event.target.value;
    }
    const logToHTML = (
        gameStore.game.gameLog.map((elem: IGameLog)=>{
            return(
                <div>Игрок {elem.playerNumber}, взял: {elem.playerTaked}, осталось: {elem.total}</div>
            )
        })
    )
    const handleSubmit = (event) => {

        if(!game.checkInputValue()){
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        game.init(parseInt(game.initCount, 10));
    };

    const showStartModal2 = (
        <Modal
            size="lg"
            show={game.isShowStartModal}
            onHide={game.close}

            aria-labelledby="example-modal-sizes-title-lg"
        >

            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Начать новую игру
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group
                    className="mb-3"
                    controlId="countControlID">
                    <Form.Label>Количество спичек в куче</Form.Label>
                    <Form.Control
                        as="input"
                        defaultValue={game.initCount}
                        isValid={game.countValid}
                        onChange={onChange}
                        //isValid={}
                    />
                    {!game.countValid
                        ? ( <div className="text-danger small">В поле должно быть введено число</div>)
                        : (<></>)}
`               </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="selectControlID">
                    <Form.Label>Тип второго игрока</Form.Label>
                    <Form.Select aria-label="Выбор типа игрока" onChange={onSelectChange} defaultValue={game.initPlayer2Type}>
                        <option value={PlayerType.RandomStrategy}>Алгоритм со случайным ходом</option>
                        <option value={PlayerType.StrongStrategy}>Оптимальный алгоритм</option>
                        <option value={PlayerType.User}>Человек</option>
                    </Form.Select>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={game.close}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Начать игру
                </Button>
            </Modal.Footer>
        </Modal>
    )

    const endGameModal = (
        <Modal
            size="lg"
            show={gameStore.game.gameIsFinished}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Игра окончена
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Выиграл игрок {gameStore.game.winnerPlayerNumber}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={game.open}>
                    Начать новую игру
                </Button>
            </Modal.Footer>
        </Modal>
    )


    return (
        <div>
            {showStartModal2}
            {endGameModal}
            <Button variant="outline-primary" onClick={game.open}>Начать новую игру</Button>
            <h1 className={"text-center"}>
                Куча спичек:
            </h1>
            <h1 className={"text-center"} style={{"fontSize":'10em'}}>
                {gameStore.game.totalCount}
            </h1>
            <Container>
                <Row>
                    <Col lg={9}>
                        <Container>
                            <Row>
                                <Col>
                                    <h1 className={"text-left"}>
                                        Игрок 1
                                    </h1>
                                </Col>
                                <Col>
                                    <h1 className={"text-left"}>
                                        Игрок 2
                                    </h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h3 className={"text-left"}>
                                        Последний ход: {gameStore.game.user1LastStep}
                                    </h3>
                                </Col>
                                <Col>
                                    <h3 className={"text-left"}>
                                        Последний ход: {gameStore.game.user2LastStep}
                                    </h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h3 className={"text-left"}>
                                        Всего взято спичек: {gameStore.game.user1Taked}
                                    </h3>
                                </Col>
                                <Col>
                                    <h3 className={"text-left"}>
                                        Всего взято спичек: {gameStore.game.user2Taked}
                                    </h3>
                                </Col>
                            </Row>
                            <Row>
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
                                <Col></Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col lg={3}>
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
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default observer(Game)