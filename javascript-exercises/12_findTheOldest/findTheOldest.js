const findTheOldest = function(people) {
    const CURRENT_YEAR = new Date().getFullYear();
    people.forEach(element => {
        if (!element.yearOfDeath) element.yearOfDeath = CURRENT_YEAR;
    });
    return people.reduce((oldPerson, person) => 
        oldPerson.yearOfDeath - oldPerson.yearOfBirth < person.yearOfDeath - person.yearOfBirth ? person : oldPerson
    );
};

// Do not edit below this line
module.exports = findTheOldest;
