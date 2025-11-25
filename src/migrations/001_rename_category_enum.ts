import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  // Rename the enum from snacks_category to emeralds_category
  await payload.db.drizzle.execute(
    payload.db.drizzle.sql`ALTER TYPE "enum_snacks_category" RENAME TO "enum_emeralds_category";`,
  )
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // Reverse the rename
  await payload.db.drizzle.execute(
    payload.db.drizzle.sql`ALTER TYPE "enum_emeralds_category" RENAME TO "enum_snacks_category";`,
  )
}