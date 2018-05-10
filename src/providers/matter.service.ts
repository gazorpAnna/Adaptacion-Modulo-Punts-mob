import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilsService } from './utils.service';
import { AppConfig } from '../app/app.config';
import { Matter } from '../model/matter';

@Injectable()
export class MatterService {

  constructor(
    public http: Http,
    public utilsService: UtilsService) { }

  /**
   * Returns a matter object with all the information from a matter
   * identifier. This method is used to fill all the information
   * of the groups we are querying
   * @return {Matter} matter object with all the information
   */
  public getMatter(id: number): Observable<Matter> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    return this.http.get(AppConfig.MATTERS_URL + '/' + id, options)
      .map((response: Response, index: number) => Matter.toObject(response.json()))
  }

}
