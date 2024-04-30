import { Observable } from "rxjs";
import { map, filter } from "rxjs/operators";

let numbers = [1, 2, 3, 4, 5];

let source = new Observable((subscriber) => {
  let index = 0;
  function produceValue() {
    subscriber.next(numbers[index++]);

    if (index < numbers.length) {
      setTimeout(produceValue, 500);
    } else {
      subscriber.error("Erro esperado");
    }

    // subscriber.complete();
  }
  produceValue();
});

source.pipe(map((n: number) => n * 2)).subscribe({
  next: (number: number) => console.log(`X - Result: ${number}`),
  error: (error: Error) => console.error(error),
  complete: () => console.log("Completed"),
});

source.pipe(filter((n: number) => n > 2)).subscribe({
  next: (number: number) => console.log(`Y - Result: ${number}`),
  error: (error: Error) => console.error(error),
  complete: () => console.log("Completed"),
});
