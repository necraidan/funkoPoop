import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'funkoPoop';

    funkoList: Funko[];

    constructor(private _http: HttpClient) {}

    ngOnInit(): void {
        this._http.get('assets/funko.json').subscribe((res: Funko[]) => {
            this.funkoList = res;
            console.log(res);
        });
    }
}

interface Funko {
    name: string;
    category: string;
    collection: string;
    number: number;
    picture: string[];
    description: string;
    magictag: string;
}
