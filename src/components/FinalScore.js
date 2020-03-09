import React from 'react';
import { Button } from 'reactstrap';

const FinalScore = (props) => {
    return (
        <div>
            <Button onClick={props.onClickHandler} color="success" size="lg">Calcular Puntaje Total</Button>
        </div>
    );

}
export default FinalScore;