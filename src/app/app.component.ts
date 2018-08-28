import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

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

    constructor(private _http: HttpClient) {}

    ngOnInit(): void {
        this._http.get('assets/funko.json').subscribe((res: Funko[]) => {
            this.funkoList = res;
            this.funkoFilter = Array.from(this.funkoList);
        });

        this.searchForm.get('searchModel').valueChanges.subscribe((val: string) => {
            this.funkoFilter = this.funkoList.filter(funko => funko.name.toLowerCase().includes(val.toLowerCase()));
        });
    }
}

interface Funko {
    name: string;
    popCategory?: string;
    category: string;
    collection: string;
    number: number;
    picture: string[];
    description: string;
    magictag?: string[];
    owned?: boolean;
    wanted?: boolean;
}
