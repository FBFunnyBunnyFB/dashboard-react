const fs = require("fs");

function generateData(count = 1) {
    function randomFrom(arr) {
        return arr[Math.floor(Math.random()*arr.length)];
    }
    function getRandomInt(min, max) {
        return Math.round(Math.random() * (max - min) + min)
    }
    const names = ["Jane", "Floyd", "Ronald", "Marvin", "Jerome", "Kathryn", "Jacob", "Kristin"];
    const surnames = ["Cooper", "Miles", "Richards", "McKinney", "Bell", "Murphy", "Jones", "Watson"];
    const companies = ["Microsoft", "Yahoo", "Adobe", "Tesla", "Google", "Facebook"];
    const countries = ["United States", "Kiribati", "Israel", "Iran", "Réunion", "Curaçao", "Brazil", "Åland Islands"];
    const statuses = ["Active", "Inactive"];

    let customers = [];
    for (let i = 0; i < count; i++) {
        const name = randomFrom(names);
        const company = randomFrom(companies);
        customers.push({
            name: name.concat(" ", randomFrom(surnames) || "Lox"),
            company: company,
            phone: getRandomInt(100, 1000).toString().concat(getRandomInt(100, 1000), getRandomInt(1000, 10000)),
            email: name.toLocaleLowerCase().concat("@", company.toLocaleLowerCase(), ".com"),
            country: randomFrom(countries),
            status: randomFrom(statuses)
        })
    }
    return {
        "fields": {
            "name": "Customer Name",
            "company": "Company",
            "phone": "Phone Number",
            "email": "Email",
            "country": "Country",
            "status": "Status"
        },
        "customers": customers
    }
}

const out_path = process.argv[2];
const customers_data = generateData(320);

fs.writeFileSync(out_path, JSON.stringify(customers_data, null, 4));