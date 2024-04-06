import { Injectable, NgZone } from '@angular/core';
import {
  Firestore,
  arrayUnion,
  collection,
  collectionSnapshots,
  doc,
  docSnapshots,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
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
      // Get the count of documents in the collection
      const querySnapshot = await getDocs(
        collection(this.afs, 'menu-categories')
      );
      const order = querySnapshot.size; // This will give the count of documents as a number

      // Add document with menuCategoryData and order property
      const docRef = await addDoc(collection(this.afs, 'menu-categories'), {
        ...menuCategoryData,
        order: Number(order), // Convert order to number
      });

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
    const queryMenuCategories = query(collectionRef, orderBy('order'));

    return collectionSnapshots(queryMenuCategories).pipe(
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
            order: docData['order'],
          };
          return { ...menuCategoriesData };
        })
      )
    );
  }

  // Update Rearranged Categories
  async updateRearrangedCategories(menuCategoriesData: any) {
    const batch: any = [];
    const menuCategoriesRef = collection(this.afs, `menu-categories`);

    menuCategoriesData.forEach((menuCategory: any) => {
      const categoryId = menuCategory.cid;
      const categoryRef = doc(menuCategoriesRef, categoryId);
      batch.push(updateDoc(categoryRef, { order: menuCategory.order }));
    });

    try {
      await Promise.all(batch);
      console.log('Menu categories updated successfully.');
    } catch (error) {
      console.error('Error updating menu categories: ', error);
    }
  }

  // Get Single Menu Category Document
  getMenuCategoryDetails(cid: string) {
    const ref = doc(this.afs, 'menu-categories', cid);
    return docSnapshots(ref).pipe(
      map((action) => {
        const menuCategoryData = action.data() as any;
        return {
          category: menuCategoryData['category'],
          type: menuCategoryData['type'],
          caption: menuCategoryData['caption'],
          categoryImage: menuCategoryData['categoryImage'],
          categoryImageFile: menuCategoryData['categoryImageFile'],
          order: menuCategoryData['order'],
          items: menuCategoryData['items'] || null,
        };
      })
    );
  }

  // Create Menu Catergory Item
  async createMenuCatergoryItem(cid: string, itemData: any) {
    try {
      const docRef = doc(this.afs, 'menu-categories', cid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          items: arrayUnion(itemData),
        });
        console.log('Item added to array successfully');
      } else {
        console.error('Document does not exist');
      }
    } catch (error) {
      console.error('Error adding item to array: ', error);
    }
  }
}
