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

  const kittiesDb = await openDB("kitties", 1);
  const tx = kittiesDb.transaction("kitties", "readwrite");
  const store = tx.objectStore("kitties");
  const request = store.put({ id: 1, value: content });
  const result = await request;

  if (result !== undefined) {
    console.log("Data saved to the database, ID:", result);
    const savedData = await store.get(result);
    console.log("Saved data:", savedData.value);
    return savedData.value;
  } else {
    console.log("The cat ran away with the note! It wasn't saved to the database!");
    return null;
  }
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("Get all notes from the database");

  const kittiesDb = await openDB("kitties", 1);
  const tx = kittiesDb.transaction("kitties", "readonly");
  const store = tx.objectStore("kitties");
  const request = store.get(1);
  const result = await request;

  result
    ? console.log("Notes retrieved from database:", result.value)
    : console.log("No notes found in database! The cat must have stolen them!");

  return result?.value;
};

initdb();