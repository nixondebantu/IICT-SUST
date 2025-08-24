CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"location" text NOT NULL,
	"capacity" integer,
	"cta_title" text NOT NULL,
	"cta_url" text NOT NULL,
	"contact_number" text,
	"contact_mail" text,
	"contact_person" text,
	"image_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"creator_id" integer,
	"tag_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "files" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"url" text NOT NULL,
	"entity_id" integer NOT NULL,
	"entity_type" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "news" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"image_url" text NOT NULL,
	"date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"creator_id" integer,
	"tag_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notices_to_tags" (
	"notice_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "notices_to_tags_notice_id_tag_id_pk" PRIMARY KEY("notice_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "program" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"short_description" text NOT NULL,
	"duration" text NOT NULL,
	"credit" text NOT NULL,
	"degree" text NOT NULL,
	"apply_instructions" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "program_sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"program_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"type" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "notices" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "role_permissions" ALTER COLUMN "role_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "role_permissions" ALTER COLUMN "permission_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_roles" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_roles" ALTER COLUMN "role_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "news" ADD CONSTRAINT "news_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "news" ADD CONSTRAINT "news_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notices_to_tags" ADD CONSTRAINT "notices_to_tags_notice_id_notices_id_fk" FOREIGN KEY ("notice_id") REFERENCES "public"."notices"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notices_to_tags" ADD CONSTRAINT "notices_to_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "program_sections" ADD CONSTRAINT "program_sections_program_id_program_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."program"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_tag_idx" ON "tags" USING btree ("value","type");--> statement-breakpoint
ALTER TABLE "director_messages" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "director_messages" DROP COLUMN "designation";--> statement-breakpoint
ALTER TABLE "director_messages" DROP COLUMN "image_url";--> statement-breakpoint
ALTER TABLE "director_messages" DROP COLUMN "is_active";--> statement-breakpoint
ALTER TABLE "notices" DROP COLUMN "file_url";