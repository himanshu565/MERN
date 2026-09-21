// For your daily-task chat going forward, Day 2 is:

// Prototypal inheritance — Object.create, prototype chain, class as sugar over prototypes
// Exercise: implement a simple inheritance chain without class, using Object.create directly
// Interview Q: "explain what class actually compiles down to"

let genericCar = { type: "Petrol" };
let Tesla = { Driver: "AI" };

// Object.create: NEW object, prototype = genericCar
let myCar = Object.create(genericCar);
console.log(myCar.type); // "Petrol" — found via the prototype chain, not an own property

// setPrototypeOf: mutates Tesla directly, prototype = genericCar
Object.setPrototypeOf(Tesla, genericCar);
console.log(Tesla.type); // "Petrol" — now found via Tesla's own new prototype link

// proof it's a real chain, not a copy:
console.log(Object.getPrototypeOf(myCar) === genericCar); // true
console.log(myCar.hasOwnProperty('type')); // false — it's inherited, not own


let animal = {
    speak(){
    console.log(`${this.name} makes a sound`);
    
    }
}
let dog = Object.create(animal);
dog.name = "shubham";
dog.speak()
// this = dog. dog has no own `speak` → walks to animal.speak → finds it.
// this.name = dog.name = "shubham" → "shubham makes a sound"
animal.name = 'generic';
animal.speak()
// this = animal. animal has own `speak` (original) and own `name` = "generic"
// → "generic makes a sound"
dog.speak = function(){
    console.log(`${this.name} barks`)
}
animal.speak = function(){
    console.log("NEW BASE BEHAVIOR");
}
dog.speak();    
// this = dog. dog NOW has its own `speak` (just assigned) → own-property check stops there
// this.name = dog.name = "shubham" (never changed) → "shubham barks"