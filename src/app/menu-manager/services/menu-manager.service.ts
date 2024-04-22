import { Injectable, NgZone } from '@angular/core';
import {
  Firestore,
  arrayRemove,
  arrayUnion,
  collection,
  collectionSnapshots,
  deleteDoc,
  deleteField,
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
  deleteObject,
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

  async editMenuCategory(
    cid: string,
    menuCategoryData: any,
    menuCategoryImage: any,
    onComplete: () => void
  ): Promise<void> {
    try {
      if (menuCategoryImage) {
        const oldImageFile = menuCategoryData.categoryImageFile;
        const timestamp = new Date().getTime();
        const [fileName, fileExtension] = menuCategoryImage.name.split('.');
        const trimmedCategory = menuCategoryData.category.replace(/\s/g, ''); // Remove all whitespace
        const fileNameWithTimestamp = `${trimmedCategory}_${timestamp}.${fileExtension}`;

        const filePath = `${cid}/menuCategoryImage/${fileNameWithTimestamp}`;
        const storageRef = ref(this.storage, filePath);
        const uploadTask = uploadBytesResumable(storageRef, menuCategoryImage);
        const uploadTaskSnapshot = await uploadTask;
        const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);

        menuCategoryData.categoryImage = downloadURL;
        menuCategoryData.categoryImageFile = fileNameWithTimestamp;

        this.updateCategoryDocument(cid, menuCategoryData);
        this.removePreviousImage(cid, oldImageFile);
        this.ngZone.run(() => {
          onComplete();
        });
      } else {
        this.updateCategoryDocument(cid, menuCategoryData);
        this.ngZone.run(() => {
          onComplete();
        });
      }
    } catch (error) {
      console.error('Error creating menu category:', error);
    }
  }

  async updateCategoryDocument(cid: string, menuCategoryData: any) {
    try {
      const ref = doc(this.afs, 'menu-categories', cid);

      // Overwrite the entire document with menuCategoryData
      await setDoc(ref, menuCategoryData);

      console.log('Menu category updated successfully!');
    } catch (error) {
      console.error('Error updating menu category:', error);
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
            // type: docData['type'],
            caption: docData['caption'] || null,
            categoryImage: docData['categoryImage'],
            categoryImageFile: docData['categoryImageFile'],
            order: docData['order'],
            items: docData['items'] || null,
            special: docData['special'] || null,
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
          createdAt: menuCategoryData['createdAt'],
          caption: menuCategoryData['caption'] || null,
          categoryImage: menuCategoryData['categoryImage'] || null,
          categoryImageFile: menuCategoryData['categoryImageFile'] || null,
          order: menuCategoryData['order'],
          items: menuCategoryData['items'] || null,
          special: menuCategoryData['special'] || null,
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

  async updateMenuItem(cid: string, updatedItemData: any) {
    try {
      const itemId = updatedItemData.id;
      const categoryDocRef = doc(this.afs, 'menu-categories', cid);
      const categoryDocSnap = await getDoc(categoryDocRef);

      if (categoryDocSnap.exists()) {
        const categoryData = categoryDocSnap.data();
        const updatedItems = categoryData['items'].map((item: any) => {
          if (item.id === itemId) {
            return updatedItemData;
          } else {
            return item;
          }
        });

        await updateDoc(categoryDocRef, {
          items: updatedItems,
        });

        console.log('Item updated in category array successfully');
      } else {
        console.error('Category document does not exist');
      }
    } catch (error) {
      console.error('Error updating item in category array: ', error);
    }
  }

  async removeMenuItem(cid: string, itemId: string) {
    try {
      const categoryDocRef = doc(this.afs, 'menu-categories', cid);
      const categoryDocSnap = await getDoc(categoryDocRef);

      if (categoryDocSnap.exists()) {
        const categoryData = categoryDocSnap.data();
        const updatedItems = categoryData['items'].filter(
          (item: any) => item.id !== itemId
        );

        await updateDoc(categoryDocRef, {
          items: updatedItems,
        });

        console.log('Item deleted from category array successfully');
      } else {
        console.error('Category document does not exist');
      }
    } catch (error) {
      console.error('Error deleting item from category array: ', error);
    }
  }

  // Update Rearranged Category Items
  async updateRearrangedCategoryItems(cid: string, itemData: any) {
    try {
      const docRef = doc(this.afs, 'menu-categories', cid);
      await updateDoc(docRef, { items: itemData });
      console.log('Array overwritten successfully');
    } catch (error) {
      console.error('Error overwriting array: ', error);
    }
  }

  async removeCategoryDocument(cid: string, imageFile: any){
    await this.removePreviousImage(cid , imageFile)
    const ref = doc(this.afs, 'menu-categories', cid);
    await deleteDoc(ref);
  }

  async removePreviousImage(cid: string, oldImageFile: any) {
    if (oldImageFile) {
      const filePath = `${cid}/menuCategoryImage/${oldImageFile}`;
      const prevFileRef = ref(this.storage, filePath);
      try {
        await deleteObject(prevFileRef);
        // File deleted successfully
      } catch (error: any) {
        // Handle error with a snack bar?
        console.error('Error deleting file:', error);
        if (error.code === 'storage/object-not-found') {
        } else {
          // Show a generic error message
        }
      }
    }
  }
}
