import { getDatabase , push, ref, onValue } from 'firebase/database';
import firebaseApp from '../FirebaseConfig';

export default function saveEventFunc(event) {
  const database = getDatabase(firebaseApp);
  push(
    ref(database, 'HelsinkiEvents/'),
      {
        "title": event.title,
        "description": event.description,
        "start": event.start,
        "duration": event.duration,
        "address": event.address,
        "url": event.url
      }
    )
}

