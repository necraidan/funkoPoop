import { Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatToolbar } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { AsyncSubject } from 'rxjs';
import { Funko } from '../app.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('extendForm')
  extendForm: MatToolbar;

  owned: number;
  categories: string[];
  collections: string[];

  @Input()
  funkoList$: AsyncSubject<Funko[]>;

  @Output()
  change: EventEmitter<Funko[]> = new EventEmitter<Funko[]>();

  searchForm = new FormGroup({
    query: new FormControl(''),
    radioModel: new FormControl('all'),
    categorieModel: new FormControl('All'),
    collectionModel: new FormControl('All')
  });
  constructor(private _renderer: Renderer2, private _activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.funkoList$.subscribe(fList => {
      this.owned = fList.filter(elt => elt.owned).length;
      this.categories = Object.keys(
        fList.reduce((cats, f) => {
          cats[f.category] = true;
          return cats;
        }, {})
      ).sort();

      this.collections = Object.keys(
        fList.reduce((coll, f) => {
          coll[f.collection] = true;
          return coll;
        }, {})
      ).sort();

      this.categories.unshift('All');
      this.collections.unshift('All');
    });

    this.searchForm.valueChanges.subscribe(values => {
      this.pushState(values);

      setTimeout(() => {
        this.filtering();
      }, 0);
    });

    this._activatedRoute.queryParams.subscribe((params: Params) => {
      // tslint:disable-next-line:no-unused-expression
      params.query && this.searchForm.patchValue(params);
    });
  }

  resetForm() {
    this.searchForm.patchValue({ radioModel: 'all', categorieModel: 'All', collectionModel: 'All' });
  }

  toggleExtendForm() {
    if (this.extendForm._elementRef.nativeElement.classList.contains('open')) {
      this._renderer.removeClass(this.extendForm._elementRef.nativeElement, 'open');
    } else {
      this._renderer.addClass(this.extendForm._elementRef.nativeElement, 'open');
    }
  }

  private filtering() {
    this.funkoList$.subscribe(fList => {
      this.change.emit(
        fList
          .filter(f => {
            return this.searchForm.get('radioModel').value === 'all' ? true : f[this.searchForm.get('radioModel').value];
          })
          .filter(f => {
            return this.searchForm.get('categorieModel').value === 'All'
              ? true
              : f.category === this.searchForm.get('categorieModel').value;
          })
          .filter(f => {
            return this.searchForm.get('collectionModel').value === 'All'
              ? true
              : f.collection === this.searchForm.get('collectionModel').value;
          })
          .filter(funko => {
            const val = this.searchForm.get('query').value;
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

  private pushState(arg) {
    return arg.query
      ? window.history.pushState(undefined, 'query', 'search?query=' + arg.query)
      : window.history.pushState(undefined, 'query', '');
  }
}
