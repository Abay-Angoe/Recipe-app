-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "thought" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "country" TEXT,
    "rating" INTEGER NOT NULL,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
