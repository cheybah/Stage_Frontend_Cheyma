import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ChauffeurModel } from 'app/models/chauffeurModel';
import {Agence} from '../models/agence';

@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {

  constructor(private http: HttpClient) { }

  getAllChauffeurs() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<ChauffeurModel[]>(environment.url + '/chauffeurs', { headers });
  }

  getChauffeurById(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<ChauffeurModel>(environment.url + '/chauffeurs/' + id, { headers });
  }

    addChauffeur(chauffeur: { numTels: string[]; nom: string; prenom: string; etat: string; email: string }) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<ChauffeurModel>(environment.url + '/chauffeurs', chauffeur, { headers });
  }

  updateChauffeur(id: number, chauffeur: ChauffeurModel) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<ChauffeurModel>(environment.url + '/chauffeurs/' + id, chauffeur, { headers });
  }

  deleteChauffeur(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(environment.url + '/chauffeurs/' + id, { headers });
  }

  getAllChauffeurEtatActif() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(environment.url + '/chauffeurs/activer', { headers });
  }

  archiverChauffeur(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(environment.url + '/chauffeurs/' + id + '/archiver', { headers });
  }

  // Add more methods as needed

}