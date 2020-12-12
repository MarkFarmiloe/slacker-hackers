CREATE TABLE "mentors" (
	"id" serial NOT NULL,
	"slackUserId" character varying(20) NOT NULL UNIQUE,
	"defaultLocationId" bigint NOT NULL,
	CONSTRAINT "mentors_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "trainees" (
	"id" serial NOT NULL,
	"slackUserId" character varying(20) NOT NULL UNIQUE,
	"classId" bigint NOT NULL,
	CONSTRAINT "trainees_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "locations" (
	"id" serial NOT NULL,
	"name" character varying(40) NOT NULL UNIQUE,
	CONSTRAINT "locations_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "classes" (
	"id" serial NOT NULL,
	"locationId" bigint NOT NULL,
	"name" character varying(40) NOT NULL,
	"startDate" DATE NOT NULL,
	CONSTRAINT "classes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "thresholds" (
	"id" serial NOT NULL,
	"mentorId" bigint NOT NULL,
	"classId" bigint NOT NULL,
	"postsWeight" integer NOT NULL,
	"callsCountWeight" integer NOT NULL,
	"callsTimeWeight" integer NOT NULL,
	"threshold" integer NOT NULL,
	CONSTRAINT "thresholds_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "posts" (
	"id" serial NOT NULL,
	"slackUserId" bigint NOT NULL,
	"slackChannelId" bigint NOT NULL,
	"timestamp" DATE NOT NULL,
	"isReply" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "mentors" ADD CONSTRAINT "mentors_fk0" FOREIGN KEY ("defaultLocationId") REFERENCES "locations"("id");

ALTER TABLE "trainees" ADD CONSTRAINT "trainees_fk0" FOREIGN KEY ("classId") REFERENCES "classes"("id");

ALTER TABLE "classes" ADD CONSTRAINT "classes_fk0" FOREIGN KEY ("locationId") REFERENCES "locations"("id");

ALTER TABLE "thresholds" ADD CONSTRAINT "thresholds_fk0" FOREIGN KEY ("mentorId") REFERENCES "mentors"("id");
ALTER TABLE "thresholds" ADD CONSTRAINT "thresholds_fk1" FOREIGN KEY ("classId") REFERENCES "classes"("id");
