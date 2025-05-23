CREATE TABLE "crowdfunding" (
	"id" serial PRIMARY KEY NOT NULL,
	"goal" integer NOT NULL,
	"user_id" integer NOT NULL,
	"end_date" date NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crowdfunding_to_user" (
	"crowdfunding_id" integer NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "donation" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"crowndfunding_id" integer NOT NULL,
	"amount" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"username" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "crowdfunding" ADD CONSTRAINT "crowdfunding_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crowdfunding_to_user" ADD CONSTRAINT "crowdfunding_to_user_crowdfunding_id_crowdfunding_id_fk" FOREIGN KEY ("crowdfunding_id") REFERENCES "public"."crowdfunding"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crowdfunding_to_user" ADD CONSTRAINT "crowdfunding_to_user_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "donation" ADD CONSTRAINT "donation_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "donation" ADD CONSTRAINT "donation_crowndfunding_id_crowdfunding_id_fk" FOREIGN KEY ("crowndfunding_id") REFERENCES "public"."crowdfunding"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_email" ON "user" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_username" ON "user" USING btree ("username");