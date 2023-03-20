-- CreateTable
CREATE TABLE "agency" (
    "agency_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "phone" VARCHAR NOT NULL,
    "addr" VARCHAR NOT NULL,
    "logo" VARCHAR,

    CONSTRAINT "agency_pkey" PRIMARY KEY ("agency_id")
);

-- CreateTable
CREATE TABLE "agent" (
    "agent_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "full_name" VARCHAR NOT NULL,
    "avatar" VARCHAR,
    "agency_id" UUID,

    CONSTRAINT "agent_pkey" PRIMARY KEY ("agent_id")
);

-- CreateTable
CREATE TABLE "agentBio" (
    "agent_id" UUID NOT NULL,
    "addr" VARCHAR NOT NULL,
    "city" VARCHAR NOT NULL,
    "prov" VARCHAR NOT NULL,
    "phone" VARCHAR NOT NULL,

    CONSTRAINT "agentBio_pkey" PRIMARY KEY ("agent_id")
);

-- CreateTable
CREATE TABLE "owner" (
    "id" UUID NOT NULL,
    "nik" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "phone" VARCHAR NOT NULL,
    "addr" VARCHAR NOT NULL,

    CONSTRAINT "owner_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photos" (
    "image_id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "image" VARCHAR[],

    CONSTRAINT "id" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "prop_detail" (
    "prop_type" VARCHAR NOT NULL,
    "lt" INTEGER NOT NULL,
    "lb" INTEGER,
    "km" SMALLINT,
    "kt" SMALLINT,
    "floor" SMALLINT,
    "cert" VARCHAR NOT NULL,
    "power" INTEGER,
    "carport" SMALLINT,
    "garage" SMALLINT,
    "condition" VARCHAR,
    "facing" VARCHAR,
    "year" INTEGER,
    "furniture" VARCHAR,
    "prop_id" VARCHAR NOT NULL,
    "prop_sale" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "area" INTEGER NOT NULL,

    CONSTRAINT "prop_detail_pkey" PRIMARY KEY ("prop_id")
);

-- CreateTable
CREATE TABLE "property_list" (
    "prop_name" VARCHAR NOT NULL,
    "price" INTEGER NOT NULL,
    "prop_prov" VARCHAR NOT NULL,
    "prop_city" VARCHAR NOT NULL,
    "agent_id" UUID NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "id" VARCHAR NOT NULL,
    "dateAdded" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image_id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,

    CONSTRAINT "prop_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trans_data" (
    "id" UUID NOT NULL,
    "prop_id" VARCHAR NOT NULL,
    "buyer_name" VARCHAR NOT NULL,
    "buyer_phone" VARCHAR NOT NULL,
    "buyer_addr" VARCHAR NOT NULL,
    "total_price" INTEGER NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transaction" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "agent" ADD CONSTRAINT "agency" FOREIGN KEY ("agency_id") REFERENCES "agency"("agency_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agentBio" ADD CONSTRAINT "agent_id" FOREIGN KEY ("agent_id") REFERENCES "agent"("agent_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prop_detail" ADD CONSTRAINT "prop_id" FOREIGN KEY ("prop_id") REFERENCES "property_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_list" ADD CONSTRAINT "agent_id" FOREIGN KEY ("agent_id") REFERENCES "agent"("agent_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "property_list" ADD CONSTRAINT "image" FOREIGN KEY ("image_id") REFERENCES "photos"("image_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "property_list" ADD CONSTRAINT "owner" FOREIGN KEY ("owner_id") REFERENCES "owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trans_data" ADD CONSTRAINT "prop_id" FOREIGN KEY ("prop_id") REFERENCES "property_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
