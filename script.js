let tableBody = document.getElementById("table-body");
let tableContainer = document.getElementById("table-container");

let searchBtn = document.getElementById("search-btn");
let searchInput = document.getElementById("search-input");

let sortByAZBtn = document.getElementById("sort-az");
let sortByZABtn = document.getElementById("sort-za");
let sortByPassingGradeBtn = document.getElementById("sort-passing");
let sortByGenderBtn = document.getElementById("sort-gender");
let sortByClassBtn = document.getElementById("sort-class");
let sortByMarksBtn = document.getElementById("sort-marks");

let students;


// fetch students and store them

async function fetchStudents() {
  if (students === undefined) {
    let response = await fetch(
      "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json"
    );

    students = await response.json();
  }

  return students;
}


// render students information in a table

async function displayStudentInformation(students) {
  if (students == undefined) students = await fetchStudents();

  tableContainer.innerHTML = "";

  let table = document.createElement("table");
  let tableHead = document.createElement("thead");
  tableHead.innerHTML = `
        <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Class</th>
              <th>Marks</th>
              <th>Passing</th>
              <th>Email</th>
        </tr>
    `;

  table.appendChild(tableHead);

  let tableBody = document.createElement("tbody");

  students.forEach((element) => {
    let tableRow = document.createElement("tr");
    tableRow.innerHTML = `

              <td>${element.id}</td>
              <td>
               <div>
                 <img src=${element.img_src} alt="student image">
                <span>${element.first_name} ${element.last_name}</span>
               </div>
              </td>
              <td>${element.gender}</td>
              <td>${element.class}</td>
              <td>${element.marks}</td>
              <td>${element.passing ? "Passed" : "Failed"}</td>
              <td>${element.email}</td>
        `;

    tableBody.appendChild(tableRow);
    table.appendChild(tableBody);
  });

  tableContainer.append(table);
}

displayStudentInformation();

// search by firstName, lastName, or email -> not case sensitive
function searchStudents() {
  let searchValue = searchInput.value.toLowerCase();
  searchInput.value = "";

  let searchResults = students.filter(
    (element) =>
      element.first_name.toLowerCase().includes(searchValue) ||
      element.last_name.toLowerCase().includes(searchValue) ||
      element.email.toLowerCase().includes(searchValue)
  );

  displayStudentInformation(searchResults);
}

searchBtn.addEventListener("click", searchStudents);

// generic function to sort by AZ or ZA
function sortByAZ_Or_ZA(flag) {

  if(flag === "AZ") {
    students.sort((a, b) => {
      return (
        a.first_name + " " + a.last_name > b.first_name + " " + b.last_name
      );
    });
  } else if(flag === "ZA") {
     students.sort((a, b) => {
       return (
         a.first_name + " " + a.last_name < b.first_name + " " + b.last_name
       );
     });
  }

  displayStudentInformation(students);
}

// sort by AZ
sortByAZBtn.addEventListener("click", () => {
  sortByAZ_Or_ZA("AZ");
})

// sort by ZA
sortByZABtn.addEventListener("click", () => {
  sortByAZ_Or_ZA("ZA");
})

// generic function to sort by marks or class
function sortByMarks_Or_Class(flag) {
   students.sort((a, b) => {
     return a[flag] > b[flag];
   });

   displayStudentInformation(students);
}

// sort by marks
sortByMarksBtn.addEventListener("click", () => {
  sortByMarks_Or_Class("marks");
});

// sort by class
sortByClassBtn.addEventListener("click", () => {
  sortByMarks_Or_Class("class");
});

// sort by passing grade
function sortByPassingGrade() {
  let passed = students.filter((student) => student.passing);

  displayStudentInformation(passed);
}

sortByPassingGradeBtn.addEventListener("click", sortByPassingGrade);

// function to display information after sorting students by gender
function displayStudentInformationByGender(students) {
  let table = document.createElement("table");
  let tableHead = document.createElement("thead");
  tableHead.innerHTML = `
        <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Class</th>
              <th>Marks</th>
              <th>Passing</th>
              <th>Email</th>
        </tr>
    `;

  table.appendChild(tableHead);

  let tableBody = document.createElement("tbody");

  students.forEach((element) => {
    let tableRow = document.createElement("tr");
    tableRow.innerHTML = `

              <td>${element.id}</td>
              <td>
               <div>
                 <img src=${element.img_src} alt="student image">
                <span>${element.first_name} ${element.last_name}</span>
               </div>
              </td>
              <td>${element.gender}</td>
              <td>${element.class}</td>
              <td>${element.marks}</td>
              <td>${element.passing ? "Passed" : "Failed"}</td>
              <td>${element.email}</td>
        `;

    tableBody.appendChild(tableRow);
    table.appendChild(tableBody);
  });

  tableContainer.append(table);
}

// sort and display the males and females
function sortByGender() {
  let females = students.filter((element) => element.gender == "Female");
  let males = students.filter((element) => element.gender == "Male");

  tableContainer.innerHTML = "";

  displayStudentInformationByGender(females);
  displayStudentInformationByGender(males);
}

sortByGenderBtn.addEventListener("click", sortByGender);
