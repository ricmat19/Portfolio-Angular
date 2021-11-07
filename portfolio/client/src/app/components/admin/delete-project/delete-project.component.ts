import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
})
export class AdminDeleteProjectComponent {
  @Input() deletedProject = '';

  constructor(private http: HttpClient) {}

  deleteProject() {
    return this.http
      .delete(
        `http://localhost:3000/admin/portfolio/${this.deletedProject}/delete`
      )
      .subscribe(
        (res) => {},
        (err) => {
          console.log(err);
        }
      );
  }
}
