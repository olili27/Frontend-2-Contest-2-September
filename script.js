let tableBody = document.getElementById("table-body");
let tableContainer = document.getElementById("table-container");

let searchBtn = document.getElementById("search-btn");
let searchInput = document.getElementById("search-input");

let sortByAZBtn = document.getElementById("sort-az");
let sortByZABtn = document.getElementById("sort-za");
let sortByPassingBtn = document.getElementById("sort-passing");
let sortByGenderBtn = document.getElementById("sort-gender");
let sortByClassBtn = document.getElementById("sort-class");
let sortByMarksBtn = document.getElementById("sort-marks");

async function fetchStudents() {
  let response = await fetch(
    "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json"
  );
  let students = await response.json();

  return students;
}

async function displayStudentInformation(students) {
  if (students == undefined) students = await fetchStudents();

  tableBody.innerHTML = "";
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
  });
}

displayStudentInformation();

async function searchStudents() {
  let students = await fetchStudents();
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

async function sortByAZ() {
  let students = await fetchStudents();
  students.sort((a, b) => {
    return a.first_name + " " + a.last_name > b.first_name + " " + b.last_name;
  });

  displayStudentInformation(students);
}

sortByAZBtn.addEventListener("click", sortByAZ);

async function sortByZA() {
  let students = await fetchStudents();
  students.sort((a, b) => {
    return a.first_name + " " + a.last_name < b.first_name + " " + b.last_name;
  });

  displayStudentInformation(students);
}

sortByZABtn.addEventListener("click", sortByZA);

async function sortByPassing() {
  let students = await fetchStudents();
  let passed = students.filter((student) => student.passing);

  displayStudentInformation(passed);
}

sortByPassingBtn.addEventListener("click", sortByPassing);

async function sortByMarks() {
  let students = await fetchStudents();
  students.sort((a, b) => {
    return a.marks > b.marks;
  });

  displayStudentInformation(students);
}

sortByMarksBtn.addEventListener("click", sortByMarks);

async function sortByClass() {
  let students = await fetchStudents();
  students.sort((a, b) => {
    return a.class > b.class;
  });

  displayStudentInformation(students);
}

sortByClassBtn.addEventListener("click", sortByClass);


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
    table.appendChild(tableBody)
  });

  tableContainer.append(table);
}

async function sortByGender() {
  let students = await fetchStudents();
  let females = students.filter(element => element.gender == "Female");
   let males = students.filter((element) => element.gender == "Male");

   tableContainer.innerHTML = "";

  displayStudentInformationByGender(females);
  displayStudentInformationByGender(males)
}

sortByGenderBtn.addEventListener('click', sortByGender);