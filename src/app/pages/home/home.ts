import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Movies } from '../../components/movies/movies';
import { NowPlayingMoviesService } from '../../services/movies-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FontAwesomeModule, Movies, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  faStar = faStar;
  faPlay = faPlay;
  faPlus = faPlus;

  searchTerm = '';
  private moviesService = inject(NowPlayingMoviesService);

  onSearch(event: Event) {
    event.preventDefault();
    this.moviesService.searchMovies(this.searchTerm, this.moviesService.language());
  }
}
