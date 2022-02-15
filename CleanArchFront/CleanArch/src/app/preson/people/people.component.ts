import { Component, OnInit, ViewChild } from '@angular/core';
import { CreatePersonComponent } from '../create-person/create-person.component';
import { PersonModel } from '../shared/person.model';
import { PersonService } from '../shared/person.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'FirstName', 'LastName', 'Email','DateofBirth','PhoneNumber','RegDate'];
  public items: any[] = [];
  dataSource = new MatTableDataSource<PersonModel>(this.items);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator | null;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
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
