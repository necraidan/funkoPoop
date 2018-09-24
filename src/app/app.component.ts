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

    funkoList$: AsyncSubject<Funko[]> = new AsyncSubject<Funko[]>();
    funkoFilter: Funko[];

    constructor(private _http: HttpClient) {}

    ngOnInit(): void {
        this._http.get('assets/funko.json').subscribe((res: Funko[]) => {
            // tslint:disable:curly
            const resTri = res.sort((a, b) => {
                if (a.category > b.category) return 1;
                if (a.category < b.category) return -1;

                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;

                return 0;
            });
            // tslint:enable:curly
            this.funkoList$.next(resTri);
            this.funkoList$.complete();
            this.funkoFilter = Array.from(resTri);
        });
    }

    updateFunkoFilter(event) {
        // FIXME: Why do we have sometimes the change event rather same data ?
        if (Array.isArray(event)) {
            this.funkoFilter = event;
        }
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
