import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';

import OntologyService from "../services/OntologyService";
import IOntologyModel from "../models/OntologyEntity";

interface RouterProps {
    ontologyId: string;
}

type Props = RouteComponentProps<RouterProps>;

type State = {
    currentOntology: IOntologyModel;
    message: string;
}

export default class Tutorial extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeOntologyId = this.onChangeOntologyId.bind(this);
        this.getOntology = this.getOntology.bind(this);

        this.state = {
            currentOntology: {
                ontologyId: null,
                title: "",
                description: "",
                definitionProperties: [],
                synonymProperties: []
            },
            message: "",
        };
    }

    componentDidMount() {
        this.getOntology(this.props.match.params.ontologyId);
    }

    onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentOntology: {
                    ...prevState.currentOntology,
                    title: title,
                },
            };
        });
    }

    onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
        const description = e.target.value;

        this.setState((prevState) => ({
            currentOntology: {
                ...prevState.currentOntology,
                description: description,
            },
        }));
    }

    onChangeOntologyId(e: ChangeEvent<HTMLInputElement>) {
        const ontologyId = e.target.value;

        this.setState((prevState) => ({
            currentOntology: {
                ...prevState.currentOntology,
                description: ontologyId,
            },
        }));
    }

    getOntology(ontologyId: string) {
        OntologyService.get(ontologyId)
            .then((response) => {
                this.setState({
                    currentOntology: response.data,
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { currentOntology } = this.state;

        return (
            <div>
                {currentOntology ? (
                    <div className="edit-form">
                        <h4>Ontology</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="id">Id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="ontologyId"
                                    value={currentOntology.ontologyId}
                                    onChange={this.onChangeOntologyId}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentOntology.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentOntology.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Definition properties</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentOntology.definitionProperties}
                                    onChange={this.onChangeDescription}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Synonym properties</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentOntology.synonymProperties}
                                    onChange={this.onChangeDescription}
                                />
                            </div>
                        </form>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Ontology to see details...</p>
                    </div>
                )}
            </div>
        );
    }
}
