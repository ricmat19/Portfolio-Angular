import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { AdminAboutComponent } from './components/admin/about/about.component';
import { AdminAddProjectComponent } from './components/admin/add-project/add-project.component';
import { AdminAddSkillComponent } from './components/admin/add-skill/add-skill.component';
import { AdminDeleteProjectComponent } from './components/admin/delete-project/delete-project.component';
import { AdminPortfolioComponent } from './components/admin/portfolio/portfolio.component';
import { AdminProjectDetailsComponent } from './components/admin/project-details/project-details.component';
import { AdminUpdateProjectComponent } from './components/admin/update-project/update-project.component';
import { FooterComponent } from './components/standard/footer/footer.component';
import { HeaderComponent } from './components/standard/header/header.component';
import { LeftArrowComponent } from './components/standard/left-arrow/left-arrow.component';
import { RightArrowComponent } from './components/standard/right-arrow/right-arrow.component';
import { AboutComponent } from './components/user/about/about.component';
import { ContactComponent } from './components/standard/contact/contact.component';
import { HomeComponent } from './components/standard/home/home.component';
import { PortfolioComponent } from './components/user/portfolio/portfolio.component';
import { ProjectDetailsComponent } from './components/user/project-details/project-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminAboutComponent,
    AdminAddProjectComponent,
    AdminAddSkillComponent,
    AdminDeleteProjectComponent,
    AdminPortfolioComponent,
    AdminProjectDetailsComponent,
    AdminUpdateProjectComponent,
    FooterComponent,
    HeaderComponent,
    LeftArrowComponent,
    RightArrowComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    PortfolioComponent,
    ProjectDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
