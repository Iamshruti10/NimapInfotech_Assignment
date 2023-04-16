import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CatAddEditComponent } from './cat-add-edit/cat-add-edit.component';
import { CatagoryService } from './services/catagory.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NimapAssignment';

  displayedColumns: string[] = ['id', 'catagoryid', 'categoryName', 'productid','productName','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private _dialog:MatDialog,
     private _catService:CatagoryService, 
     private _coreSerive:CoreService ){}
 
  ngOnInit():void{
    this.getCatogarylist();
  }
  openAddEditCatagory(){
     const dialogRef = this._dialog.open(CatAddEditComponent);
     dialogRef.afterClosed().subscribe({
      next:(val) => {
        if(val) {
          this.getCatogarylist();
        }
      }
     })
  }

    getCatogarylist(){
      this._catService.getCatagoryList().subscribe({
        next:(res) =>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        },
        error:console.log,
      })
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    deleteCatagory(id: number){
      this._catService.deleteCatagory(id).subscribe({
        next:(res) => {
        alert('Delete Successfully!');
        // this._coreSerive.openSnackBar('Deleted Successfully','Done');
        this.getCatogarylist();
        },
        error:console.log,
      })
    }

    openEditForm(data:any){
      const dialogRef= this._dialog.open(CatAddEditComponent,{
        data,
       });
       dialogRef.afterClosed().subscribe({
        next:(val) => {
          if(val) {
            this.getCatogarylist();
          }
        }
       })
      
   }
}
