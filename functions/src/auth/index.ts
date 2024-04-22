import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const adminEmails = ['sdanieldk@gmail.com', 'war.wick101@gmail.com']; // Add your admin email addresses here

export const setAdminClaim = functions.auth.user().onCreate(async (user) => {
  try {
    if (user.email) {
      const email = user.email;

      if (adminEmails.includes(email)) {
        // Set the custom claim for the user
        await admin.auth().setCustomUserClaims(user.uid, { isAdmin: true });
      } 
      else {
        // Set the custom claim for the user
        await admin.auth().setCustomUserClaims(user.uid, { isViewer: true });
      }
    }
  } catch (error) {
    console.error('Error setting custom claim:', error);
  }
});
