import { Component, ChangeEvent } from "react";
import OntologyService from "../services/OntologyService";
import { Link } from "react-router-dom";
import IOntologyModel from '../models/OntologyEntity';

type Props = {};

type State = {
    ontologies: Array<IOntologyModel>,
    currentOntology: IOntologyModel | null,
    currentIndex: number,
    ontologyIdRequest: string
};

export default class OntologyListComponent extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveOntologies = this.retrieveOntologies.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveOntology = this.setActiveOntology.bind(this);
        this.searchById = this.searchById.bind(this);

        this.state = {
            ontologies: [],
            currentOntology: null,
            currentIndex: -1,
            ontologyIdRequest: ""
        };
    }

    componentDidMount() {
        this.retrieveOntologies();
    }

    onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
        const ontologyIdRequest = e.target.value;

        this.setState({
            ontologyIdRequest: ontologyIdRequest
        });
    }

    retrieveOntologies() {
        OntologyService.getAll()
            .then(response => {
                this.setState({
                    ontologies: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveOntologies();
        this.setState({
            currentOntology: null,
            currentIndex: -1
        });
    }

    setActiveOntology(ontology: IOntologyModel, index: number) {
        this.setState({
            currentOntology: ontology,
            currentIndex: index
        });
    }

    searchById() {
        this.setState({
            currentOntology: null,
            currentIndex: -1
        });

        OntologyService.get(this.state.ontologyIdRequest)
            .then(response => {
                this.setState({
                    ontologies: Array.isArray(response.data) ? response.data : Array.of(response.data)
                });
                console.log(Array.isArray(response.data) ? response.data : Array.of(response.data));
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { ontologyIdRequest, ontologies, currentOntology, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Id"
                            value={ontologyIdRequest}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchById}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Ontology list</h4>

                    <ul className="list-group">
                        {ontologies &&
                        ontologies.map((tutorial: IOntologyModel, index: number) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveOntology(tutorial, index)}
                                key={index}
                            >
                                {tutorial.ontologyId}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentOntology ? (
                        <div>
                            <h4>Ontology</h4>
                            <div>
                                <label>
                                    <strong>Id:</strong>
                                </label>{" "}
                                {currentOntology.ontologyId}
                            </div>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentOntology.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentOntology.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Definition properties:</strong>
                                </label>{" "}
                                {currentOntology.definitionProperties}
                            </div>
                            <div>
                                <label>
                                    <strong>Synonym properties:</strong>
                                </label>{" "}
                                {currentOntology.synonymProperties}
                            </div>

                            <Link
                                to={"/tutorials/" + currentOntology.ontologyId}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a list item to see details...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
