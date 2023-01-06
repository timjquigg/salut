-- AlterTable
ALTER TABLE "Cocktail" ALTER COLUMN "dateModified" DROP NOT NULL,
ALTER COLUMN "dateModified" SET DATA TYPE TEXT;
