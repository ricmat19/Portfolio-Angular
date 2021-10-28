import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/standard/home/home.component';
import { AboutComponent } from './components/user/about/about.component';
import { ContactComponent } from './components/standard/contact/contact.component';
import { PortfolioComponent } from './components/user/portfolio/portfolio.component';
import { ProjectDetailsComponent } from './components/user/project-details/project-details.component';
import { AdminPortfolioComponent } from './components/admin/portfolio/portfolio.component';
import { AdminProjectDetailsComponent } from './components/admin/project-details/project-details.component';
import { AdminAboutComponent } from './components/admin/about/about.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "about", component: AboutComponent},
  {path: "contact", component: ContactComponent},
  {path: "portfolio", component: PortfolioComponent},
  {path: "portfolio/:project", component: ProjectDetailsComponent},
  {path: "admin/portfolio", component: AdminPortfolioComponent},
  {path: "admin/portfolio/:project", component: AdminProjectDetailsComponent},
  {path: "admin/about", component: AdminAboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
