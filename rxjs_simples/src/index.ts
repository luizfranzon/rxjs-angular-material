import { fromEvent, Observable } from "rxjs";
import { map, filter, switchMap } from "rxjs/operators";

interface IMovie {
  title: string;
}

const button = document.getElementById("button");
const output = document.getElementById("output");

let click = fromEvent(button, "click");

function load(url: string): Observable<any> {
  return new Observable((subscriber) => {
    output.innerHTML = "";
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      let data = JSON.parse(xhr.responseText);

      subscriber.next(data);
      subscriber.complete();
    });

    xhr.open("GET", url);
    xhr.send();
  });
}

function renderMovie(movies: IMovie[]) {
  movies.forEach((movie: IMovie) => {
    let div = document.createElement("div");
    div.innerText = movie.title;
    output.appendChild(div);
  });
}

click.pipe(switchMap(() => load("../movies.json"))).subscribe({
  next: renderMovie,
  error: (error: Error) => console.error(error),
  complete: () => console.log("Completed"),
});
