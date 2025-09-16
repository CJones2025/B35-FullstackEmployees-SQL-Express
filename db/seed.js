import "dotenv/config";
import db from "#db/client";

async function main() {
  try {
    await db.connect();
    console.log("Connected to database.");
    await seedEmployees();
    await db.end();
    console.log("\ud83c\udf31 Database seeded.");
  } catch (err) {
    console.error("Seeding error:", err);
  }
}

main();

async function seedEmployees() {
  const employees = [
    { name: "Serj Tankian", birthday: "1967-08-21", salary: 70000 },
    { name: "Daron Malakian", birthday: "1975-07-18", salary: 65000 },
    { name: "Shavo Odadjian", birthday: "1974-04-22", salary: 80000 },
    { name: "John Dolmayan", birthday: "1972-07-15", salary: 90000 },
    { name: "Mike Patton", birthday: "1968-01-27", salary: 60000 },
    { name: "Trey Spruance", birthday: "1969-08-13", salary: 72000 },
    { name: "Trevor Dunn", birthday: "1968-02-07", salary: 68000 },
    { name: "Dave Lombardo", birthday: "1965-02-16", salary: 85000 },
    { name: "Scott Ian", birthday: "1963-12-31", salary: 75000 },
    { name: "Clinton McKinnon", birthday: "1969-10-22", salary: 67000 },
  ];

  console.log("Seeding employees...");
  for (const emp of employees) {
    try {
      await db.query(
        "INSERT INTO employees (name, birthday, salary) VALUES ($1, $2, $3)",
        [emp.name, emp.birthday, parseInt(emp.salary, 10)]
      );
      console.log(`Inserted: ${emp.name}`);
    } catch (err) {
      console.error(`Error inserting ${emp.name}:`, err);
    }
  }
}
