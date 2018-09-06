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
    @Input()
    funkoList: AsyncSubject<Funko[]>;

    @Output()
    change: EventEmitter<Funko[]> = new EventEmitter<Funko[]>();

    searchForm = new FormGroup({
        searchModel: new FormControl('')
    });
    constructor() {}

    ngOnInit() {
        this.searchForm
            .get('searchModel')
            .valueChanges.pipe(debounceTime(250))
            .subscribe((val: string) => {
                this.funkoList.subscribe(fList => {
                    this.change.emit(
                        fList.filter(funko => {
                            return (
                                funko.name.toLowerCase().includes(val.toLowerCase()) ||
                                funko.category.toLowerCase().includes(val.toLowerCase()) ||
                                funko.collection.toLowerCase().includes(val.toLowerCase()) ||
                                funko.number.toLowerCase().includes(val.toLowerCase())
                            );
                        })
                    );
                });
            });
    }
}
