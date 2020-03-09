import React from 'react';
import { Table } from 'reactstrap';

const ScoreTable = (props) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Turno</th>
                    <th>Primer Lanzamiento</th>
                    <th>Segundo Lanzamiento</th>
                    <th>Tercer Lanzamiento (Si aplica)</th>
                    <th>Puntaje</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.turnData
                        .map(turn =>
                            (<tr key={turn.number}>
                                <th scope="raw">{turn.number.toString()}</th>
                                <td>{turn.firstThrow}</td>
                                <td>{turn.secondThrow}</td>
                                <td>{turn.thirdThrow}</td>
                                <td>{turn.score}</td>
                            </tr>)
                        )
                }
            </tbody>
        </Table>
    );
}

export default ScoreTable;