import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CatagoryService } from '../services/catagory.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-cat-add-edit',
  templateUrl: './cat-add-edit.component.html',
  styleUrls: ['./cat-add-edit.component.scss']
})
export class CatAddEditComponent implements OnInit{
   catForm:FormGroup;


   constructor(private _fb:FormBuilder,private _catService: CatagoryService,private _dialogRef:MatDialogRef<CatAddEditComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private _coreSerivce:CoreService){
    this.catForm =this._fb.group({
      catagoryid:'',
      categoryName:'',
      productid:'',
      productName:''
    })
   }
   ngOnInit(): void {
       this.catForm.patchValue(this.data);
   }
   onFromSubmit(){
    if(this.catForm.valid){
      if(this.data){
        this._catService.updateCatagory(this.data.id,this.catForm.value).subscribe({
          next:(val:any) =>{
            alert('Updated Successfully');
            // this._coreSerivce.openSnackBar('Updated Successfully');
            this._dialogRef.close(true);
          },
          error:(err:any)=>{
           console.error(err);
          }
        });
      }

      }else{
        this._catService.addCatagory(this.catForm.value).subscribe({
          next:(val:any) =>{
            alert('Added Successfully')
            // this._coreSerivce.openSnackBar('Added Successfully');
            this._dialogRef.close(true);
          },
          error:(err:any)=>{
           console.error(err);
          }
        });
      }
  
    }
   }

