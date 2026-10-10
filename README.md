# WordPasture

*"Feed my lambs." (John 21:15)*

A daily Bible-reading game for your fellowship, your family, your friends. Each person keeps one lamb that stays happy as they read. People gather in **flocks** (like classes in Google Classroom). A flock is made of **folds** (small groups). Each person's own fenced home for their lamb is their **pasture**.

Plain HTML/JavaScript with no build step. Firebase (Google sign-in and the Firestore database) is loaded straight from Google's CDN, and the site is hosted free on **GitHub Pages**. Everything can be maintained from a browser.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole app |
| `firebase-config.js` | Your Firebase project's settings (already filled in for `wordpasture`) |
| `sw.js` | Service worker: lets the app install to a home screen and open offline |
| `manifest.webmanifest`, `icons/` | Home-screen app name and icons |
| `version.json` | The current version number; when it changes, everyone is asked to update |
| `bible/` | The Bible text (World English Bible), one file per book |
| `questions/` | The reflection questions for every chapter |
| `firestore.rules` | Database security rules; published in the Firebase console (it does nothing on GitHub) |

## Setting up (once)

1. **GitHub:** put all these files at the top level of a repository (upload the folder's contents, not the folder). Then *Settings → Pages → Build and deployment*: Source **Deploy from a branch**, branch **main**, folder **/ (root)**, Save. After a minute your app is at `https://<your-username>.github.io/<repo>/`.
2. **Firebase → Authentication → Sign-in method:** turn on **Google** (pick a support email) and save.
3. **Firebase → Authentication → Settings → Authorized domains:** **Add domain** `<your-username>.github.io` (no `https://`, nothing after it).
4. **Firebase → Firestore Database:** *Create database* in **production mode**, location **asia-southeast1 (Singapore)**. Then the **Rules** tab: delete what's there, paste the whole of `firestore.rules`, **Publish**.
5. Open your app's address in Safari, choose **Start a flock**, give it a name and your name, and continue with Google. You're its **founder**. Then **Share → Add to Home Screen**.

No database indexes are needed: every list the app reads works with Firestore's automatic ones.

## Releasing a change

1. Bump the version **in three places, together:** `const APP_VERSION` in `index.html` (and the "Version …" line in Settings), `version.json`, and `VERSION` at the top of `sw.js`.
2. On GitHub, upload the changed files over the old ones and commit. GitHub Pages updates within a minute or two.
3. Everyone sees "A new update is ready" with an **Update now** button the next time they open the app (or within 10 minutes if it's open). Their lamb and reading are kept.
4. **Only if `firestore.rules` changed:** Firebase console → Firestore Database → Rules → paste the whole file → **Publish**.

## An app on the home screen

- **iPhone:** open the app's address in **Safari** → **Share** → **Add to Home Screen**.
- **Android:** open it in **Chrome**; the app offers **Add to home screen** (or ⋮ → *Install app*).
- The app shows these steps itself after someone's first reading, and any time in *Settings › On your phone*.
- Installed, it opens full screen with the lamb icon and **works offline**: the app, the Bible, the questions and the flock's latest data are kept on the phone, and anything done offline is sent when the signal returns.

## Sign-in

People sign in with **Google**, in a small pop-up. There are no passwords. Using the same Google account on any phone brings back the same lamb. If sign-in shows "This web address isn't allowed to sign in yet", add the app's domain in *Authentication → Settings → Authorized domains* (step 3).

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

- **Where things are:** `flocks/{flockId}` holds each flock (with `members`, `groups` (folds, each with its fold-only `reflections`), `reflections` (whole-flock), `questions`, `cheers` (hearts), `notes`, `replies`, `rhearts`, `removed`, `config/plan` inside), `codes/{CODE}` points a code to its flock, and `users/{uid}` (with `journal`) holds each person's lamb.
- **Someone has a new phone:** they open the app's address, tap *Already joined? Sign in with Google*, and choose the same Google account.
- **Someone used the wrong Google account:** they sign out (*Settings › Your account*) and sign in with the right one. Each Google account has its own lamb.

## Cost

The free Spark plan allows 50,000 database reads and 20,000 writes a day. A few flocks of up to 70 people opening the app a few times a day stay well inside it.

