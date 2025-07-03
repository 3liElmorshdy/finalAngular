import { Component, input, inject } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { WatchlistService } from '../../services/watchlist-service';
import { RouterModule } from '@angular/router';
import { Movie as MovieModel } from '../../models/movie.model';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, DatePipe, DecimalPipe, RouterModule], 
  templateUrl: './movie.html',
  styleUrl: './movie.scss',
})
export class Movie {
  readonly movie = input<MovieModel>();
  watchlistService = inject(WatchlistService);

  faHeart = faHeartRegular;
  faHeartSolid = faHeartSolid;

  public badMovieIds = [1407861, 1234821, 1137350, 1426776, 568770, 541671, 1450599, 1239193, 757725,
    1097311, 1477114, 1476292, 1397832, 1428264, 1136867, 1001414, 1318856,
    1059128, 101, 1078600, 9603, 1112466, 4348, 194, 1018, 539, 9919, 1485328,
    1461714, 1389255, 1000837, 959604, 793058, 1109255, 1155281, 1103857,
    901121, 10802, 2108, 1140847, 1064307, 845111, 933490, 1228681, 1275248,
    1124619, 164, 1415211, 1476450, 1327766, 1290182, 1128505, 927547, 845783,
    1018634, 11075,
  ];

  shouldHide(movie: MovieModel): boolean {
    return this.badMovieIds.includes(movie.id);
  }

  getSafeTitle(movie: MovieModel): string {
    return this.shouldHide(movie)
      ? '❗ Title hidden due to inappropriate images or movie name 🚫⛔'
      : movie.title;
  }

  toggleWatchlist() {
    const m = this.movie();
    if (m) {
      this.watchlistService.toggle(m);
    }
  }

  isFav(): boolean {
    const m = this.movie();
    return m ? this.watchlistService.isInWatchlist(m.id) : false;
  }
}
