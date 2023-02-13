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

// TODO: Agregar lógica a un método que acepte algo de contenido y lo agregue a la base de datos
// export const putDb = async (content) => console.error('putDb not implemented');

export const putDb = async (content) => {

  console.log('PUT to the database');
  
  const jateDb = await openDB('jate', 1);

  const txn = jateDb.transaction('jate', 'readwrite');

  const store = txn.objectStore('jate');

  if (content == null){

    console.log('Content is Null, abort');
    return;
  
  }

  const request = store.put({ id: 1, content: content });

  const result = await request;
  console.log('data saved to the database', result);

}

// TODO: Agregar lógica para un método que obtiene todo el contenido de la base de datos
//export const getDb = async () => console.error('getDb not implemented');

export const getDb = async (content) => {

  console.log('GET from database');

  const jateDb = await openDB('jate', 1);

  const txn = jateDb.transaction('jate', 'readonly');

  const store = txn.objectStore('jate');

  const request = store.get(1);

  const result = await request;

  request.onsuccess = function(event){
    console.log('result.content:', result);
    return result;
  }

}

initdb();
