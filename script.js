let tableBody = document.getElementById("table-body");
let searchBtn = document.getElementById("search-btn");
let searchInput = document.getElementById("search-input");

async function fetchStudents() {
  let response = await fetch(
    "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json"
  );
  let students = await response.json();

  return students;
}


async function displayStudentInformation(students) {

    if (students == undefined) students = await fetchStudents();

    tableBody.innerHTML = '';
    students.forEach((element) => {
        let tableRow = document.createElement('tr');
    tableRow.innerHTML = `
        <tr>
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
        </tr>`;

        tableBody.appendChild(tableRow);
  });
}

displayStudentInformation();

async function searchStudents() {
    let students =  await fetchStudents();
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

searchBtn.addEventListener('click', searchStudents);