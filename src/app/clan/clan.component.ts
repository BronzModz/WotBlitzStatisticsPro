import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-clan',
  templateUrl: './clan.component.html',
  styleUrls: ['./clan.component.scss']
})
export class ClanComponent implements OnInit {
  public clanId$: Observable<number>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.clanId$ = this.route.paramMap.pipe(
      map((params: ParamMap) =>
        (+params.get('id')))
    );
  }

}
