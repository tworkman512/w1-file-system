const fs = require("fs");
const path = require("path");
const petsFile = path.join(__dirname, "data", "pets.json");
const contents = fs.readFileSync(petsFile, "utf-8");
const pets = JSON.parse(contents);

// Utility pet checker
const runPetSearch = name => {
  let isPetRecord = pets.some(record => record.name === name);
  // This console.log is for testing only
  console.log(`Does pet ${name} exist?`, isPetRecord);
  return isPetRecord;
};

// Read contents
const read = () => {
  return pets;
};

// Write to contents
const create = (name, kind, age) => {
  const newPetRecord = {
    name,
    kind,
    age
  };

  if (!runPetSearch(name)) {
    pets.push(newPetRecord);
    const petString = JSON.stringify(pets);
    fs.writeFileSync(petsFile, petString);
    return read();
  }
  return `${name} is already a pet!`;
};

const remove = name => {
  let petToRemove = pets.filter(pet => pet.name === name);
  // This console.log is for testing only
  console.log(`### the pet name to be removed is ${name}`, petToRemove);
  if (runPetSearch(name)) {
    const removePetNameFromList = pets.filter(pet => pet.name !== name);
    const petString = JSON.stringify(removePetNameFromList);
    fs.writeFileSync(petsFile, petString);
  }
  return `No pet found by the name of ${name}`;
};

console.log(read());
// [ { name: 'Meowser', kind: 'cat', age: 3 } ]

console.log(create("Duchess", "bird", 2));
// [
//   { name: 'Meowser', kind: 'cat', age: 3 },
//   { name: 'Duchess', kind: 'bird', age: 2 }
// ]

console.log(create("Duchess", "bird", 2));
// "Duchess" is already a pet!

console.log(remove("Snoopy"));
// No pet found by the name of "Snoopy"

console.log(remove("Duchess"));
// { name: 'Duchess', kind: 'bird', age: 2 }

console.log(read());
// My result is logging out the 'Duchess' record still even though I've removed it from the JSON???
// [ { name: 'Meowser', kind: 'cat', age: 3 } ]

// console.log(update("Duchess", "bird", 3));
// // No pet found by the name of "Duchess"

// console.log(update("Meowser", "cat", 4));
// // { name: 'Meowser', kind: 'cat', age: 4 }

// console.log(read());
// // [ { name: 'Meowser', kind: 'cat', age: 4 } ]

// console.log(update("Meowser", "cat", 3));
// // { name: 'Meowser', kind: 'cat', age: 3 }
