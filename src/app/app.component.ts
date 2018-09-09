import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncSubject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'funkoPoop';

    funkoList: AsyncSubject<Funko[]> = new AsyncSubject<Funko[]>();
    funkoFilter: Funko[];

    constructor(private _http: HttpClient) {}

    ngOnInit(): void {
        this._http.get('assets/funko.json').subscribe((res: Funko[]) => {
            console.log('next !');
            this.funkoList.next(res);
            this.funkoList.complete();
            this.funkoFilter = Array.from(res);
        });
    }

    updateFunkoFilter(event) {
        this.funkoFilter = event;
    }
}

export interface Funko {
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
