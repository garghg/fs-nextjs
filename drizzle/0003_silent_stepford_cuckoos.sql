CREATE TABLE "reading_list" (
	"id" serial PRIMARY KEY NOT NULL,
	"saved_user_id" integer,
	"saved_blog_id" integer,
	"read" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "reading_list" ADD CONSTRAINT "reading_list_saved_user_id_users_id_fk" FOREIGN KEY ("saved_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reading_list" ADD CONSTRAINT "reading_list_saved_blog_id_blogs_id_fk" FOREIGN KEY ("saved_blog_id") REFERENCES "public"."blogs"("id") ON DELETE no action ON UPDATE no action;