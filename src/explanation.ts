// const value = {
//     a: 5,
//     b: "name"
// }

// base-64-encode: ==> {} --> string

// public op --> users --> action ==> register, notes
// private op ---> admin --> actions ==> db schema, tables, etc

// api key -- JSON

// env --> string

// 2-table
// 1. documents ---> title, id(unique)
// 2. users ----> user | email(unique) => rooms | related documents =>  document-id (unique) (foriegn key)
// { room-id (document-id), user-id(email), role(owner, editor), date(creation) }

// liveblocks-db ==> room-id | text

// CASE
// 1. documents ---> title, id(unique) | rooms | related users =>  email (unique) (foriegn key)
// { room-id (liveblocks), user-id(email), role(owner, editor), date(creation) }
// 2. users ----> user | email(unique)

// auth check ==>
// store krne wala data [ user detail (sessions | firebase-hooks), data] ==>
// fetch collection ==>
// store | operations (jitni jagah krna h waha kr diye)

// DELETE
// doc-id -> doc delete |  users -- doc reference delete
// liveblocks - room delete

// ------------------------------------------------------

// SITTING-1
// 1. folder struc-- done
// 2. note--done
// 3. update action--done
// 4. UI--done

// SITTING-2
// 1. liveblocks

// AFTER MID TERM
// --

// target -> owner
// user table-> iterate -> each user -> check | doc ref - exists? -> yes :: editor ? owner => owner => return

// users - doc ref | owners | owners list - current user exist?

// example-[A,B,C,D]- doc access
// owner list - [B,D]
// 2 case -
// 1. A - false
// 2. B - true
