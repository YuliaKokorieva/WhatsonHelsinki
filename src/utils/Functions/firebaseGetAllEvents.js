import { getDatabase , ref, onValue } from 'firebase/database';
import firebaseApp from '../firebaseconfig.js';

export default function firebaseGetAllEvents() {
  const database = getDatabase(firebaseApp);

  let events =[]

  const eventsRef = ref(database, 'HelsinkiEvents/')
  onValue(eventsRef, (snapshot) => { events = (snapshot.val()) })
  return events;
}

