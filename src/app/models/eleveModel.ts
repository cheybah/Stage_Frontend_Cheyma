import { User } from './userModel';

export interface EleveModel {
    id: number;
    nom: string;
    prenom: string;
    nomPere: string;
    prenomPere: string;
    nomMere: string;
    prenomMere: string;
    nationalite: string;
    email: string;
    etat: string;
    numTels: string[];
    user: User;
}
