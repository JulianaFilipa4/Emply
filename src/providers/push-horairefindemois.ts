import { Injectable, Component, ViewChild } from '@angular/core';
import {  AlertController, Nav, Platform, LoadingController} from 'ionic-angular';
import { LocalNotifications, Push, Splashscreen, StatusBar } from 'ionic-native';
import 'rxjs/add/operator/map';


// Providers
import { ApiBddService } from '../providers/api-bdd-service';
import { ConnectivityService } from '../../providers/connectivity-service';

//Models
import {Horaire} from '../models/horaire';

@Injectable()
export class pushHoraireFin {  
   radioOpen: boolean;
   radioResult;  

  constructor(private alertCtrl: AlertController, public platform : Platform, private abiBddCtrl: ApiBddService) {
  }//constructor

afficherNotificationFinDeService(titreNotification, messageNotification, idNotification){
        let alert = this.alertCtrl.create({
        title: titreNotification,
        message: messageNotification,
        buttons: [
          {
            text: 'Non',
            role: 'cancel',
            handler: () => {
              console.log('Non clicked');
              this.modificationHoraires(titreNotification,messageNotification, idNotification);
            }
          },
          {
            text: 'Oui',
            handler: () => {
               console.log('Oui clicked'); // TODO: enregsitrer que c'est OK dans la BDD via API
               this.validationHoraire(idNotification, '', '',1); // -> Chaine vide , sinon ça enverra le string "Null" dans l'API
            }
          },
          {
            text: 'Maladie/Accident',
            handler: () =>{
               console.log("maladieAccident click")
               this.faireChoixMaladieAccident(titreNotification, messageNotification, -1);

            } 
          }
        ]
      });
      alert.present();
   }//afficherNotificationFinDeService

   modificationHoraires(titreNotification, messageNotification, idNotification){     
     // 1) On récupère les détails de l'horaire prévu dans la BDD
   //  this.abiBddCtrl.getDetailHoraire(window.localStorage.getItem('id'), window.localStorage.getItem('tokenBDD'), idNotification).subscribe(
   //       data => {        
   //          if(data) {  // OK   
   //              let dateHoraire = new Date(data[0].date);
   //               let horaire =  new Horaire(data[0].id, dateHoraire,        
   //                 new Date(dateHoraire.getFullYear(), dateHoraire.getMonth(), dateHoraire.getDate(), data[0].heureDebut, data[0].minuteDebut),
   //                 new Date(dateHoraire.getFullYear(), dateHoraire.getMonth(), dateHoraire.getDate(), data[0].heureFin, data[0].minuteFin));
   //                 // On lance la fonction d'affichate, on lui passant l'horaire prévu en paramètre
   //                   this.afficherModificationHoraires(horaire, titreNotification, messageNotification, idNotification);
   //         } else {
   //           console.log('ERREUR');  // ERREUR   
   //         }
   //       }); 
   }//modificationHoraires

   afficherModificationHoraires(horaire: Horaire, titreNotification, messageNotification, idNotification){     
        let alert = this.alertCtrl.create({
        title: titreNotification,
        message: messageNotification,
        inputs: [
        {
          id: 'heureDebut',
          type: 'time',
          name: 'heureDebut',
          value: horaire.affichageHeureDebut,
          placeholder: 'Heure de début de service'
        },
        {
          id: 'heureFin',
          type: 'time',
          name: 'heureFin',
          value: horaire.affichageHeureFin,
          placeholder: 'Heure de fin de service'
        },
      ],
        buttons: [
          {
            text: 'Valider',
            handler: data => {               
              if(data.heureFin < data.heureDebut){ // Si l'heure de fin est plus petite que l'heure de début = on a travaillé
                horaire.heureFin.setDate(horaire.heureFin.getDate() + 1); // On ajoute un jour à la date de fin
              }
              horaire.heureDebut.setHours(data.heureDebut.split(":")[0]);   // On fixe les heures de débuts entrés à la date de début
              horaire.heureDebut.setMinutes(data.heureDebut.split(":")[1]);  // On fixe les minutes de débuts entrés à la date de début
              horaire.heureFin.setHours(data.heureFin.split(":")[0]);  // On fixe les heures de fins entrés à la date de fin
              horaire.heureFin.setMinutes(data.heureFin.split(":")[1]);  // On fixe les minutes de fins entrés à la date de fin

              // On appelle la fonction d'enregistrement en formatant les dates pour qu'elles passent
              this.validationHoraire(idNotification, 
              horaire.heureDebut.getFullYear()+"-"+horaire.heureDebut.getMonth()+"-"+horaire.heureDebut.getDate()+" "+horaire.heureDebut.getHours()+":"+horaire.heureDebut.getMinutes(), 
              horaire.heureFin.getFullYear()+"-"+horaire.heureFin.getMonth()+"-"+horaire.heureFin.getDate()+" "+horaire.heureFin.getHours()+":"+horaire.heureFin.getMinutes(), 1); 
            }
          }
        ]
      });
      alert.present();
   }

   faireChoixMaladieAccident(titreNotification, messageNotification, idNotification){
    let alert = this.alertCtrl.create();
    alert.setTitle('Maladie ou accident');
    alert.addInput({
      type: 'radio',
      label: 'Maladie',
      id : '1',
      value: 'maladie',
      name:'maladie',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'Accident',
      id : '2',
      value: 'accident',
      name:'accident',
      checked: false
    });
    alert.addButton({
      text: 'Confirmer',
      handler: data => {
        this.radioOpen = false;
        this.radioResult = data;
        this.validationHoraire(idNotification, '', '',-1);
        console.log("HEY!!!! Je suis CONFIRMER!!!!");
        console.log("radioResult" + this.radioResult);
        if (data === "maladie"){ 
          this.afficherDateMaladie(titreNotification, messageNotification, idNotification);
        }else if(data === 'accident'){
          this.afficherDateAccident(titreNotification, messageNotification, idNotification)
        }
        else{
          console.log("RIEN!!!!!");
        }
      }
    });
    alert.present(); 
   }

afficherDateMaladie(titreNotification, messageNotification, idNotification){
  let alert = this.alertCtrl.create({
      title: titreNotification,
      message: messageNotification,
        inputs: [
        {
          id: 'dateDebut',
          type: 'date',
          name: 'dateDebut',
          placeholder: 'Date de début'
        },
        {
          id: 'dateFin',
          type: 'date',
          name: 'dateFin',
          placeholder: 'Date de fin'
        },
      ],
        buttons: [
          {
            text: 'Valider',
            handler: data => {
               console.log('Oui clicked');
               if(data.dateDebut >= data.dateFin){
                    this.afficherAlertPasValide();
               }else{
                  this.abiBddCtrl.getMaladieAccident(window.localStorage.getItem('id'), window.localStorage.getItem('tokenBDD'), data.dateDebut, data.dateFin, "0").subscribe(
                        data => {
                          if(data) { // OK     
                            console.log("OK");
                          } else { // Erreur
                            console.log("Pas ok");
                    }
                  });
               }
            }
          }
        ]
      });
      alert.present();
}

afficherAlertPasValide(){
  let alert = this.alertCtrl.create({
      title: "Dates non valide",
      message: "Vos dates ne sont pas valides ! Veuillez mettre une date de debut antérieur à la date de fin",
        buttons: ['OK']
      });
      alert.present();
}

afficherDateAccident(titreNotification, messageNotification, idNotification){
  let alert = this.alertCtrl.create({
      title: titreNotification,
      message: messageNotification,
        inputs: [
        {
          id: 'dateDebut',
          type: 'date',
          name: 'dateDebut',
          placeholder: 'Date de début'
        },
        {
          id: 'dateFin',
          type: 'date',
          name: 'dateFin',
          placeholder: 'Date de fin'
        },
      ],
        buttons: [
          {
            text: 'Valider',
            handler: data => {
               console.log('Oui clicked');
               console.log(data.dateDebut +" "+ data.dateFin);
               if(data.dateDebut >= data.dateFin){
                 console.log(data.dateDebut +" "+ data.dateFin);
                    this.afficherAlertPasValide();
               }else{
                    this.abiBddCtrl.getMaladieAccident(window.localStorage.getItem('id'), window.localStorage.getItem('tokenBDD'), data.dateDebut, data.dateFin, "1").subscribe(
                        data => {
                          if(data) { // OK     
                            console.log("OK");
                          } else { // Erreur
                            console.log("Pas ok");
                    }
                  });
               }
            }
          }
        ]
      });
      alert.present();
}


validationHoraire(hopId, hDebut, hFin, traValid){  
    this.abiBddCtrl.setModHoraire(window.localStorage.getItem('id'),window.localStorage.getItem('tokenBDD'),hopId, hDebut, hFin, traValid).subscribe(        
      data => {
           if(data) {  // OK         
              console.log("Enregistrer");
             } else { // Erreur
                 console.log("Connexion échouée : mauvais mot de passe, token ou ID");
             }
        });
  }//modificationHoraire
}//ApiBddService
