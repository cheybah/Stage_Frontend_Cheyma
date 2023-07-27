import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { EleveComponent } from 'app/pages/eleve/eleve/eleve.component';
import { PersonnelComponent } from 'app/pages/personnel/personnel/personnel.component';
import {StationComponent} from 'app/pages/station/station/station.component';
import {ClasseComponent} from 'app/pages/classe/classe/classe.component';
import { ChauffeurComponent } from 'app/pages/chauffeur/chauffeur/chauffeur.component';
import { AgenceComponent } from 'app/pages/agence/agence.component';
import { BusComponent } from '../../pages/bus/bus.component';
import {AnneeScolaireComponent} from '../../pages/annee-scolaire/annee-scolaire.component';



export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'eleves',  component: EleveComponent },
    { path: 'personnels',  component: PersonnelComponent },
    { path: 'stations',  component: StationComponent },
    { path: 'classes',  component: ClasseComponent },
    { path: 'agences',  component: AgenceComponent },
    { path: 'chauffeurs',  component: ChauffeurComponent },
    { path: 'bus',  component: BusComponent },
    { path: 'annee-scolaire',   component: AnneeScolaireComponent },


];
