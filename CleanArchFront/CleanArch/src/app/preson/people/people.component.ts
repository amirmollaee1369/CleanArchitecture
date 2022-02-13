import { Component, OnInit } from '@angular/core';
import { CreatePersonComponent } from '../create-person/create-person.component';
import { PersonModel } from '../shared/person.model';
import { PersonService } from '../shared/person.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'FirstName', 'LastName', 'Email','DateofBirth','PhoneNumber','RegDate'];
  public items: any[] = [];
  public gridData: any = this.items;
  constructor(private service: PersonService) {
  }
  delete(node: PersonModel) {
      this.service.delete(node.Id).subscribe(result => this.getList());
  }
  private getList() {
    this.service.getAll()
      .subscribe(result => {
        this.items = result as PersonModel[];
        //const gridDataResult:  { data: this.items, total: this.items.length };
        //this.gridData = gridDataResult;
      });
  }

  ngOnInit() {
    this.getList();
  }
  add() {
    this.openDialog(0);
  }
  private openDialog(PersonId: number) {
        this.getList();
  }

  edit(node: PersonModel) {
    this.openDialog(node.Id);
  }
}
