import { Component, ChangeEvent } from "react";
import OntologyService from "../services/OntologyService";
import IOntologyModel from '../models/OntologyEntity';

type Props = {};

type State = IOntologyModel & {
    submitted: boolean
};

export default class AddOntologyComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeOntologyId = this.onChangeOntologyId.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDefinitionProperties = this.onChangeDefinitionProperties.bind(this);
        this.onChangeSynonymProperties = this.onChangeSynonymProperties.bind(this);
        this.saveNewOntology = this.saveNewOntology.bind(this);
        this.newOntology = this.newOntology.bind(this);

        this.state = {
            ontologyId: "",
            title: "",
            description: "",
            submitted: false,
            definitionProperties: [],
            synonymProperties: []
        };
    }

    onChangeOntologyId(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            ontologyId: e.target.value
        });
    }

    onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeSynonymProperties(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            synonymProperties: e.target.value.split(',')
        });
    }

    onChangeDefinitionProperties(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            definitionProperties: e.target.value.split(',')
        });
    }

    saveNewOntology() {
        const data: IOntologyModel = {
            ontologyId: this.state.ontologyId,
            title: this.state.title,
            description: this.state.description,
            definitionProperties: this.state.definitionProperties,
            synonymProperties: this.state.synonymProperties
        };

        OntologyService.create(data)
            .then(response => {
                this.setState({
                    ontologyId: response.data.ontologyId,
                    title: response.data.title,
                    description: response.data.description,
                    definitionProperties: response.data.definitionProperties,
                    synonymProperties: response.data.synonymProperties
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newOntology() {
        this.setState({
            ontologyId: null,
            title: "",
            description: "",
            submitted: false,
            definitionProperties: [],
            synonymProperties: []
        });
    }

    render() {
        const { ontologyId, submitted, title, description, definitionProperties, synonymProperties } = this.state;

        return (
            <div className="submit-form">
                {submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newOntology}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Id</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ontologyId"
                                required
                                value={ontologyId}
                                onChange={this.onChangeOntologyId}
                                name="ontologyId"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={title}
                                onChange={this.onChangeTitle}
                                name="title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={description}
                                onChange={this.onChangeDescription}
                                name="description"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Definition properties</label>
                            <input
                                type="text"
                                className="form-control"
                                id="definitionProperties"
                                required
                                value={definitionProperties}
                                onChange={this.onChangeDefinitionProperties}
                                name="definitionProperties"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Synonym properties</label>
                            <input
                                type="text"
                                className="form-control"
                                id="synonymProperties"
                                required
                                value={synonymProperties}
                                onChange={this.onChangeSynonymProperties}
                                name="synonymProperties"
                            />
                        </div>

                        <button onClick={this.saveNewOntology} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
