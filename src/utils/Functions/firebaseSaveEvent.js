import { getDatabase , push, ref } from 'firebase/database';
import firebaseApp from '../FirebaseConfig/firebaseconfig.js';

export default function firebaseSaveEvent(event) {
  const database = getDatabase(firebaseApp);
  push(
    ref(database, 'HelsinkiEvents/'),
      {
        "id": event.id,
        "title": event.title,
        "description": event.description,
        "start": event.start,
        "end": event.end,
        "location": event.location,
        "address": event.address,
        "url": event.url
      }
    )
}

