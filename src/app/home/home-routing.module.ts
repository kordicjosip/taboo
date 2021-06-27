import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "@app/home/home.component";
import {DogadajiComponent} from './dogadaji/dogadaji.component';
import {RezervacijaComponent} from './rezervacija/rezervacija.component';
import {RezervacijaRegistracijaComponent} from "@app/home/rezervacija-registracija/rezervacija-registracija.component";
import {PotvrdaSmsComponent} from "@app/home/potvrda-sms/potvrda-sms.component";
import {AuthGuardCustomer} from "@app/_helpers/auth-guard-customer.service";

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: '', component: RezervacijaComponent, canActivate: [AuthGuardCustomer]
      },
      {
        path: 'rezervacijeregister', component: RezervacijaRegistracijaComponent,
      },
      {
        path: 'dogadaji/:id/rezervacija', component: RezervacijaComponent,
      },
      {
        path: 'dogadaji/:id', component: DogadajiComponent,
      },
      {
        path: 'confirm', component: PotvrdaSmsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
