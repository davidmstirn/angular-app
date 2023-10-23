import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  forbiddenProjectName = 'Test';
  projectStatuses = ['Stable', 'Critical', 'Finished']

  ngOnInit() {
    this.projectForm = new FormGroup<any>({
      'projectName': new FormControl(null, [Validators.required], [this.forbiddenNames.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl(this.projectStatuses[0], [Validators.required])
    })
  }

  onSubmit() {
    console.log(this.projectForm)
  }

  forbiddenNames(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(()=> {
        if(control.value === this.forbiddenProjectName) {
          resolve({'projectNameIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500)
    })
  }
}
