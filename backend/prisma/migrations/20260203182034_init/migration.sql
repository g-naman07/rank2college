-- CreateTable
CREATE TABLE "College" (
    "id" SERIAL NOT NULL,
    "institute" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "quota" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "openingRank" INTEGER NOT NULL,
    "closingRank" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "round" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "College_category_quota_closingRank_idx" ON "College"("category", "quota", "closingRank");
