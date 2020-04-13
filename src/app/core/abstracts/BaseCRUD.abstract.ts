import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { RepositoryService } from '../services/repository.service';

export abstract class BaseCRUD<T> {
    private repo: RepositoryService;

    basePath: string;

    constructor(
        injector: Injector,
        basePath: string
    ) {
        this.repo = injector.get(RepositoryService);
        this.basePath = basePath;
    }

    fetchAll(): Observable<Array<T>> {
        return this.repo.get<Array<T>>(this.basePath);
    }

    fetchById(id: number): Observable<T> {
        return this.repo.get<T>(`${this.basePath}/${id}`);
    }

    save(item: T): Observable<T> {
        return this.repo.post<T>(this.basePath, item);
    }

    update(id: number, item: T): Observable<T> {
        return this.repo.put<T>(`${this.basePath}/${id}`, item);
    }

    delete(id: number): Observable<T> {
        return this.repo.delete(`${this.basePath}/${id}`);
    }
}
