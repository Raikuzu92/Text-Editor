import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Adding content to the database:', content);

  const kittiesDb = await openDB("vacations", 1);
  const tx = kittiesDb.transaction("vacations", "readwrite");
  const store = tx.objectStore("vacations");
  const request = store.put({ id: 1, value: content });
  const result = await request;

  if (result !== undefined) {
    console.log("Data saved to the database, ID:", result);
    const savedData = await store.get(result);
    console.log("Saved data:", savedData.value);
    return savedData.value;
  } else {
    console.log("I think your still on vacation we didn't make it to the database!");
    return null;
  }
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("Get all notes from the database");

  const kittiesDb = await openDB("vacations", 1);
  const tx = kittiesDb.transaction("vacations", "readonly");
  const store = tx.objectStore("vacations");
  const request = store.get(1);
  const result = await request;

  result
    ? console.log("Notes retrieved from database:", result.value)
    : console.log("No notes found in database! Mind still on that trip?");

  return result?.value;
};

export const deleteDb = async () => {
  console.log("Uh oh! Vacation is no where near today!");
  const kittiesDb = await openDB("vacations", 1);
  const tx = kittiesDb.transaction("vacations", "readwrite");
  const store = tx.objectStore("vacations");
  const request = store.delete(1);
  await request;

  console.log("Note has been removed from the database");
  return true;
};

initdb();