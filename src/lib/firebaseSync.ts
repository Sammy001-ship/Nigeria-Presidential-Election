import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import {
  doc,
  getFirestore,
  onSnapshot,
  runTransaction,
  type Unsubscribe
} from 'firebase/firestore';
import type { Comment, IssuePollOption } from '../types/election';
import { INITIAL_STATE_VOTES, INITIAL_COMMENTS, TOP_ISSUES_POLL } from '../data/electionData';

export interface SharedElectionData {
  stateVotes: Record<string, Record<string, number>>;
  comments: Comment[];
  issuePolls: IssuePollOption[];
  customPhotos: Record<string, string>;
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);

const app = isFirebaseConfigured
  ? getApps()[0] ?? initializeApp(firebaseConfig)
  : null;
const auth = app ? getAuth(app) : null;
const firestore = app ? getFirestore(app) : null;
const sharedElectionRef = firestore ? doc(firestore, 'public', 'election') : null;

const defaultSharedData: SharedElectionData = {
  stateVotes: INITIAL_STATE_VOTES,
  comments: INITIAL_COMMENTS,
  issuePolls: TOP_ISSUES_POLL,
  customPhotos: {}
};

let authenticationPromise: Promise<void> | null = null;

function isSharedElectionData(data: unknown): data is SharedElectionData {
  if (typeof data !== 'object' || data === null) return false;
  const record = data as Record<string, unknown>;
  return typeof record.stateVotes === 'object'
    && record.stateVotes !== null
    && Array.isArray(record.comments)
    && Array.isArray(record.issuePolls)
    && typeof record.customPhotos === 'object'
    && record.customPhotos !== null;
}

async function ensureAuthenticated(): Promise<void> {
  if (!auth) throw new Error('Firebase is not configured.');
  if (auth.currentUser) return;

  if (!authenticationPromise) {
    authenticationPromise = signInAnonymously(auth)
      .then(() => undefined)
      .finally(() => {
        authenticationPromise = null;
      });
  }
  await authenticationPromise;
}

async function ensureSharedDocument(): Promise<void> {
  if (!firestore || !sharedElectionRef) throw new Error('Firebase is not configured.');
  await ensureAuthenticated();

  await runTransaction(firestore, async transaction => {
    const snapshot = await transaction.get(sharedElectionRef);
    if (!snapshot.exists()) transaction.set(sharedElectionRef, defaultSharedData);
  });
}

export async function subscribeToSharedElection(
  onData: (data: SharedElectionData) => void,
  onError: (error: Error) => void
): Promise<Unsubscribe> {
  await ensureSharedDocument();
  if (!firestore || !sharedElectionRef) throw new Error('Firebase is not configured.');

  return onSnapshot(
    sharedElectionRef,
    snapshot => {
      if (!snapshot.exists()) {
        onError(new Error('The shared election document was unexpectedly removed.'));
      } else {
        const data: unknown = snapshot.data();
        if (isSharedElectionData(data)) onData(data);
        else onError(new Error('The shared election document has an invalid data structure.'));
      }
    },
    error => onError(error)
  );
}

export async function updateSharedElection(
  update: (current: SharedElectionData) => SharedElectionData
): Promise<void> {
  if (!firestore || !sharedElectionRef) throw new Error('Firebase is not configured.');
  await ensureAuthenticated();

  await runTransaction(firestore, async transaction => {
    const snapshot = await transaction.get(sharedElectionRef);
    let current = defaultSharedData;
    if (snapshot.exists()) {
      const stored: unknown = snapshot.data();
      if (!isSharedElectionData(stored)) {
        throw new Error('The shared election document has an invalid data structure.');
      }
      current = stored;
    }
    transaction.set(sharedElectionRef, update(current));
  });
}
