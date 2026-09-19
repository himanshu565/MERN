function createCounter(dsadasdasdasdasdasdhakshdkashdkhaskdhask) {
  let count = 0;

  return {
    increment() {
      count += 1;
      return count;
    },
    decrement() {
      count -= 1;
      return count;
    },
    reset() {
      count = 0;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount());  // 1
console.log(counter.reset());     // 0
console.log(counter.count);       // undefined — private, not reachable
console.log(count);                // ReferenceError — this is the point

// second questions 

function createStack() {
  let items = [];

  return {
    push(item) {
      items.push(item);
    },
    pop() {
      return items.pop();
    },
    peek() {
    let result = items[items.length -1];
    return result;
    },
    size() {
      return items.length;
    },
    isEmpty() {
      return items.length === 0;

    }
  };
}
const stack = createStack();
console.log(stack.isEmpty());  // true
stack.push(1);
stack.push(2);
console.log(stack.peek());     // 2
console.log(stack.size());     // 2
console.log(stack.pop());      // 2
console.log(stack.pop());      // 1
console.log(stack.pop());      // undefined
console.log(stack.items);      // undefined


// Question 1 — microtask ordering under await
async function a() {
  console.log("a-start");
  await b();
  console.log("a-end");
}

async function b() {
  console.log("b-start");
  await null;
  console.log("b-end");
}

console.log("script-start");
a();
Promise.resolve().then(() => console.log("promise-then"));
console.log("script-end");

// Final: script-start, a-start, b-start, script-end, b-end, promise-then, a-end
// The general rule

// Awaiting an async function costs an extra tick compared to awaiting a plain value. await null resumes on the next microtask; await someAsyncFn() has to wait for that function's own promise chain to settle first. That's the whole reason a-end lands last.

// Question 2 — the classic loop trap, async edition
for (var i = 0; i < 3; i++) {
  Promise.resolve().then(() => console.log("promise", i));
  setTimeout(() => console.log("timeout", i), 0);
}

for (let j = 0; j < 3; j++) {
  Promise.resolve().then(() => console.log("promise-let", j));
}
// Correct: promise 3, promise 3, promise 3, promise-let 0, promise-let 1, promise-let 2, timeout 3, timeout 3, timeout 3

// Question 3 — starvation
console.log("start");

setTimeout(() => console.log("timeout"), 0);

function recurse(n) {
  if (n === 0) return;
  Promise.resolve().then(() => {
    console.log("micro", n);
    recurse(n - 1);
  });
}
recurse(3);

console.log("end");
// Correct: start, end, micro 3, micro 2, micro 1, timeout


// Q5 mybind theory

Function.prototype.myBind = function (context, ...boundArgs) {
  const originalFn = this;

  return function (...callArgs) {
    return originalFn.apply(context, [...boundArgs, ...callArgs]);
  };
};
//The pattern to remember for both .call() and .apply(): first argument is always this. Everything else is the actual arguments to the function, either listed individually (.call) or as one array (.apply). You had the right instinct to use these methods, just swapped what goes in the first slot.