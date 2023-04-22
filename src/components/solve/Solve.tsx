import {observer, useLocalObservable} from "mobx-react-lite"
import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form';

const Solve = () =>{

    const solveData = useLocalObservable(() => ({

        initCount: "7",
        countValid: true,

        checkInputValue(){
            this.countValid = isInt(this.initCount);
            return this.countValid;
        },

        changeCount(event){
            this.initCount = event.target.value;
            this.checkInputValue();
        },

    }))

    const isInt = (value) =>{
        console.log("value", value);
        return value == parseInt(value, 10);
    }

    const inputFireCount = (
        <Form.Group
            className="mb-3"
            controlId="countControlID">
            <Form.Label>Количество спичек в куче</Form.Label>
            <Form.Control
                as="input"
                defaultValue={solveData.initCount}
                isValid={solveData.countValid}
                onChange={solveData.changeCount}
                //isValid={}
            />
            {!solveData.countValid
                ? ( <div className="text-danger small">В поле должно быть введено число</div>)
                : (<></>)}
        </Form.Group>

    )

    const showSolve = (value: number)=>{
        console.log(value);
        return(
            <Container fluid>
                <Row>
                    <Col>
                        <div className={"text-center"}>

                                Спичек: {value}

                            <Container fluid>
                                <Row>
                                    <Col>
                                        Взяли: 1 {(value-1) >= 0 ? showSolve(value-1) : null}
                                    </Col>
                                    <Col>
                                        Взяли: 2 {(value-2) >= 0 ? showSolve(value-2) : null}
                                    </Col>
                                    <Col>
                                        Взяли: 3 {(value-3) >= 0 ? showSolve(value-3) : null}
                                    </Col>
                                    <Col>
                                        Взяли: 4 {(value-4) >= 0 ? showSolve(value-4) : null}
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }

    const showSolve2 = (value: number)=>{
        console.log(value);
        if(value < 0) return null;
        return(
            <table>
                <tr >
                    <td colSpan={value>0 ? 4 : null} className={"text-center"}>
                        <h4>{value}</h4>
                    </td>
                </tr>
                { (value > 0) ? ( <>
                <tr>
                    <td className={"text-center"}>
                        {value - 1 >= 0 ? 1 : null}
                    </td>
                    <td className={"text-center"}>
                        {value - 2 >= 0 ? 2 : null}
                    </td>
                    <td className={"text-center"}>
                        {value - 3 >= 0 ? 3 : null}
                    </td>
                    <td className={"text-center"}>
                        {value - 4 >= 0 ? 4 : null}
                    </td>
                </tr>
                <tr>
                    <td className={"text-center"}>
                        {showSolve2(value-1)}
                    </td>
                    <td className={"text-center"}>
                        {showSolve2(value-2)}
                    </td>
                    <td className={"text-center"}>
                        {showSolve2(value-3)}
                    </td>
                    <td className={"text-center"}>
                        {showSolve2(value-4)}
                    </td>
                </tr>
                </>) : null
                }
            </table>
        )
    }

    return (
        <div>
            {inputFireCount}
            { isInt(solveData.initCount) ? showSolve2(parseInt(solveData.initCount)) : null}
        </div>
    )
}

export default observer(Solve)