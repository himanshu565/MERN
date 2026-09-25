// Day 3 — Async patterns, for real this time (not just prediction)

// Topic: Promise chaining, Promise.all/Promise.race/Promise.allSettled, and converting callback-style code to promises (the "promisify" pattern) — plus a proper look at error propagation through async chains, since that's the part interviews probe hardest.

// Why it matters on the job: almost every real API call is one of these patterns — fetching multiple resources in parallel (Promise.all), fetching with a timeout race (Promise.race), or wrapping a legacy callback API. Getting error handling wrong here is the single most common source of "silent failure" bugs in production Node code.
// Common junior mistakes: using await inside a loop for independent async calls (accidentally serializing what should be parallel — a real performance bug, not just style); one .catch() swallowing errors from unrelated earlier .then()s; not knowing Promise.all rejects entirely if any promise rejects, versus allSettled which never rejects.
// Exercise: write a function that takes an array of 3 URLs (mock them with Promise.resolve/reject for now, no real fetch needed) and fetches all three in parallel, returning results even if one fails — this forces you to choose correctly between all and allSettled and defend the choice.
// Interview Qs: (1) What's the difference between Promise.all and Promise.allSettled, and when would you pick one over the other? (2) You have a for loop with await fetch(...) inside it — what's wrong, and how do you fix it? (3) Where does a .catch() placed at the end of a long .then() chain actually catch errors from — every step, or just some?
Common junior mistakes:

Assuming await pauses everything, not just the current async function
Not knowing that a .then() callback is a microtask, and microtasks drain fully before the next macrotask (e.g. setTimeout) runs
Wrapping something in async and thinking that alone makes it non-blocking

console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

async function foo() {
  console.log("4");
  await null;
  console.log("5");
}
foo();

console.log("6");