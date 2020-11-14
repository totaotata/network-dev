import React, {} from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Card, CardBody, CardTitle, CardSubtitle,CardText, Button, Label, Table, UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";


const DetailsFormation = (props) => {

/////////////recupération du state passé en props
let formation = props.location.state

console.log(formation)
    return (
             <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Row>
                            <Col xs="12">
                                <Card>
                                    <CardBody>

                                            <CardTitle style ={{marginTop:20}}>Formation  </CardTitle>
                                             <CardSubtitle className="mb-3">Infos disponibles</CardSubtitle>
                                            
                                             <CardText>{formation.titre}</CardText>
                                             <CardText>{formation.domaine}</CardText>
                                             <CardText>{formation.prix}</CardText>
                                             <CardText>{formation.niveau}</CardText>
                                             <CardText> {formation.prerequis}</CardText>
                                             <CardText>{formation.description}</CardText>
                                             <CardText> {formation.OF}</CardText>

                                    </CardBody>
                                </Card>

                            </Col>
                        </Row>
                    </Container>
                    </div>
             </React.Fragment>
          )
        }
        
export default DetailsFormation;


