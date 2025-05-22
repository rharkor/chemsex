CREATE TABLE "crowdfunding" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"goal" integer NOT NULL,
	"user_id" varchar(36) NOT NULL,
	"end_date" date NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_donor" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"user_id" varchar(36) NOT NULL,
	"crowndfunding_id" varchar(36) NOT NULL,
	"amount" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"username" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "users" CASCADE;