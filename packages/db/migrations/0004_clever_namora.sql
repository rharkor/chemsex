ALTER TABLE "crowdfunding" ALTER COLUMN "user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "user_donor" ALTER COLUMN "user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "user_donor" ALTER COLUMN "crowndfunding_id" SET DATA TYPE integer;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_email" ON "user" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_username" ON "user" USING btree ("username");