import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  public accountId$: Observable<number>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.accountId$ = this.route.paramMap.pipe(
      map((params: ParamMap) =>
        (+params.get('id')))
    );
  }

}
