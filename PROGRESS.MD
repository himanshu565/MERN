
Day 1 — closed
Task	Status
createCounter	✅ (took 3 rounds — the "return the buttons, don't press them" gap)
createStack	✅ (clean on the final attempt)
myBind	✅ (.call/.apply first-arg rule now understood)
Event loop Q1–Q3	✅ all three, with correct reasoning on the second pass

The thread through today, worth naming explicitly: every real bug came from executing something you should have deferred — pressing the vending machine's buttons instead of installing them, running .then()'s callback in your head instead of just scheduling it, calling .apply() with the wrong first argument instead of pausing to check what that slot means. Once you started tracing line-by-line instead of pattern-matching syntax, the error rate dropped fast — createStack and the last myBind attempt were clean or near-clean. That's the actual skill this week is building, more than any individual concept.
** the important thing was that for counter was dont call the fn when u want to return them likee dont use duke(), and do remember to return something or o/p for any function.


The pattern to remember for both .call() and .apply(): first argument is always this. Everything else is the actual arguments to the function, either listed individually (.call) or as one array (.apply)
but for .Bind() takes this as its first arg too but doesn't invoke — it returns a new function with this locked in.
.call/.apply = invoke now with this this; .bind = hand back a version that will always use this this.

Mistakes made and corrected (the real learning, not just the final code):

Confused defining a reusable function (push(item) { ... }) with calling one immediately (items.push("duke")) — caused wrong output on both createCounter and createStack first attempts
Used post-increment (count++) where the returned value needed to reflect the new state, not the old one
Used the comma operator (return a(), b(), c()) thinking it returns multiple values — it executes all three and returns only the last
On .call()/.apply(): forgot the first argument is always this — passed argument arrays into the this slot instead
Tried merging two arrays with + (string-concatenates them) instead of spread ([...a, ...b])
console.log() inside a function does not return a value — assigning its result gives undefined
Missed that .then() callbacks and recursive promise chains never run synchronously, only ever scheduled

// For your daily-task chat going forward, Day 2 is:

// Prototypal inheritance — Object.create, prototype chain, class as sugar over prototypes
// Exercise: implement a simple inheritance chain without class, using Object.create directly
// Interview Q: "explain what class actually compiles down to"


Day 2 — closed
Task                          Status
Object.create linking         ✅ (correct on 2nd attempt — first pass discarded the return value of Object.create entirely)
this resolution at call site  ✅ (mislabeled as "binding" first pass — corrected before it calcified, given .bind() is coming up)
speak override + shadowing    ✅ clean, predicted output correctly across 3 separate call-site traces
hasOwnProperty / getPrototypeOf proof  ✅ (answers correct both times, but reasoning for hasOwnProperty was initially backwards — said it "checks the prototype," corrected to "refuses to walk the chain, checks only the object itself")
class → prototype interview Q  ✅ in progress — 3 attempts: first was a generic OOP-textbook definition with no mechanism, second named "prototypes" but stayed at buzzword level, third (walked through Dog.prototype / new / [[Prototype]] linking) landed correctly. Currently mid-application question testing whether the model actually transfers to a fresh example (Cat, shared method, does overriding on one instance affect the other).

The thread through today: same failure mode as Day 1, new context. Day 1 was "calling instead of returning/deferring." Today it was "describing instead of tracing" — jumping to a label (binding, OOP definition, "it's prototypes") before walking the actual mechanism step by step. Every time the trace was forced line-by-line (own-property check → chain walk → this at call site), the answer came out right. The gap isn't conceptual anymore on Object.create/this — it's now specifically the class-to-prototype translation, and whether that transfers to a new example without prompting.

Open thread carried into Day 3: finish the Cat/shared-method application question (does overriding one instance's method affect the other — this is the shadowing concept from earlier in the day, applied to class instead of Object.create). If that lands clean, class is done. If not, more reps needed before moving on.
