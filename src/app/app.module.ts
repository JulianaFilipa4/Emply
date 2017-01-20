// Modules ionic
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

// Pages
import { LoginPage } from '../pages/login/login';
import { AccueilPage } from '../pages/accueil/accueil';
import { ControlePage } from '../pages/controle/controle';
import { MeshorairesPage } from '../pages/meshoraires/meshoraires';
import { DemandesPage } from '../pages/demandes/demandes';
import { MonprofilPage } from '../pages/monprofil/monprofil';
import { SaisiedemandePage } from '../pages/saisiedemande/saisiedemande';
import {ServiceUsers} from "../providers/user-service";

// Providers
import { NotificationsLocalesService } from '../providers/notifications-locales-service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    AccueilPage,
    ControlePage,
    MeshorairesPage,
    DemandesPage,
    MonprofilPage,
    SaisiedemandePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    AccueilPage,
    ControlePage,
    MeshorairesPage,
    DemandesPage,
    MonprofilPage,
    SaisiedemandePage
  ],
  providers: [NotificationsLocalesService, ServiceUsers]
})
export class AppModule {}
