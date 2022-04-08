// specifying a type object. 
// let person: {
//     name: string;
//     age: number;
//     hobbies: string[]; //Array of strings
//     role: [number, string]; //Tuple (Array with a fixed length and types)
// } = {
//     name: 'Manuel',
//     age: 26,
//     hobbies: ['Read', 'Hang out'],
//     role:[1,'admin']
// }

// Without specific a type of type assignment.
// const person = {
//     name: 'Manuel',
//     age:26
// }

enum Role {ADMIN='ADMIN', READ_ONLY='READ_ONLY', AUTHOR='AUTHOR'};

let person={
    name: 'Manuel',
    age: 26,
    hobbies: ['Read', 'Hang out'],
    role:Role.ADMIN
}

console.log(person)

for (const hobby of person.hobbies) {
    console.log(hobby);
}