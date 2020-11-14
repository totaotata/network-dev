import React, {useState} from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Card, CardBody, CardTitle, CardSubtitle, Button, Label, Table, UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import firebase from "firebase/app";
import "firebase/firestore";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

const ModifFormation = ( props) => {

///// Initialisation de la db
var db = firebase.firestore();

/////// Reception du state passé dans le link
let formation = props.location.state

////// Constantes du formulaires, chargées avec le state passé en link
const [titre, setTitre] = useState(formation.titre);
const [prix, setPrix] = useState(formation.prix);
const [description, setDescription] = useState(formation.description);
const [niveau, setNiveau] = useState(formation.niveau);
const [preRequis, setPrerequis] = useState(formation.prerequis);
const [domaine, setDomaine] = useState(formation.domaine);
const [nomOF, setNomOF] = useState(formation.OF);


///////// Fonction pour modifier en db
   let modifButton =async ()=>{
    const cibleModif = db.collection('formations').doc(formation.titre);
    await cibleModif.update({
        titre: titre,
        prix: prix,
        description: description,
        niveau_formation: niveau,
        pre_requis: preRequis,
        domaine: domaine,
        nom_OF: nomOF,
    });
   
    }

    return (
            
        <React.Fragment>
        <div className="page-content">

            <Container fluid>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardBody>
                                    <div>
                                    <CardTitle style ={{marginTop:20}}>Modifier les informations  {} </CardTitle>
                                <CardSubtitle className="mb-3">Enregistrer pour sauver les modifications</CardSubtitle>

                                <Form>
                                    <Row>
                                        <Col sm="6">
                                            <FormGroup>
                                                <Label htmlFor="titre">Intitulé</Label>
                                                <Input id="titre"
                                                    name="titre" 
                                                    type="text" 
                                                    className="form-control"
                                                    onChange={(e) => setTitre(e.target.value)} 
                                                    value={formation.titre}
                                                
                                                    />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor="niveau_formation">Niveau</Label>
                                                <Input id="niveau_formation"
                                                 name="niveau_formation" 
                                                 type="text" 
                                                 className="form-control"
                                                 onChange={(e) => setNiveau(e.target.value)} 
                                                    value={niveau}
                                                 />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor="pre_requis">Pré-requis</Label>
                                                <Input id="pre_requis" 
                                                name="pre_requis" 
                                                type="text" 
                                                className="form-control" 
                                                onChange={(e) => setPrerequis(e.target.value)} 
                                                    value={preRequis}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor="nom_OF">Organisme de formation</Label>
                                                <Input id="nom_OF" 
                                                name="nom_OF" 
                                                type="text" 
                                                className="form-control" 
                                                onChange={(e) => setNomOF(e.target.value)} 
                                                    value={nomOF}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col sm="6">
                                            <FormGroup>
                                                <Label htmlFor="description">Description</Label>
                                                <textarea className="form-control" 
                                                id="description" 
                                                rows="5"
                                                onChange={(e) => setDescription(e.target.value)} 
                                                value={description}
                                                >
                                                </textarea>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor="domaine">Domaine</Label>
                                                <Input id="domaine" 
                                                ame="domaine" 
                                                type="text" 
                                                className="form-control" 
                                                onChange={(e) => setDomaine(e.target.value)} 
                                                value={domaine}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor="prix">Prix</Label>
                                                <Input id="prix" 
                                                name="prix" 
                                                type="number" 
                                                className="form-control"
                                                onChange={(e) => setPrix(e.target.value)} 
                                                value={prix}
                                                />
                                            </FormGroup>

                                        </Col>
                                    </Row>

                                   <Link to="/formations"> 
                                    <Button onClick={()=>{ modifButton()}  } 
                                        color="primary" 
                                        className="mr-1 waves-effect waves-light"
                                        >Enregistrer</Button>
                                    </Link>
                                </Form>
                                </div>

                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </Container>
            </div>
            </React.Fragment>
      );
    }

export default ModifFormation;