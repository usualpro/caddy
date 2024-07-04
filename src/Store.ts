import { create } from "zustand";
import { btf1Cover, btf2Cover, btf3Cover } from "./assets";

const B2FD_DVD_PRICE = 15;
const OTHER_DVD_PRICE = 20;
const B2FD_DOUBLE_REDUCTION_IN_PERCENT = 10;
const B2FD_TRIPLE_REDUCTION_IN_PERCENT = 20;

export const B2FTitle = `Back to the Future`;

export const B2FCatalog = [
  {
    name: `${B2FTitle} 1`,
    cover: btf1Cover,
  },
  {
    name: `${B2FTitle} 2`,
    cover: btf2Cover,
  },
  {
    name: `${B2FTitle} 3`,
    cover: btf3Cover,
  },
];

interface Store {
  movies: string[];
  checkout: () => {
    b2FMoviesPrice: number;
    currentReduction: number;
    otherMoviesPrice: number;
    totalWithoutReduction: number;
    totalB2FReduction: number;
    totalWithReduction: number;
  };
  updateMovies: (movies: string[]) => void;
  removeMovieByName: (name: string) => void;
  submitForm: (value: string) => void;
  isValidB2F: (name: string) => boolean;
}

export const useStore = create<Store>()((set, get) => ({
  movies: [],
  checkout: () => {
    const { movies } = get();
    const B2FMovies = movies.filter((e) => e.startsWith(B2FTitle));

    const b2FMoviesPrice = B2FMovies.length * B2FD_DVD_PRICE;

    const OtherMovies = movies.filter((e) => !e.startsWith(B2FTitle));

    const otherMoviesPrice = OtherMovies.length * OTHER_DVD_PRICE;

    const uniqB2FFilms = [...new Set(B2FMovies)];
    const currentReduction =
      uniqB2FFilms.length === 2
        ? B2FD_DOUBLE_REDUCTION_IN_PERCENT
        : uniqB2FFilms.length === 3
        ? B2FD_TRIPLE_REDUCTION_IN_PERCENT
        : 0;

    const totalB2FReduction = b2FMoviesPrice * (currentReduction / 100);

    const totalWithoutReduction = b2FMoviesPrice + otherMoviesPrice;

    const totalWithReduction = totalWithoutReduction - totalB2FReduction;

    return {
      b2FMoviesPrice,
      currentReduction,
      otherMoviesPrice,
      totalWithoutReduction,
      totalB2FReduction,
      totalWithReduction,
    };
  },
  removeMovieByName: (name) => {
    const { movies, updateMovies } = get();
    const indexToRemove = movies.findIndex((e) => e === `${name}`);
    const updatedMovies = [...movies].filter(
      (_item, index) => index !== indexToRemove
    );
    updateMovies([...updatedMovies]);
  },
  isValidB2F: (movie: string) => {
    return (
      movie.toUpperCase().startsWith(B2FTitle.toUpperCase()) &&
      Number(movie[movie.length - 1]) >= 1 &&
      Number(movie[movie.length - 1]) <= 3
    );
  },
  submitForm: (value) => {
    const { isValidB2F, updateMovies, movies } = get();
    const lineSeparatedValue = value.split("\n");
    if (value.includes("\n")) {
      const b2fInputMovies = lineSeparatedValue.filter((e) => isValidB2F(e));
      const otherInputMovies = lineSeparatedValue.filter(
        (e) => !isValidB2F(e) && e.length
      );
      if (b2fInputMovies.length) {
        updateMovies([...movies, ...b2fInputMovies, ...otherInputMovies]);
      }
    } else {
      updateMovies([...movies, value]);
    }
  },
  updateMovies: (movies) => set({ movies }),
}));
