// src/app/services/movie.service.ts
import { Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.model';

@Injectable({ providedIn: 'root' })
export class NowPlayingMoviesService {
  private apiKey = 'cc687401dafd56a04490baaaa29e1329';
  private baseUrl = 'https://api.themoviedb.org/3/movie/now_playing';

  private nowPlayingSignal = signal<Movie[]>([]);
  private currentPageSignal = signal(1);
  private totalPagesSignal = signal(1);
  private loadingSignal = signal(false);
  private errorSignal = signal<string | null>(null);
  private languageSignal = signal('en');
  private searchModeSignal = signal(false);

  constructor(private http: HttpClient) {
    effect(() => {
      this.fetchNowPlaying(this.currentPageSignal(), this.languageSignal());
    });
  }

  get nowPlaying() {
    return this.nowPlayingSignal;
  }

  get currentPage() {
    return this.currentPageSignal;
  }

  get totalPages() {
    return this.totalPagesSignal;
  }

  get loading() {
    return this.loadingSignal;
  }

  get error() {
    return this.errorSignal;
  }

  get language() {
    return this.languageSignal;
  }

  get searchMode() {
    return this.searchModeSignal;
  }

  goToPage(page: number) {
    this.currentPageSignal.set(page);
  }

  setLanguage(lang: string) {
    this.languageSignal.set(lang);
  }

  searchMovies(query: string, language: string) {
    if (!query.trim()) {
      this.searchModeSignal.set(false);
      this.fetchNowPlaying(this.currentPageSignal(), language);
      return;
    }
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.searchModeSignal.set(true);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&language=${language}`;
    this.http.get<any>(url).subscribe({
      next: res => {
        this.nowPlayingSignal.set(res.results);
        this.totalPagesSignal.set(Math.min(res.total_pages, 6));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set('Failed to search movies. Please try again.');
        this.loadingSignal.set(false);
      }
    });
  }

  private fetchNowPlaying(page: number, language: string) {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    const url = `${this.baseUrl}?api_key=${this.apiKey}&page=${page}&language=${language}`;
    this.http.get<any>(url).subscribe({
      next: res => {
        this.nowPlayingSignal.set(res.results);
        this.totalPagesSignal.set(Math.min(res.total_pages, 6));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set('Failed to load movies. Please try again.');
        this.loadingSignal.set(false);
      }
    });
  }
}
