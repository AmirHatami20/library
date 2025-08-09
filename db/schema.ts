import {
    pgTable,
    text,
    uuid,
    integer,
    timestamp,
    pgEnum,
    primaryKey,
} from 'drizzle-orm/pg-core';

// ENUMS
export const userRoleEnum = pgEnum('user_role', ['user', 'admin']);

// GENRES TABLE
export const genres = pgTable('genres', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull().unique(),
});

// BOOKS TABLE
export const books = pgTable('books', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    author: text('author').notNull(),
    price: integer('price').notNull(),
    color: text('color').notNull(),
    summary: text('summary').default(""),
    image: text('image').default(""),
    createdAt: timestamp('created_at').defaultNow(),
});

// MANY-TO-MANY BOOKS <-> GENRES
export const bookGenres = pgTable('book_genres', {
        bookId: uuid('book_id')
            .notNull()
            .references(() => books.id, {onDelete: 'cascade'}),
        genreId: uuid('genre_id')
            .notNull()
            .references(() => genres.id, {onDelete: 'cascade'}),
    },
    (table) => ({
        pk: primaryKey({columns: [table.bookId, table.genreId]}),
    })
);

// USERS TABLE
export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    fullName: text('full_name').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    image: text('image').default(""),
    role: userRoleEnum('role').default('user'),
});
