import { User } from './userModel';

export interface PersonnelModel {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    fonction: string;
    etat: string;
    num: string[];
    user: User;
}