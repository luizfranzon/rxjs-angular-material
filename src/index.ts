import { from, Observable } from "rxjs"

let numbers = [1,2,3,4,5]
let source = from(numbers)

let sourceInstance = new Observable(subscriber => {
  for (let number of numbers) {
    if (number > 4) {
      subscriber.error("Erro foda")
    }

    subscriber.next(number)
  }
  subscriber.complete()
})

const myObserver = {
  next: (number: number) => console.log(number),
  error: (error: Error) => console.error(error),
  complete: () => console.log("Completed")
}

function component() {
  source.subscribe(myObserver)
  console.log("------------------------")
  sourceInstance.subscribe(myObserver)
}

component()