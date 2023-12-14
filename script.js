// Duomenis pasiimsime iš: https://polar-chartreuse-silverfish.glitch.me/

// 1. Naudojant tik JS, sukurkite lentelę ir į ją įrašykite duomenis (id, name, city, fav_color).
// 2. Naudojant JS metodus, padalinkite vardą į dvi dalis: vardą ir pavardę (lentelėje).
// 3. Pridėkite prie lentelės (tarp id ir name) nuotrauką.
// 4.Sukurkite checkbox virš lentelės su JS. Jį paspaudus, rodys tik tuos žmones, kurie yra VIP.
// 5. Sukurkite virš lentelės ir search laukelį (forma su input type search ir mygtukas). Suvedus duomenis, lentelėje turi prasifiltruoti pagal vardą arba pavardę (fullname contains search string). Capitalizacija turėtų būti nesvarbi.

const API_URL = 'https://polar-chartreuse-silverfish.glitch.me/'
const app = document.querySelector(".app")
const checkboxVIP = document.getElementById("VIP")

const loadData = (resource) => {
    return fetch(API_URL + resource).then(resp => resp.json())
}

const printData = (data) => {
    const table = document.createElement('table')
    const headerRow = table.insertRow();
    ['ID', 'Picture', 'Full Name', 'First Name', 'Last Name', 'City', 'Favorite Color'].forEach(label => {
        const th = document.createElement('th');
        th.textContent = label;
        headerRow.appendChild(th);
    });

    data.forEach(person => {
        const row = table.insertRow()
        row.insertCell().textContent = person.id   
        
        const imgCell = row.insertCell()
        const img = document.createElement('img')
        img.src = person.image
        imgCell.appendChild(img)

        const fullName = person.name.split(' ')
        row.insertCell().textContent = person.name
        row.insertCell().textContent = fullName[0]
        row.insertCell().textContent = fullName[1]
        row.insertCell().textContent = person.city
        row.insertCell().textContent = person.fav_color
    });

    app.innerHTML = 
    `
    <input id="inputSearch" type="text" placeholder="Įveskite vardą arba pavardę">
    <div class="checkbox">
        <input type="checkbox" id="VIP">
        <label for="VIP">Rodyti tik VIP žmones</label>
    </div>
    `

    app.appendChild(table)
}

loadData('').then(data => printData(data))