import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config());

import * as setAdminClaim from './auth';
export const startSetAdminClaim = setAdminClaim.setAdminClaim;

