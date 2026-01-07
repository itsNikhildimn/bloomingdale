//---------------------------------------------------------------------------
// Module:  $lib/UserSessions.js
//---------------------------------------------------------------------------

import sqlite3 from 'sqlite3';
import crypto from 'crypto';

const dbName = 'sessions.db';

const passwordSalt = 'khwg4ro87weidyvjs eriunvbopiu`naeskjnt alshu cvoyt';
const tokenSalt = '9 8odysruvhwekutha iweu pawushdlkzhjwl ceuahw eo;i';

const TWENTY_MINUTES = 20 * 60 * 60 * 1000;

// The following is a hard-coded table of valid users and their MD5-coded
// passwords. To generate a new password, use the commmand-line tool 'md5'
// (Mac or Linux) and pass in the desired password with the above 'salt'
// string appended to it.

const validUsers = new Map([
  ['bd-admin', '901a3c50f679c4dd12831990f1ddd6a7']
]);

//---------------------------------------------------------------------------
// createSession
//    Called to generate a new session token for the given user. Checks that
// the user is known and guarantees that the token will be unique.
//---------------------------------------------------------------------------

export async function createSession(user, password) {
  // Create a Promise for the async calls below ...
  return new Promise((resolve, reject) => {
    const rwd = validUsers.get(user),
          pwd = crypto.createHash('md5').update(password + passwordSalt).digest('hex');

    // First check that the user is known and that the given password is
    // correct.
    if (pwd !== rwd) return reject(new Error('Bad username or password'));

    // Next open the database, which should already exist and have a valid
    // schema.
    const db = new sqlite3.Database(dbName, sqlite3.OPEN_READWRITE, (err) => {
      if (err) return reject(new Error("Failed to open database", {cause: err}));
    });

    // Serialize db access...
    db.serialize(() => {
      let token, found;
      const now = (new Date()).toISOString(),
            expires = (new Date(Date.now() + TWENTY_MINUTES)).toISOString();

      // Make a new, random token and check it is unique. Loop until we have
      // one that is.
      do {
        const rb = crypto.randomBytes(16).toString('hex');
        token = crypto.createHash('md5').update(rb + tokenSalt).digest('hex');
        db.get(
          'SELECT count(*) FROM sessions WHERE token = ? AND user <> ?',
          [token, user],
          (err, row) => {
            if (err) return reject(Error('Database read failed', {cause: err}));
            found = (row && true);
          }
        );
      } while (found);

      // Insert the new token into the database, for this user, replacing
      // that for any old session. [The user name is a primary key.]
      db.run(
        `INSERT OR REPLACE INTO sessions(user, token, expires) VALUES (?,?,?)`,
        [user, token, expires]
      );

      // Delete all expired tokens (only now, after we have inserted a new,
      // unique token for this user).
      db.run(
        'DELETE FROM sessions WHERE expires < ?',
        [now]
      );

      // And finally close the database.
      db.close(() => resolve(token));
    });
  });
}

//---------------------------------------------------------------------------
// updateSession
//    Called to generate a new session token to replace a given one. This
// only requires the old session token (which we already know is unique).
//---------------------------------------------------------------------------

export function updateSession(replacing) {
  // Create a Promise for the async calls below ...
  return new Promise((resolve, reject) => {

    // Open the database
    const db = new sqlite3.Database(dbName, sqlite3.OPEN_READWRITE, (err) => {
      if (err) return reject(new Error("Failed to open database", err));
    });

    // Serialize db access...
    db.serialize(() => {
      let token, found;
      const now = (new Date()).toISOString(),
            expires = (new Date(Date.now() + TWENTY_MINUTES)).toISOString();

      // Make a new, random token and check it is unique. Loop until we have
      // one that is.
      do {
        const rb = crypto.randomBytes(16).toString('hex');
        token = crypto.createHash('md5').update(rb + tokenSalt).digest('hex');
        db.get(
          'SELECT count(*) FROM sessions WHERE token = ?',
          [token],
          (err, row) => {
            if (err) return reject(new Error('Database read failed', {cause: err}));
            found = (row && true);
          }
        );
      } while (found);

      // Insert the new token into the database, for this user, replacing
      // that for the old session.
      db.run(
        `UPDATE users SET token = ?, expires = ? WHERE token = ?`,
        [token, expires, replacing]
      );

      // Delete all expired tokens (only now, after we have inserted a new,
      // unique token for this user).
      db.run(
        'DELETE FROM sessions WHERE expires < ?',
        [now]
      );

      // And finally close the database.
      db.close(() => resolve(token));
    });
  });
}

//---------------------------------------------------------------------------
// validSession
//    Called to check that a given session token is (still) valid.
//---------------------------------------------------------------------------

export async function validSession(token) {
  // Create a Promise for the async calls below ...
  return new Promise((resolve, reject) => {
    let found = false;  

    // Open the database
    const db = new sqlite3.Database(dbName, sqlite3.OPEN_READWRITE, (err) => {
      if (err) return reject(new Error("Failed to open database", {cause: err}));
    });

    // Serialize db access...
    db.serialize(() => {
      const now = (new Date()).toISOString();

      db.get(
        'SELECT user FROM sessions WHERE token = ? AND expires > ?',
        [token, now],
        (err, row) => {
          if (err) return reject(new Error('Database read failed', {cause: err}));
          if (row) found = true;
        }
      );

      db.close(() => resolve(found));
    });
  });
}