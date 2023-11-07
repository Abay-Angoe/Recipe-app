-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "cuisine" DROP NOT NULL,
ALTER COLUMN "dietaryRestrictions" DROP NOT NULL,
ALTER COLUMN "dietaryRestrictions" SET DATA TYPE TEXT;
