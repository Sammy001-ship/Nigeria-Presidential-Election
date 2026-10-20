# Cross-device data sync

The app uses Firebase Authentication, Cloud Firestore, and Cloud Storage to share
results, Town Hall comments, issue-poll totals, and administrator-uploaded candidate
photos between everyone using the same deployed site. A voter's personal "already
voted" marker remains in that browser and is not shared between devices.

## Firebase setup

1. Create a Firebase project at <https://console.firebase.google.com/>.
2. In **Project settings > General**, register a Web app and copy its config values.
3. In **Authentication > Sign-in method**, enable **Anonymous** sign-in.
4. Create a **Cloud Firestore** database.
5. Enable **Storage** and create its default bucket.
6. Install the Firebase CLI if needed, sign in, and select this project from this app
   directory:

   ```powershell
   npm install --global firebase-tools
   firebase login
   firebase use --add
   firebase deploy --only firestore:rules,storage
   ```

   The included rules let signed-in (including anonymous) app visitors read and write
   the shared mock-election document and upload candidate photos up to 5 MB.
7. Copy `.env.example` to `.env.local` for local development and replace the Firebase
   placeholders with the Web app's `apiKey`, `authDomain`, `projectId`, `storageBucket`,
   and `appId`. These are public client config values, not admin credentials.
8. In **Vercel > Project > Settings > Environment Variables**, add those same five
   `VITE_FIREBASE_*` values for the environments you deploy. Redeploy after adding
   or changing them.

When Firebase is configured, the first app instance creates the shared document using
the app's initial sample content; subsequent changes are broadcast live. Existing
browser-local votes, comments, poll totals, and photo edits are not automatically
merged into the cloud document. Back up anything important before switching over.
Without Firebase configuration, the app explicitly stays in device-only mode.

## Important limitations

This is a public mock-election application, not an official voting system. Its
administrator password is currently client-side, and the included rules intentionally
allow any app visitor to change shared mock data. Do not use this setup to collect
real ballots or sensitive personal data. A production system needs trusted server
validation, real user authentication and authorization, abuse protection, and a
privacy/security review before public use.
