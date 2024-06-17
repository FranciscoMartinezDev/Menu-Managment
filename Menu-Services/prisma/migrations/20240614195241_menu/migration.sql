-- CreateTable
CREATE TABLE "Products" (
    "IdProduct" SERIAL NOT NULL,
    "Name" VARCHAR(100) NOT NULL,
    "Ingredients" JSON NOT NULL,
    "Customizable" BOOLEAN NOT NULL,
    "Size" JSON NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,
    "Include" JSON,
    "Availability" BOOLEAN,
    "productGroupsId" INTEGER,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("IdProduct")
);

-- CreateTable
CREATE TABLE "ProductGroups" (
    "IdProductGroup" SERIAL NOT NULL,
    "Name" VARCHAR(100) NOT NULL,

    CONSTRAINT "ProductGroups_pkey" PRIMARY KEY ("IdProductGroup")
);

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_productGroupsId_fkey" FOREIGN KEY ("productGroupsId") REFERENCES "ProductGroups"("IdProductGroup") ON DELETE SET NULL ON UPDATE CASCADE;
