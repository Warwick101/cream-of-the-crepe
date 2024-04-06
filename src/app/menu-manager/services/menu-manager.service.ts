import { Injectable, NgZone } from '@angular/core';
import {
  Firestore,
  collection,
  collectionSnapshots,
  doc,
  serverTimestamp,
  setDoc,
} from '@angular/fire/firestore';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { addDoc } from '@firebase/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuManagerService {
  constructor(
    private afs: Firestore,
    private storage: Storage,
    private ngZone: NgZone
  ) {}

  // Create Menu Category Document
  async createMenuCategory(
    menuCategoryData: any,
    menuCategoryImage: any,
    onComplete: () => void
  ): Promise<void> {
    try {
      // Create a Firestore document and get the document ID
      const docRef = await addDoc(
        collection(this.afs, 'menu-categories'),
        menuCategoryData
      );

      if (menuCategoryImage) {
        // If there's an image, proceed with image upload
        const timestamp = new Date().getTime();
        const [fileName, fileExtension] = menuCategoryImage.name.split('.');
        const trimmedCategory = menuCategoryData.category.replace(/\s/g, ''); // Remove all whitespace
        const fileNameWithTimestamp = `${trimmedCategory}_${timestamp}.${fileExtension}`;

        const filePath = `${docRef.id}/menuCategoryImage/${fileNameWithTimestamp}`;
        const storageRef = ref(this.storage, filePath);
        const uploadTask = uploadBytesResumable(storageRef, menuCategoryImage);

        const uploadPromise = new Promise<void>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              // Update progress if needed
            },
            (error) => {
              console.log(error);
              reject(error); // Reject promise if there's an upload error
            },
            () => {
              resolve(); // Resolve promise when upload is complete
            }
          );
        });

        // Wait for upload task to complete
        await uploadPromise;

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // Update Firestore document with image details
        await setDoc(
          doc(this.afs, 'menu-categories', docRef.id),
          {
            categoryImage: downloadURL,
            categoryImageFile: fileNameWithTimestamp,
            createdAt: serverTimestamp(),
          },
          { merge: true }
        );
      }

      this.ngZone.run(() => {
        onComplete(); // Signal completion
      });
    } catch (error) {
      console.error('Error creating menu category:', error);
    }
  }

  // Get All Menu Categories
  getMenuCategoriesCollection() {
    const collectionRef = collection(this.afs, 'menu-categories');
    return collectionSnapshots(collectionRef).pipe(
      map((res) =>
        res.map((data) => {
          // const tid = data.id;
          const docData = data.data();
          const menuCategoriesData = {
            cid: data.id,
            category: docData['category'],
            type: docData['type'],
            caption: docData['caption'],
            categoryImage: docData['categoryImage'],
            categoryImageFile: docData['categoryImageFile'],
          };
          return { ...menuCategoriesData };
        })
      )
    );
  }  
}
