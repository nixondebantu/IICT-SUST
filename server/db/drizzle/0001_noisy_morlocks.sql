CREATE TABLE "director_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"message" text NOT NULL,
	"name" text NOT NULL,
	"designation" text NOT NULL,
	"image_url" text,
	"is_active" boolean DEFAULT false NOT NULL,
	"creator_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "director_messages" ADD CONSTRAINT "director_messages_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;