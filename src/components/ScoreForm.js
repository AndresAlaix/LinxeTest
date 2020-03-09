import React, { useState } from 'react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Button,
} from 'reactstrap';

const ScoreForm = (props) => {
    const [throwScore, setThrowScore] = useState("")
    const handleSubmit = () => {
        props.onSubmit(parseInt(throwScore))
    }

    return (
        <div>
            <InputGroup>
                <InputGroupText>Turno: {props.turn.turn}, Lanzamiento: {props.turn.throw}, Valor: {throwScore}</InputGroupText>
                <Input
                    placeholder="Ingresa Tu Puntaje de Cada Lanzamiento"
                    onChange={event => {
                        setThrowScore(event.target.value)
                    }} />
                <InputGroupAddon addonType="append"><Button color="secondary" onClick={handleSubmit}>Registrar Puntaje</Button></InputGroupAddon>
            </InputGroup>
        </div>
    );
}


export default ScoreForm;