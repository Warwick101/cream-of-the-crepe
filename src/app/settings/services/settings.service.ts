import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionSnapshots,
  doc,
  docSnapshots,
  setDoc,
} from '@angular/fire/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private afs: Firestore) {}

  // Add Settings Document
  async addSettingsData(data: any) {
    const ref = collection(this.afs, 'settings');

    await addDoc(ref, data).catch((error) => {
      console.log('Data send ERROR - Add Settings Data: ', error);
    });
  }

  // Set Settings Document
  async setSettingsData(sid: string, data: any) {
    const ref = doc(this.afs, 'settings', sid);

    await setDoc(ref, data);
  }

  // Get All Contact Collrction
  getSettingsCollection() {
    const collectionRef = collection(this.afs, 'settings');

    return collectionSnapshots(collectionRef).pipe(
      map((res) =>
        res.map((data) => {
          // const tid = data.id;
          const docData = data.data();
          const settingsData = {
            sid: data.id,
            phoneNumber: docData['phoneNumber'],
            tradingHours: docData['tradingHours'],
          };
          return { ...settingsData };
        })
      )
    );
  }

  // Get Single Settings Document
  getSettingsDetails(sid: string) {
    const ref = doc(this.afs, 'settings', sid);
    return docSnapshots(ref).pipe(
      map((action) => {
        const settingsData = action.data() as any;
        return {
          phoneNumber: settingsData['phoneNumber'],
          tradingHours: settingsData['tradingHours'],
        };
      })
    );
  }
}
