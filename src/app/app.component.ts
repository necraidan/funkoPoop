import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { FunkoDetailComponent } from './funko-detail/funko-detail.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'funkoPoop';
    searchForm = new FormGroup({
        searchModel: new FormControl('')
    });

    funkoList: Funko[];
    funkoFilter: Funko[];

    constructor(private _http: HttpClient, private _dialog: MatDialog) {}

    ngOnInit(): void {
        this._http.get('assets/funko.json').subscribe((res: Funko[]) => {
            this.funkoList = res;
            this.funkoFilter = Array.from(this.funkoList);
        });

        this.searchForm.get('searchModel').valueChanges.subscribe((val: string) => {
            this.funkoFilter = this.funkoList.filter(funko => {
                return (
                    funko.name.toLowerCase().includes(val.toLowerCase()) ||
                    funko.category.toLowerCase().includes(val.toLowerCase()) ||
                    funko.collection.toLowerCase().includes(val.toLowerCase()) ||
                    funko.number.toLowerCase().includes(val.toLowerCase())
                );
            });
        });
    }

    openDetail(funko: Funko) {
        const dialogRef = this._dialog.open(FunkoDetailComponent, {
            width: '500px',
            data: funko
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}

interface Funko {
    name: string;
    popCategory?: string;
    category: string;
    collection: string;
    number: string;
    picture: string[];
    description: string;
    magictag?: string[];
    owned?: boolean;
    wanted?: boolean;
    rarety?: string[];
}
