const inquirer = require("inquirer");
const cheerio = require("cheerio");
const fs = require("fs");
const Employee = require("./lib/Employee");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");

let teamArr = [];

function startApp() {
    inquirer
        .prompt([
            {
                name: "managersName",
                type: "input",
                message: "Managers name:",
            },
            {
                name: "EmployeeId",
                type: "number",
                message: "Employee ID?",
            },
            {
                name: "emailAddress",
                type: "input",
                message: "Email address?",
            },
            {
                name: "officeNumber",
                type: "number",
                message: "Office number?",
            },
            {
                name: "menu",
                type: "list",
                message: "Great!",
                choices: ["Add Engineer", "Add Intern", "Finish building team"],
            },
        ])
        .then((answers) => {
            // save manager
            const newManager = new Manager(answers.managersName, answers.EmployeeId, answers.emailAddress, answers.officeNumber);
            teamArr.push(newManager);
            // if user selected add engineer, call the add engineer function
            if (answers.menu === "Add Engineer") {
                addEngineer();
            } else if (answers.menu === "Add Intern") {
                addIntern();
            } else {
                // generate html file
                generateTeamFile();
                console.log("your team has been created!!!");
            }
        });
}

function addEngineer() {
    inquirer
        .prompt([
            {
                name: "engineerName",
                type: "input",
                message: "Engineers name:",
            },
            {
                name: "EmployeeId",
                type: "number",
                message: "Employee ID?",
            },
            {
                name: "emailAddress",
                type: "input",
                message: "Email address?",
            },
            {
                name: "githubUsername",
                type: "input",
                message: "Github username:",
            },
            {
                name: "menu",
                type: "list",
                message: "Great!",
                choices: ["Add Engineer", "Add Intern", "Finish building team"],
            },
        ])
        .then((answers) => {
            // save engineer
            const newEngineer = new Engineer(answers.engineerName, answers.EmployeeId, answers.emailAddress, answers.githubUsername);
            teamArr.push(newEngineer);
            // if user selected add engineer, call the add engineer function
            if (answers.menu === "Add Engineer") {
                addEngineer();
            } else if (answers.menu === "Add Intern") {
                addIntern();
            } else {
                // generate html file
                generateTeamFile();
                console.log("your team has been created!!!");
            }
        });
}

function addIntern() {
    inquirer
        .prompt([
            {
                name: "internName",
                type: "input",
                message: "Interns name:",
            },
            {
                name: "EmployeeId",
                type: "number",
                message: "Employee ID?",
            },
            {
                name: "emailAddress",
                type: "input",
                message: "Email address?",
            },
            {
                name: "schoolName",
                type: "input",
                message: "School name:",
            },
            {
                name: "menu",
                type: "list",
                message: "Great!",
                choices: ["Add Engineer", "Add Intern", "Finish building team"],
            },
        ])
        .then((answers) => {
            // save engineer
            const newIntern = new Intern(answers.internName, answers.EmployeeId, answers.emailAddress, answers.schoolName);
            teamArr.push(newIntern);
            // if user selected add engineer, call the add engineer function
            if (answers.menu === "Add Engineer") {
                addEngineer();
            } else if (answers.menu === "Add Intern") {
                addIntern();
            } else {
                // generate html file
                generateTeamFile();
                console.log("your team has been created!!!");
            }
        });
}

function generateTeamFile() {
    let template = fs.readFileSync("./dist/template.html", "utf8", function(error) {
        if (error) 
            console.log(error);
    });

    const $ = cheerio.load(template);

    teamArr.forEach(employee => {
        let empCard;
        let role = employee.getRole();

        if (role === "Manager") {
            empCard = generateManagerCard(employee.name, employee.id, employee.email, employee.officeNumber);
        } else if (role === "Intern") {
            empCard = generateInternCard(employee.name, employee.id, employee.email, employee.school);
        } else if (role === "Engineer") {
            empCard = generateEngineerCard(employee.name, employee.id, employee.email, employee.github)
        }
        $("#employeeCards").append(empCard);
    });

    fs.writeFile("./team_output.html", $.html(), function(error){
        if (error)
            console.log(error);
    });
}

function generateManagerCard(name, id, email, officeNumber) {
    return `<div class="card m-2" style="width: 18rem;">
    <div class="card-body bg-primary text-white">
      <h5 class="card-title">${name}</h5>
      <h5 class="card-title">Manager</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Id: ${id}</li>
      <li class="list-group-item">Email: <a href="mailto:${email}" class="card-link">${email}</a></li>
      <li class="list-group-item">RoomNumber: ${officeNumber}</li>
    </ul>
    </div>`
}

function generateInternCard(name, id, email, school) {
    return `<div class="card m-2" style="width: 18rem;">
    <div class="card-body bg-primary text-white">
      <h5 class="card-title">${name}</h5>
      <h5 class="card-title">Intern</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Id: ${id}</li>
      <li class="list-group-item">Email: <a href="mailto:${email}" class="card-link">${email}</a></li>
      <li class="list-group-item">School: ${school}</li>
    </ul>
    </div>`
}

function generateEngineerCard(name, id, email, github) {
    return `<div class="card m-2" style="width: 18rem;">
    <div class="card-body bg-primary text-white">
      <h5 class="card-title">${name}</h5>
      <h5 class="card-title">Engineer</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Id: ${id}</li>
      <li class="list-group-item">Email: <a href="mailto:${email}" class="card-link">${email}</a></li>
      <li class="list-group-item">Github: <a href="https://github.com/${github}" class="card-link">${github}</a></li>
    </ul>
    </div>`
}

startApp();