import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {City} from '@classes/City';
import {Forecast, ForecastApiResponse} from '@classes/Forecast';
import {map} from 'rxjs/operators';

@Injectable()
export class ForecastsService {
    
    private api = `http://api.openweathermap.org/data/2.5`;
    
    constructor(private http: HttpClient) {
    }
    
    getForecasts(cities: City[]): Observable<Forecast[]> {
        return this.http.get<ForecastApiResponse>(`${this.api}/group?id=${cities.map(x => x.id).join(',')}&units=metric`)
            .pipe(map(x => x.list));
    }
    
    getForecastById(id: number): Observable<ForecastApiResponse> {
        return this.http.get<ForecastApiResponse>(`${this.api}/forecast?id=${id}&units=metric`);
    }
}
