ALTER TABLE "crowdfunding" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "crowdfunding" ADD COLUMN "total_donations" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "crowdfunding" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "crowdfunding" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;


-- Trigger to update the total_donations column when a donation is made
CREATE OR REPLACE FUNCTION update_total_donations()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE "crowdfunding" SET "total_donations" = "total_donations" + NEW."amount" WHERE "id" = NEW."crowndfunding_id";
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_crowdfunding_donations
    AFTER INSERT ON "donation"
    FOR EACH ROW
    EXECUTE FUNCTION update_total_donations();

-- Trigger to update the total_donations column when a donation is updated
CREATE OR REPLACE FUNCTION update_total_donations()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE "crowdfunding" SET "total_donations" = "total_donations" - OLD."amount" + NEW."amount" WHERE "id" = NEW."crowndfunding_id";
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_crowdfunding_donations
    AFTER UPDATE ON "donation"
    FOR EACH ROW
    EXECUTE FUNCTION update_total_donations();


-- Trigger to update the total_donations column when a crowdfunding is deleted
CREATE OR REPLACE FUNCTION update_total_donations()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE "crowdfunding" SET "total_donations" = "total_donations" - OLD."amount" WHERE "id" = OLD."crowndfunding_id";
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_crowdfunding_donations
    AFTER DELETE ON "donation"
    FOR EACH ROW
    EXECUTE FUNCTION update_total_donations();