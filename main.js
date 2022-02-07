async function loadIntoTable(url, table) {
  const tableHead = table.querySelector("thead");
  const tableBody = table.querySelector("tbody");
  const response = await fetch(url);
  const { headers, rows } = await response.json();

  //notirit tabulu
  tableHead.innerHTML = "<tr></tr>";
  tableBody.innerHTML = "";

  //Pavairot virsrakstu
  for (const headerText of headers) {
    const headerElement = document.createElement("th");

    headerElement.textContent = headerText;
    tableHead.querySelector ("tr").appendChild(headerElement);
  }

  //Pavairot rindas
  for (const row of rows) {
    const rowElement = document.createElement("tr");

    for (const cellText of row) {
      const cellElement = document.createElement("td");

      cellElement.textContent = cellText;
      rowElement.appendChild(cellElement);
    }

    tableBody.appendChild(rowElement);
  }
}

loadIntoTable("./data.json", document.querySelector("table"));

//2.variants
function fetchData(url) {  // sākas funkcija 
  fetch(url).then(response => {
    if (!response.ok) {  // vilkt datus no link
      throw Error("ERROR");
    }

    return response.json();
  })

  .then(data => {
    const tabula = data.data.map(persona => { // ievietot datus 
      return `
          <tr>  
            <td>${persona.first_name}</td>
            <td>${persona.last_name}</td>
            <td>${persona.email}</td>
            <td><img src="${persona.avatar}"alt="${persona.avatar}"/></td>
          </tr>
      `;
    })
    .join("");

    document.querySelector('#showdata').innerHTML = tabula;
  })

  .catch(error => {
    console.log(error); // ja neiet konsole ievietot erroru
  });
}
