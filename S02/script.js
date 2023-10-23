"use strict";

let students = {};

let state = confirm("Do you have student to add ?");

let studentID = 1;

while (state) 
{
    let Fname = prompt("Student first name")
    let Lname =  prompt("Student last name");

    students[studentID] = 
    { 
        "name" : Fname,
        "Family" : Lname
    };

    studentID++;

    state = confirm("Is there anymore ?");
}

console.log (students);
