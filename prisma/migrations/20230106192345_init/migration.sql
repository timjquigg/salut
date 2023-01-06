-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cocktailId" TEXT NOT NULL,
    "category" TEXT,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nameIngredient" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "strIngredient" TEXT NOT NULL,
    "strDescription" TEXT,
    "strType" TEXT,
    "strAlcohol" TEXT,
    "strABV" TEXT,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cocktail" (
    "id" TEXT NOT NULL,
    "strDrink" TEXT NOT NULL,
    "strDrinkAlternate" TEXT,
    "strTags" TEXT,
    "strVideo" TEXT,
    "strCategory" TEXT,
    "strIBA" TEXT,
    "strAlcoholic" TEXT,
    "strGlass" TEXT,
    "strInstructions" TEXT,
    "strInstructionsES" TEXT,
    "strInstructionsDE" TEXT,
    "strInstructionsFR" TEXT,
    "strInstructionsIT" TEXT,
    "strDrinkThumb" TEXT,
    "strIngredient1" TEXT,
    "strIngredient2" TEXT,
    "strIngredient3" TEXT,
    "strIngredient4" TEXT,
    "strIngredient5" TEXT,
    "strIngredient6" TEXT,
    "strIngredient7" TEXT,
    "strIngredient8" TEXT,
    "strIngredient9" TEXT,
    "strIngredient10" TEXT,
    "strIngredient11" TEXT,
    "strIngredient12" TEXT,
    "strIngredient13" TEXT,
    "strIngredient14" TEXT,
    "strIngredient15" TEXT,
    "strMeasure1" TEXT,
    "strMeasure2" TEXT,
    "strMeasure3" TEXT,
    "strMeasure4" TEXT,
    "strMeasure5" TEXT,
    "strMeasure6" TEXT,
    "strMeasure7" TEXT,
    "strMeasure8" TEXT,
    "strMeasure9" TEXT,
    "strMeasure10" TEXT,
    "strMeasure11" TEXT,
    "strMeasure12" TEXT,
    "strMeasure13" TEXT,
    "strMeasure14" TEXT,
    "strMeasure15" TEXT,
    "strImageSource" TEXT,
    "strImageAttribution" TEXT,
    "strCreativeCommonsConfirmed" TEXT,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cocktail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_nameIngredient_key" ON "Inventory"("nameIngredient");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_strIngredient_key" ON "Ingredient"("strIngredient");

-- CreateIndex
CREATE UNIQUE INDEX "Cocktail_strDrink_key" ON "Cocktail"("strDrink");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_cocktailId_fkey" FOREIGN KEY ("cocktailId") REFERENCES "Cocktail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_nameIngredient_fkey" FOREIGN KEY ("nameIngredient") REFERENCES "Ingredient"("strIngredient") ON DELETE RESTRICT ON UPDATE CASCADE;
