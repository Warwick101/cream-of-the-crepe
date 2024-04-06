import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MenuManagerService {

  constructor(private afs: Firestore) {}

  // Add Sub Menu Document
  addSubMenuData(data: any) {
    const ref = collection(this.afs, `sub-menus`);

    addDoc(ref, data).catch((error) => {
      console.log('Data send ERROR - Add Sub Menu Data: ', error);
    });
  }
}
