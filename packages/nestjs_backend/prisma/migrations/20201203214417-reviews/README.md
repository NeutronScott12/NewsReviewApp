# Migration `20201203214417-reviews`

This migration has been generated at 12/3/2020, 9:44:17 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Review" (
"id" SERIAL,
    "title" TEXT NOT NULL
)

CREATE UNIQUE INDEX "Review.title_unique" ON "Review"("title")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201203214417-reviews
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,17 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Review {
+    id Int @default(autoincrement())
+    title String @unique
+    // createdAt DateTime @default(now())
+}
```


