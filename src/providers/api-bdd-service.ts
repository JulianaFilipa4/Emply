import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


//Models
import { UserModel } from '../models/user-model';
import { Horaires } from '../models/horaires';

@Injectable()
export class ApiBddService {  
  baseUrl = 'http://ctrl-ccnt.ch/assets/php/api/apiBdd.php?'; // URL du service web

  constructor(public http: Http) {
  }//constructor

 // Connexion d'un utilisateur
 // Renvois :  un JSON avec les données utilisateurs (connexion résussi), soit False (connexion échouée)
  connexion(login : string, password: string, deviceToken: string){
     var url =this.baseUrl + 'type=connect&login=' + encodeURI(login) + '&password=' + encodeURI(password) + '&deviceToken=' + encodeURI(deviceToken);
     console.log(url);
     var response = this.http.get(url).map(res => res.json());
     return response;
   }//connexion

 // Déconnexion  d'un utilisateur
 // Renvois : true ou false. TRUE = déconnexion effectule, FALSE = erreur (mauvais  userId ou Token)
  deconnexion(userId : string, token: string)  {    
     var url =this.baseUrl + 'type=logout&userId=' + encodeURI(userId) + '&token=' + encodeURI(token);
     console.log(url);
     var response = this.http.get(url).map(res => res.json());
     return response;
   }//deconnexion

  // Requête pour générer un nouveau mot de passe
 // / Renvois : true ou false. TRUE = nouveau mot de passe généré + envoyé par mail, FALSE = erreur  => l'adresse email n'existe pas
  setNewPassword(email : string){
     var url =this.baseUrl + 'type=setNewPassword&email=' + encodeURI(email);
     console.log(url);
     var response = this.http.get(url).map(res => res.json());
     return response;
   }//setNewPassword

 // Récupération du profil d'un utilisateur
 // Renvois :  un JSON avec les données du profil utilisateurs (requête réussie), soit False (requête réussie)
  getProfil(userId : string, token: string) : Observable<UserModel> {
     var url =this.baseUrl + 'type=getProfil&userId=' + encodeURI(userId) + '&token=' + encodeURI(token);
     console.log(url);
     return this.http.get(url).map(res => <UserModel>res.json());
   }//getProfil

 // Modification du profil d'un utilisateur
 // Renvois : true ou false. TRUE = modification enregsitrée, FALSE = erreur (mauvais userId ou Token)
  setProfil(userId : string, token: string, nom : string, prenom : string, dateNaissance : string, adresse : string, suppAdresse : string, 
            codePostal : number, ville : string, telFix : string, telMobile: string)  {
     var url =this.baseUrl + 'type=setProfil&userId=' + encodeURI(userId) + '&token=' + encodeURI(token) + '&nom=' + encodeURI(nom) + '&prenom=' + encodeURI(prenom) + 
         '&dateNaissance=' + encodeURI(dateNaissance) + '&adresse=' + encodeURI(adresse) + '&suppAdresse=' + encodeURI(suppAdresse) + 
         '&codePostal=' + encodeURI(codePostal.toString()) + '&ville=' + encodeURI(ville) + '&telFix=' + encodeURI(telFix) + '&telMobile=' + encodeURI(telMobile);
     console.log(url);
     var response = this.http.get(url).map(res => res.json());
     return response;
   }//setProfil

  // Modification du mot de passe d'un utilisateur
 // Renvois : true ou false. TRUE = modification enregsitrée, FALSE = erreur (mauvais mot  de passe, ou userId ou Token)
  setPassword(userId : string, token: string, ancienPassword : string, nouveauPassword : string)  {
     var url =this.baseUrl + 'type=setPassword&userId=' + encodeURI(userId) + '&token=' + encodeURI(token) + '&oldPassword=' + encodeURI(ancienPassword) + '&newPassword=' + encodeURI(nouveauPassword);
     console.log(url);
     var response = this.http.get(url).map(res => res.json());
     return response;
   }//setPassword

 // Modification de l'adresse email  d'un utilisateur
 // Renvois : true ou false. TRUE = modification enregsitrée, FALSE = erreur (mauvais mot  de passe, ou userId ou Token)
  setEmail(userId : string, token: string, mail : string)  {
     var url =this.baseUrl + 'type=setLogin&userId=' + encodeURI(userId) + '&token=' + encodeURI(token) + '&mail=' + encodeURI(mail);
     console.log(url);
     var response = this.http.get(url).map(res => res.json());
     return response;
   }//setEmail

 // Récupération des horaires d'un utilisateur
 // Renvois :  un JSON avec les horaires pour la periode demandée (requête réussie), soit False (requête réussie)
  getHoraires(userId : string, token: string, annee : string, mois: string) {
     var url =this.baseUrl + 'type=getHoraires&userId=' + encodeURI(userId) + '&token=' + encodeURI(token) + '&annee=' + encodeURI(annee) + '&mois=' + encodeURI(mois);
     console.log(url);
     var response = this.http.get(url).map(res => res.json());
     return response;
   }//getHoraires

  // Enregsitrement d'une demande
 // Renvois :  True (requête réussie), ou False (mauvais userId, demId, ou Token)
  setDemande(userId:string, token:string, demId:string, dateDebut: string, dateFin:string, motif:string) {
     var url =this.baseUrl + 'type=setDemande&userId=' + encodeURI(userId) + '&token=' + encodeURI(token) + '&demId=' + encodeURI(demId) 
      + '&dateDebut=' + encodeURI(dateDebut) + '&dateFin=' + encodeURI(dateFin) + '&motif=' + encodeURI(motif);
     console.log(url);
     var response = this.http.get(url).map(res => res.json());
     return response;
   }//setDemande
}//ApiBddService
