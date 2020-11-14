import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { Container, Row, Col, Form, FormGroup, Input, Card, CardBody, CardTitle, CardSubtitle, Button, Label, Table, UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import firebase from "firebase/app";
import "firebase/firestore";

////fake logo d'un organisme de formation
import img1 from "../../assets/images/companies/img-1.png";


const AddFormation = (props) => {

//////////Constantes du formulaire
const [display, setDisplay] = useState(false);

const [titre, setTitre] = useState("");
const [prix, setPrix] = useState("");
const [description, setDescription] = useState("");
const [niveau, setNiveau] = useState("");
const [preRequis, setPrerequis] = useState("");
const [domaine, setDomaine] = useState("");
const [nomOF, setNomOF] = useState("");

////////Constantes de la liste des formations
const[list, setList]= useState([])

///// Initialisation de la db
var db = firebase.firestore();

//////Chargement de la liste des formations
useEffect( () => {
    async function fetchData(){
        const listDb = db.collection('formations');
        const snapshot = await listDb.get();
        let tabFormations = []
        snapshot.forEach(doc => {
        tabFormations.push( doc.data() );
        setList(tabFormations)
        });
    }
    fetchData()
}, [])


////// Fonction pour ajouter en db une formation, mettre a jour la liste affichée, cleaner les champs du formulaire, refermer le formulaire 
let submitButton = async () =>{
    console.log("fetch")
    const docRef = db.collection('formations').doc(titre);
await docRef.set({
    titre: titre,
    prix: prix,
    description: description,
    niveau_formation: niveau,
    pre_requis: preRequis,
    domaine: domaine,
    nom_OF: nomOF,
});
let newFormation = {titre: titre,
    prix: prix,
    description: description,
    niveau_formation: niveau,
    pre_requis: preRequis,
    domaine: domaine,
    nom_OF: nomOF,}
    setList([...list, newFormation]);
    setTitre(""); setPrix(""); setDescription(""); setNiveau(""); setPrerequis(""); setDomaine(""); setNomOF("")
    setDisplay(false)
}



    return (
             <React.Fragment>
                <div className="page-content">

                    <Container fluid>
                        <Row>
                            <Col xs="12">
                                <Card>
                                    <CardBody>

                                    <Button onClick={()=>{ setDisplay(!display)}  } 
                                    color="primary" 
                                    className="mr-1 waves-effect waves-light"
                                    >{display? "Retour" :"Ajouter une formation" }</Button>


                                        {
                                            display && 
                                            <div>

                                            <CardTitle style ={{marginTop:20}}>Informations sur la formation  {} </CardTitle>

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
                                                            value={titre}
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
                                            <Button onClick={()=>{ submitButton()}  } 
                                            color="primary" 
                                            className="mr-1 waves-effect waves-light"
                                            >Enregistrer</Button>
                                        </Form>
                                        </div>
                                        }
                                       
                                    </CardBody>
                                </Card>

                            </Col>
                        </Row>
                    </Container>


               {/* //////////////// Listes des formations */}

                    <Container fluid>
                         <Row>
                            <Col lg="12">
                                <div className="">
                                    <div className="table-responsive">
                                        <Table className="project-list-table table-nowrap table-centered table-borderless">
                                            <thead>
                                                <tr>
                                                    <th scope="col" style={{ width: "100px" }}>Organisme</th>
                                                    <th scope="col">Intitulé</th>
                                                    <th scope="col">Niveau</th>
                                                    <th scope="col">Prix</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>
            
                                                </tr>
                                            </thead>
                                            <tbody>

                             {list.map((formation,i)=>{
                                    return(
                              
          
                            <tr key={i}>
                                
                                <td>

                                 <img src={img1} alt="" className="avatar-sm" />
                                <p>{formation.nom_OF}</p>
                                </td>
                                <td>
                                    <Link 
                                 to={{ pathname:`/detailsFormation/${formation.titre}`,
                                state:{titre: formation.titre, domaine: formation.domaine, niveau : formation.niveau_formation, prix: formation.prix, OF: formation.nom_OF, description: formation.description, prerequis: formation. pre_requis  }}} 
                                 className="team-member">
                                     <h5 className="text-truncate font-size-14">{formation.titre}</h5>
                                    <p className="text-muted mb-0">{formation.domaine}</p>
                                    </Link>
                                </td>
                              
                                <td>
                                    <h5 className="text-truncate font-size-14">{formation.niveau_formation} </h5>
                                    
                                </td>
                                <td>
                                    <h5 className="text-truncate font-size-14">{formation.prix} € </h5>
                                    
                                </td>
                                <td><span className="badge badge-primary">Completed</span>
                                </td>

                                <td>
                                    <Link 
                                 to={{ pathname:`/modifFormation/${formation.titre}`,
                                state:{titre: formation.titre, domaine: formation.domaine, niveau : formation.niveau_formation, prix: formation.prix, OF: formation.nom_OF, description: formation.description, prerequis: formation. pre_requis  }}} 
                                 className="team-member">
                                    <Button> 
                                        Modifier
                                    </Button>
                                    </Link>



                                    <Button style={{marginLeft:20}}
                                            onClick={ async ()=>{
                                                await db.collection('formations').doc(formation.titre).delete();
                                                let filter = list.filter(value => value.titre !== formation.titre ); 
                                                setList(filter);
                                                }  }
                                         >
                                        Supprimer
                                    </Button>
                                </td>
                            </tr>  
                                )} )}
                   
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs="12">
                                <div className="text-center my-3">
                                    <Link to="#" className="text-success"><i className="bx bx-loader bx-spin font-size-18 align-middle mr-2"></i> Load more </Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
         







                </div>
            </React.Fragment>
          );
    }
        
export default AddFormation;


