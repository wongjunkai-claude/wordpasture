# WordPasture

*“Feed my lambs.” (John 21:15)*

A daily Bible-reading game for your fellowship, your family, your friends. Each person keeps one lamb that stays happy as they read. People gather in **flocks** (like classes in Google Classroom). A flock is made of **folds** (small groups). Each person's own fenced home for their lamb is their **pasture**.

This folder is a complete website. It runs on Firebase (Google's free app platform): Firebase Hosting serves the site, Firebase Authentication handles sign-in, and Firestore stores the lambs.

People sign in with their **Google account** (Google sign-in only). There are no passwords to remember or reset.

## Try it first

Open `index.html` through any web server, or deploy it as below without filling in the config. Until `firebase-config.js` has your real settings, the app runs in **demo mode** with two pretend flocks:

- **Riverside Youth** (code `LAMB24`): you're the shepherd of the Psalms Squad fold. Grace Lim is the founder.
- **Tan Family** (code `HOME77`): you founded it, so you see *Founder's tools*.

Add `#demo-join` to the address to see what a newcomer sees.

## Set up (about 20 minutes, once)

You need a Google account and a computer with [Node.js](https://nodejs.org) installed.

1. **Create a Firebase project.** Go to [console.firebase.google.com](https://console.firebase.google.com), click *Add project*, and give it a name (for example `feed-my-lambs`). Google Analytics isn't needed.
2. **Add a web app.** In the project, click the web icon (`</>`), name it, and tick *Also set up Firebase Hosting*. Firebase shows a `firebaseConfig` block. Copy those values into `firebase-config.js`.
3. **Turn on Google sign-in.** Go to *Build → Authentication → Get started → Sign-in method*, choose *Google*, switch it on, pick a support email and save. (Leave Email/Password off.) Then:
   - *Authentication → Settings → Authorized domains*: check `wordpasture.web.app` and `wordpasture.firebaseapp.com` are listed.
   - Nothing to add in Google Cloud: the app signs in through `wordpasture.firebaseapp.com` (`authDomain` in `firebase-config.js`), which Google allows by default. The app's address is therefore **https://wordpasture.firebaseapp.com**. Anyone opening `wordpasture.web.app` is sent there automatically, so sign-in always happens on the same address (Safari, and the iPhone home-screen app, need that).
   - *APIs & Services → OAuth consent screen*: set the app name to "WordPasture" and add your logo and support email, so people see it when they choose their Google account.
4. **Create the database.** Go to *Build → Firestore Database → Create database*. Choose *Start in production mode* and a nearby location (for Singapore, `asia-southeast1`).
5. **Point the folder at your project.** Open `.firebaserc` and replace `your-project-id` with your project's ID (shown in *Project settings*).
6. **Deploy.** In a terminal, inside this folder:
   ```
   npm install -g firebase-tools
   firebase login
   firebase deploy
   ```
   This publishes the website, the security rules and the database indexes. Your app's address is **https://wordpasture.firebaseapp.com** (the `.web.app` address the terminal prints also works; it forwards there). (Indexes can take a few minutes to build the first time.)
7. **Lock the key to your site.** In [Google Cloud Console → APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials), open the *Browser key* for the project and, under *Application restrictions*, choose *Websites* and add `https://your-project-id.web.app/*` and `https://your-project-id.firebaseapp.com/*`.
8. **Optional: App Check.** In Firebase *Build → App Check*, register the web app with reCAPTCHA Enterprise and turn on enforcement for Firestore and Authentication. This stops other websites and scripts using your database.
9. **Start your flock.** Open your site, choose *Start a flock*, give it a name (for example `Riverside Youth`), and your name, then *Continue with Google*. You become its **founder**.
10. **Set it up.** Open the farm (signpost on your fold card) and tap *Founder's tools*: see the **flock code**, rename the flock, add folds, choose shepherds, and set the reading plan in *Settings → Reading plan → Flock plan*.
11. **Invite people.** Share the site address and the flock code. Each person types the code, their name, and their fold, then *Continue with Google*.

To change anything later, edit the files and run `firebase deploy` again.

## An app on the home screen (PWA)

WordPasture is a Progressive Web App: people install it from the browser, with no App Store needed.

- **iPhone:** open the site in **Safari**, tap **Share**, then **Add to Home Screen**.
- **Android:** open it in **Chrome**. The app offers an **Add to home screen** button, or use the ⋮ menu, then **Install app**.
- The app shows these steps itself: once on the home page after someone's first reading, and any time in *Settings › On your phone*.
- Installed, it opens full screen with the lamb icon. It also **works offline**: the app, the Bible text, the questions and your flock's latest data are kept on the phone (`sw.js` and Firestore's offline cache), and anything done offline is sent when the signal returns.
- Updates still arrive straight away: the app is always fetched fresh when online, and *Update now* clears the saved copy.

## Who can do what

| | Founder | Shepherd | Everyone |
|---|---|---|---|
| Read, reflect, share, send hearts and notes | ✓ | ✓ | ✓ |
| Remove their own posts, notes and replies | ✓ | ✓ | ✓ |
| Remove replies and hearts on their own reflection | ✓ | ✓ | ✓ |
| See and share the flock code | ✓ | ✓ | |
| Remove posts, notes, questions and replies **in their own fold** | ✓ | ✓ | |
| Remove a lamb **from their own fold** (not a shepherd) | ✓ | ✓ | |
| Remove anyone, anywhere (except the founder) | ✓ | | |
| Make or unmake shepherds | ✓ | | |
| Move lambs between folds; add, rename and remove folds | ✓ | | |
| Rename the flock, make a new code, set the flock plan | ✓ | | |
| Let removed people back in | ✓ | | |
| Hand the flock to someone else | ✓ | | |

- **Removing someone** takes them out of the flock and records them as removed, so the code won't let them back in until the founder taps *Let back in* in Founder's tools. Their own lamb and reading stay with them.
- **The founder** can't leave a flock that has other people in it: they hand it on first (*Founder's tools → Hand the flock on*). A founder who is the only one left can close the flock.
- **Everyone stays in at least one flock.** The last flock can't be left; join or start another first.

## Privacy

- **Visible to the flock:** your name, your lamb's name, outfit, fold, streak, total readings and the date you last read.
- **Reflections:** shared with *just me*, *my fold* or the *whole flock*. A fold-only reflection, and its replies and hearts, can only be read in that fold. If it has an *I wonder…* question, the question alone is shown to the whole flock (in the inbox, without an alert).
- **Notes and hearts are open:** everyone in the flock can read them (each fold card shows the notes written to its lambs). Only the person a note or heart is for is alerted.
- **Private to you:** your journal, your answers, your verses and your plan progress.
- **Flocks never see each other.** Joining needs the flock's current code; if a code gets out, the founder makes a new one.
- **Deleting:** *Settings → Your account → Delete my account* removes the person's lamb, journal, and everything they shared or sent, in every flock, then the account itself.
- The app's *Privacy note* (in *Settings › Your account*) explains all this in plain words, and asks under-18s to make sure a parent or guardian knows.

## Never running out of space

Each person's lamb is stored as one small record (`users/{uid}`), and **every journal entry is its own record** (`users/{uid}/journal/{entry}`). Nothing is trimmed or thrown away, and no single record grows past Firestore's 1 MB limit: a daily reader adds a few hundred bytes a day, in a new record each time.

## Two phones, one lamb

When someone signs in on a second phone, or comes back to the app, the two copies are **combined** rather than one replacing the other: every chapter read, every day fed, every journal entry and every memory verse from both is kept; counts take the larger; outfit and settings come from whichever was changed last.

## How it works

- **Flocks are separate.** Folds, members, reflections, questions, hearts, notes, replies and the flock plan all belong to one flock. Someone in two flocks switches between them by tapping the flock name on their fold card.
- **One plan at a time.** You follow one reading plan: a personal one, or one flock's plan. Each flock's founder sets its plan.
- **Read, Reflect, Remember.** The day's passage opens right in the app (World English Bible, in `bible/`), with highlighting, a full-screen reading mode, a calendar, and passage-specific questions (in `questions/`).
- **The pasture.** The tree icon opens your own pasture: sky, fence, gate, trees, water and animals, unlocked as you keep reading.
- **Rewards** come quickly at first (days 1, 2, 3, 5, 7, 10…) and then at gradually widening gaps, with wardrobe and pasture rewards falling on different days so there's usually something within reach.
- **The 3D meadow pauses** whenever it's scrolled out of view or the app is in the background, to save battery.

## Looking after it

- **Where things are:** `flocks/{flockId}` holds each flock (with `members`, `groups` (folds), `reflections`, `questions`, `cheers`, `replies`, `rhearts`, `removed`, `config/plan` inside), `codes/{CODE}` points a code to its flock, and `users/{uid}` (with `journal`) holds each person's lamb.
- **Someone has a new phone:** they open the site, tap *Already joined? Sign in with Google*, and choose the same Google account.
- **Someone used the wrong Google account:** they sign out (*Settings › Your account*) and sign in with the right one. Each Google account has its own lamb.

## Publishing an update

Everyone is moved onto a new version automatically:

1. In `index.html`, change `const APP_VERSION = "…"` to the new number (and the "Version …" line in Settings).
2. In `version.json`, put the same number.
3. Deploy (`firebase deploy`).

Within a few minutes (or as soon as they reopen the app), each person sees "A new update is ready" with an **Update now** button. It can't be dismissed: tapping it clears stored copies of the app and reloads the latest one. Their lamb and reading are kept.

## Cost

The free Spark plan allows 50,000 database reads and 20,000 writes a day. A few flocks of up to 70 people opening the app a few times a day stay well inside it.

## Before going live

The security rules (`firestore.rules`) haven't been run in Firebase's emulator. After deploying, try them with three accounts (A, B, C):

- **A** starts a flock and adds two folds. **B** joins fold 1 with the code; **C** joins fold 2.
- A makes B a shepherd. Check B can remove a post in fold 1, but not in fold 2, and can't remove C. Check B can't make anyone a shepherd.
- C shares a fold-only reflection with an *I wonder…* question. Check B can see the question in the inbox, but can't open the reflection or reply.
- B removes a member of fold 1; check they can't rejoin with the code until A lets them back in.
- A hands the flock to B; check B now sees *Founder's tools*, and A can then leave.
- Start a second flock on C's account and check A and B can't see it.
- Sign in as A on a second phone, read on both, and check nothing is lost.
- Send a heart, then try a second heart the same day. It should be refused.

## Deploying from GitHub

The folder is ready to be a GitHub repository. `.github/workflows/deploy.yml` publishes the site and the Firestore rules and indexes every time you push to `main` (or when you run the workflow by hand from the *Actions* tab).

One-time setup:
1. Push this folder to a GitHub repository (the `wordpasture` folder's contents at the top level of the repo).
2. On a computer with the Firebase CLI: `firebase init hosting:github` inside the folder, sign in to GitHub when asked, type your repo (`you/wordpasture`), and answer **No** to "set up the workflow to run a build script", **No** to overwriting/creating workflow files (one is already included). This creates the GitHub secret `FIREBASE_SERVICE_ACCOUNT_WORDPASTURE`.
3. Give that robot account permission to update the rules: in [Google Cloud IAM](https://console.cloud.google.com/iam-admin/iam?project=wordpasture), find `github-action-…@wordpasture.iam.gserviceaccount.com`, click the pencil, and add the roles **Firebase Rules Admin** and **Cloud Datastore Index Admin**.
4. Push (or *Actions → Deploy WordPasture → Run workflow*). A green tick means it's live.
