-- CreateTable
CREATE TABLE "MarksVsRank" (
    "id" SERIAL NOT NULL,
    "minMarks" INTEGER NOT NULL,
    "percentile" DOUBLE PRECISION NOT NULL,
    "year" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MarksVsRank_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MarksVsRank_year_minMarks_idx" ON "MarksVsRank"("year", "minMarks");
