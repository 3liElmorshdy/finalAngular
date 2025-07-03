import { Component, inject } from '@angular/core';
import { NowPlayingMoviesService } from '../../services/movies-service';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Movie } from '../movie/movie';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, Movie],
  templateUrl: './movies.html',
  styleUrl: './movies.scss'
})
export class Movies {
  private moviesService = inject(NowPlayingMoviesService);

  movies = this.moviesService.nowPlaying;
  page = this.moviesService.currentPage;
  totalPages = this.moviesService.totalPages;
  loading = this.moviesService.loading;
  error = this.moviesService.error;
  language = this.moviesService.language;

  goToPage(page: number) {
    this.moviesService.goToPage(page);
  }
  setLanguage(lang: string) {
    this.moviesService.setLanguage(lang);
  }
}
