import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Funko } from '../app.component';
import { debounceTime } from 'rxjs/operators';
import { AsyncSubject } from 'rxjs';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    categories: string[];
    @Input()
    funkoList: AsyncSubject<Funko[]>;

    @Output()
    change: EventEmitter<Funko[]> = new EventEmitter<Funko[]>();

    searchForm = new FormGroup({
        searchModel: new FormControl(''),
        aModel: new FormControl('all'),
        cModel: new FormControl('')
    });
    constructor() {}

    ngOnInit() {
        this.funkoList.subscribe(fList => {
            this.categories = Object.keys(
                fList.reduce((cats, f) => {
                    console.log({ cats, f });
                    cats[f.category] = true;
                    return cats;
                }, {})
            ).sort();

            console.log(this.categories);
        });
        this.searchForm.valueChanges.subscribe(() => {
            this._filtering();
        });
    }

    private _filtering() {
        this.funkoList.subscribe(fList => {
            this.change.emit(
                fList
                    .filter(f => {
                        return this.searchForm.get('aModel').value === 'all' ? true : f[this.searchForm.get('aModel').value];
                    })
                    .filter(f => {
                        console.log({ cat: f.category, value: this.searchForm.get('cModel') });
                        console.log(f.category === this.searchForm.get('cModel').value);
                        return f.category === this.searchForm.get('cModel').value;
                    })
                    .filter(funko => {
                        const val = this.searchForm.get('searchModel').value;
                        return (
                            funko.name.toLowerCase().includes(val.toLowerCase()) ||
                            funko.category.toLowerCase().includes(val.toLowerCase()) ||
                            funko.collection.toLowerCase().includes(val.toLowerCase()) ||
                            funko.number.toLowerCase().includes(val.toLowerCase())
                        );
                    })
            );
        });
    }
}
