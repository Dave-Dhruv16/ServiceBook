
import { pgTable, uuid, varchar, text, decimal, integer, boolean, timestamp, time, date, jsonb, primaryKey, foreignKey, check, index } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

// -----------------------------------------------------------------------------
// 1. Users (Auth)
// -----------------------------------------------------------------------------
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 50, enum: ["CUSTOMER", "PROVIDER", "ADMIN"] }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => {
  return {
    emailIdx: index("idx_users_email").on(table.email),
  };
});

export const usersRelations = relations(users, ({ one, many }) => ({
  providerProfile: one(providerProfiles, {
    fields: [users.id],
    references: [providerProfiles.userId],
  }),
  appointments: many(appointments),
  reviews: many(reviews),
}));

// -----------------------------------------------------------------------------
// 2. Provider Profiles (Public Info)
// -----------------------------------------------------------------------------
export const providerProfiles = pgTable("provider_profiles", {
  userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  displayName: varchar("display_name", { length: 255 }).notNull(),
  bio: text("bio"),
  location: varchar("location", { length: 255 }),
  avatarUrl: varchar("avatar_url", { length: 255 }),
  ratingAvg: decimal("rating_avg", { precision: 3, scale: 2 }).default("0.00"),
  reviewCount: integer("review_count").default(0),
  isVerified: boolean("is_verified").default(false),
  settings: jsonb("settings").default({}),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const providerProfilesRelations = relations(providerProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [providerProfiles.userId],
    references: [users.id],
  }),
  services: many(services),
  workingHours: many(workingHours),
  blockedSlots: many(blockedSlots),
  appointments: many(appointments),
}));

// -----------------------------------------------------------------------------
// 3. Services
// -----------------------------------------------------------------------------
export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  providerId: uuid("provider_id").notNull().references(() => providerProfiles.userId, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  durationMin: integer("duration_min").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => {
  return {
    providerIdx: index("idx_services_provider").on(table.providerId),
    categoryPriceIdx: index("idx_services_category_price").on(table.category, table.price),
  };
});

export const servicesRelations = relations(services, ({ one, many }) => ({
  provider: one(providerProfiles, {
    fields: [services.providerId],
    references: [providerProfiles.userId],
  }),
  appointments: many(appointments),
}));

// -----------------------------------------------------------------------------
// 4. Working Hours (Availability Rules)
// -----------------------------------------------------------------------------
export const workingHours = pgTable("working_hours", {
  id: uuid("id").defaultRandom().primaryKey(),
  providerId: uuid("provider_id").notNull().references(() => providerProfiles.userId, { onDelete: "cascade" }),
  dayOfWeek: integer("day_of_week").notNull(), // 0-6
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
});

export const workingHoursRelations = relations(workingHours, ({ one }) => ({
  provider: one(providerProfiles, {
    fields: [workingHours.providerId],
    references: [providerProfiles.userId],
  }),
}));

// -----------------------------------------------------------------------------
// 5. Blocked Slots (Exceptions)
// -----------------------------------------------------------------------------
export const blockedSlots = pgTable("blocked_slots", {
  id: uuid("id").defaultRandom().primaryKey(),
  providerId: uuid("provider_id").notNull().references(() => providerProfiles.userId, { onDelete: "cascade" }),
  blockDate: date("block_date").notNull(),
  startTime: time("start_time"), // if null, full day
  endTime: time("end_time"),
  note: varchar("note", { length: 255 }),
});

export const blockedSlotsRelations = relations(blockedSlots, ({ one }) => ({
  provider: one(providerProfiles, {
    fields: [blockedSlots.providerId],
    references: [providerProfiles.userId],
  }),
}));

// -----------------------------------------------------------------------------
// 6. Appointments
// -----------------------------------------------------------------------------
export const appointments = pgTable("appointments", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerId: uuid("customer_id").notNull().references(() => users.id),
  providerId: uuid("provider_id").notNull().references(() => providerProfiles.userId),
  serviceId: uuid("service_id").notNull().references(() => services.id),
  
  startTime: timestamp("start_time", { withTimezone: true }).notNull(),
  endTime: timestamp("end_time", { withTimezone: true }).notNull(),
  
  status: varchar("status", { length: 50, enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "NO_SHOW"] }).notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  notes: text("notes"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => {
  return {
    conflictIdx: index("idx_appointments_conflict").on(table.providerId, table.startTime, table.endTime), // Partial index condition not supported in simple Drizzle syntax yet, but logical
    customerIdx: index("idx_appointments_customer").on(table.customerId, table.startTime),
  };
});

export const appointmentsRelations = relations(appointments, ({ one, many }) => ({
  customer: one(users, {
    fields: [appointments.customerId],
    references: [users.id],
  }),
  provider: one(providerProfiles, {
    fields: [appointments.providerId],
    references: [providerProfiles.userId],
  }),
  service: one(services, {
    fields: [appointments.serviceId],
    references: [services.id],
  }),
  review: one(reviews, { // One-to-one relation usually defined on the side holding the FK, review holds it
    fields: [appointments.id],
    references: [reviews.appointmentId],
  }),
}));

// -----------------------------------------------------------------------------
// 7. Reviews
// -----------------------------------------------------------------------------
export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  appointmentId: uuid("appointment_id").notNull().references(() => appointments.id).unique(),
  customerId: uuid("customer_id").notNull().references(() => users.id),
  providerId: uuid("provider_id").notNull().references(() => providerProfiles.userId),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => {
  return {
    providerReviewsIdx: index("idx_reviews_provider").on(table.providerId),
  };
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  appointment: one(appointments, {
    fields: [reviews.appointmentId],
    references: [appointments.id],
  }),
  customer: one(users, {
    fields: [reviews.customerId],
    references: [users.id],
  }),
  provider: one(providerProfiles, {
    fields: [reviews.providerId],
    references: [providerProfiles.userId],
  }),
}));
