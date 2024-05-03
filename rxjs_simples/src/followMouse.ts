import { fromEvent } from "rxjs";
import { map, filter, delay } from "rxjs/operators";

interface mouseTrack {
  x: number;
  y: number;
}

let circle = document.getElementById("circle");
let source = fromEvent(document, "mousemove").pipe(
  map((event: MouseEvent) => {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }),
  filter((value: mouseTrack) => value.x < 500),
  delay(1500)
);

function onNext(value: mouseTrack) {
  circle.style.left = value.x + "px";
  circle.style.top = value.y + "px";
}

source.subscribe({
  next: (value: mouseTrack) => onNext(value),
  error: () => console.log(),
  complete: () => console.log(),
});
