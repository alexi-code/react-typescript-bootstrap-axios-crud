import http from "../utils/HttpCommon";
import IOntologyModel from "../models/OntologyEntity"
import {ONTOLOGY_API_ROOT} from "../utils/Constants";

class OntologyDataService {

    getAll() {
        return http.get(ONTOLOGY_API_ROOT + '/detailed');
    }

    get(id: string) {
        return http.get(ONTOLOGY_API_ROOT + `/${id}`);
    }

    create(data: IOntologyModel) {
        return http.post(ONTOLOGY_API_ROOT, data);
    }

}

export default new OntologyDataService();
