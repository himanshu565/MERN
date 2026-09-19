
Day 1 — closed
Task	Status
createCounter	✅ (took 3 rounds — the "return the buttons, don't press them" gap)
createStack	✅ (clean on the final attempt)
myBind	✅ (.call/.apply first-arg rule now understood)
Event loop Q1–Q3	✅ all three, with correct reasoning on the second pass

The thread through today, worth naming explicitly: every real bug came from executing something you should have deferred — pressing the vending machine's buttons instead of installing them, running .then()'s callback in your head instead of just scheduling it, calling .apply() with the wrong first argument instead of pausing to check what that slot means. Once you started tracing line-by-line instead of pattern-matching syntax, the error rate dropped fast — createStack and the last myBind attempt were clean or near-clean. That's the actual skill this week is building, more than any individual concept.
** the important thing was that for counter was dont call the fn when u want to return them likee dont use duke(), and do remember to return something or o/p for any function.


The pattern to remember for both .call() and .apply(): first argument is always this. Everything else is the actual arguments to the function, either listed individually (.call) or as one array (.apply)

Mistakes made and corrected (the real learning, not just the final code):

Confused defining a reusable function (push(item) { ... }) with calling one immediately (items.push("duke")) — caused wrong output on both createCounter and createStack first attempts
Used post-increment (count++) where the returned value needed to reflect the new state, not the old one
Used the comma operator (return a(), b(), c()) thinking it returns multiple values — it executes all three and returns only the last
On .call()/.apply(): forgot the first argument is always this — passed argument arrays into the this slot instead
Tried merging two arrays with + (string-concatenates them) instead of spread ([...a, ...b])
console.log() inside a function does not return a value — assigning its result gives undefined
Missed that .then() callbacks and recursive promise chains never run synchronously, only ever scheduled