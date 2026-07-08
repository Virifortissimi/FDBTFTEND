import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of, tap } from 'rxjs';
import { ClientCacheService } from './client-cache.service';

export interface GlossaryTerm {
    id: string;
    term: string;
    slug: string;
    definition: string;
    whyItMatters: string;
    foodBotTip: string;
}

@Injectable({
    providedIn: 'root'
})
export class GlossaryService {
    private apiUrl = `${environment.apiUrl}/glossary`;
    private readonly termsCacheKey = 'glossary.terms';
    private readonly termCachePrefix = 'glossary.term';
    private readonly cacheTtlMs = 6 * 60 * 60 * 1000;

    terms = signal<GlossaryTerm[]>([]);

    constructor(
        private http: HttpClient,
        private cache: ClientCacheService
    ) { }

    fetchTerms() {
        const cached = this.cache.get<GlossaryTerm[]>(this.termsCacheKey);
        if (cached?.data) {
            this.terms.set(cached.data);
        }

        this.http.get<GlossaryTerm[]>(this.apiUrl).subscribe({
            next: data => {
                const terms = this.normalizeTerms(data);
                this.terms.set(terms);
                this.cache.set(this.termsCacheKey, terms, this.cacheTtlMs);
            },
            error: () => {
                if (!cached?.data) {
                    this.terms.set([]);
                }
            }
        });
    }

    getTerm(slug: string): Observable<GlossaryTerm> {
        const cacheKey = `${this.termCachePrefix}.${slug}`;
        const cached = this.cache.getFresh<GlossaryTerm>(cacheKey);
        if (cached) {
            return of(cached);
        }

        return this.http.get<GlossaryTerm>(`${this.apiUrl}/${slug}`).pipe(
            tap(term => this.cache.set(cacheKey, term, this.cacheTtlMs))
        );
    }

    private normalizeTerms(data: any): GlossaryTerm[] {
        if (Array.isArray(data)) {
            return data;
        }

        if (Array.isArray(data?.data)) {
            return data.data;
        }

        return [];
    }
}
