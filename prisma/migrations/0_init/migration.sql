-- CreateTable
CREATE TABLE "books" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "sort" INTEGER,
    "user_created" TEXT,
    "date_created" DATETIME,
    "user_updated" TEXT,
    "date_updated" DATETIME,
    CONSTRAINT "books_user_updated_fkey" FOREIGN KEY ("user_updated") REFERENCES "directus_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "books_user_created_fkey" FOREIGN KEY ("user_created") REFERENCES "directus_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "books_translations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "books_id" INTEGER,
    "languages_code" TEXT,
    "name" TEXT,
    CONSTRAINT "books_translations_books_id_fkey" FOREIGN KEY ("books_id") REFERENCES "books" ("id") ON DELETE SET NULL ON UPDATE NO ACTION,
    CONSTRAINT "books_translations_languages_code_fkey" FOREIGN KEY ("languages_code") REFERENCES "languages" ("code") ON DELETE SET NULL ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "directus_activity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "action" TEXT NOT NULL,
    "user" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT,
    "user_agent" TEXT,
    "collection" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "comment" TEXT,
    "origin" TEXT
);

-- CreateTable
CREATE TABLE "directus_collections" (
    "collection" TEXT NOT NULL PRIMARY KEY,
    "icon" TEXT,
    "note" TEXT,
    "display_template" TEXT,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "singleton" BOOLEAN NOT NULL DEFAULT false,
    "translations" json,
    "archive_field" TEXT,
    "archive_app_filter" BOOLEAN NOT NULL DEFAULT true,
    "archive_value" TEXT,
    "unarchive_value" TEXT,
    "sort_field" TEXT,
    "accountability" TEXT DEFAULT 'all',
    "color" TEXT,
    "item_duplication_fields" json,
    "sort" INTEGER,
    "group" TEXT,
    "collapse" TEXT NOT NULL DEFAULT 'open',
    "preview_url" TEXT,
    "versioning" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "directus_collections_group_fkey" FOREIGN KEY ("group") REFERENCES "directus_collections" ("collection") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "directus_dashboards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'dashboard',
    "note" TEXT,
    "date_created" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "user_created" TEXT,
    "color" TEXT,
    CONSTRAINT "directus_dashboards_user_created_fkey" FOREIGN KEY ("user_created") REFERENCES "directus_users" ("id") ON DELETE SET NULL ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "directus_extensions" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "enabled" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "directus_fields" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "collection" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "special" TEXT,
    "interface" TEXT,
    "options" json,
    "display" TEXT,
    "display_options" json,
    "readonly" BOOLEAN NOT NULL DEFAULT false,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "sort" INTEGER,
    "width" TEXT DEFAULT 'full',
    "translations" json,
    "note" TEXT,
    "conditions" json,
    "required" BOOLEAN DEFAULT false,
    "group" TEXT,
    "validation" json,
    "validation_message" TEXT
);

-- CreateTable
CREATE TABLE "directus_files" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "storage" TEXT NOT NULL,
    "filename_disk" TEXT,
    "filename_download" TEXT NOT NULL,
    "title" TEXT,
    "type" TEXT,
    "folder" TEXT,
    "uploaded_by" TEXT,
    "uploaded_on" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT,
    "modified_on" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "charset" TEXT,
    "filesize" BIGINT,
    "width" INTEGER,
    "height" INTEGER,
    "duration" INTEGER,
    "embed" TEXT,
    "description" TEXT,
    "location" TEXT,
    "tags" TEXT,
    "metadata" json,
    CONSTRAINT "directus_files_folder_fkey" FOREIGN KEY ("folder") REFERENCES "directus_folders" ("id") ON DELETE SET NULL ON UPDATE NO ACTION,
    CONSTRAINT "directus_files_modified_by_fkey" FOREIGN KEY ("modified_by") REFERENCES "directus_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "directus_files_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "directus_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "directus_flows" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "color" TEXT,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "trigger" TEXT,
    "accountability" TEXT DEFAULT 'all',
    "options" json,
    "operation" TEXT,
    "date_created" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "user_created" TEXT,
    CONSTRAINT "directus_flows_user_created_fkey" FOREIGN KEY ("user_created") REFERENCES "directus_users" ("id") ON DELETE SET NULL ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "directus_folders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "parent" TEXT,
    CONSTRAINT "directus_folders_parent_fkey" FOREIGN KEY ("parent") REFERENCES "directus_folders" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "directus_migrations" (
    "version" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "timestamp" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "directus_notifications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timestamp" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT DEFAULT 'inbox',
    "recipient" TEXT NOT NULL,
    "sender" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT,
    "collection" TEXT,
    "item" TEXT,
    CONSTRAINT "directus_notifications_sender_fkey" FOREIGN KEY ("sender") REFERENCES "directus_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "directus_notifications_recipient_fkey" FOREIGN KEY ("recipient") REFERENCES "directus_users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "directus_operations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "key" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "position_x" INTEGER NOT NULL,
    "position_y" INTEGER NOT NULL,
    "options" json,
    "resolve" TEXT,
    "reject" TEXT,
    "flow" TEXT NOT NULL,
    "date_created" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "user_created" TEXT,
    CONSTRAINT "directus_operations_user_created_fkey" FOREIGN KEY ("user_created") REFERENCES "directus_users" ("id") ON DELETE SET NULL ON UPDATE NO ACTION,
    CONSTRAINT "directus_operations_flow_fkey" FOREIGN KEY ("flow") REFERENCES "directus_flows" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "directus_operations_reject_fkey" FOREIGN KEY ("reject") REFERENCES "directus_operations" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "directus_operations_resolve_fkey" FOREIGN KEY ("resolve") REFERENCES "directus_operations" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "directus_panels" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dashboard" TEXT NOT NULL,
    "name" TEXT,
    "icon" TEXT,
    "color" TEXT,
    "show_header" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT,
    "type" TEXT NOT NULL,
    "position_x" INTEGER NOT NULL,
    "position_y" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "options" json,
    "date_created" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "user_created" TEXT,
    CONSTRAINT "directus_panels_user_created_fkey" FOREIGN KEY ("user_created") REFERENCES "directus_users" ("id") ON DELETE SET NULL ON UPDATE NO ACTION,
    CONSTRAINT "directus_panels_dashboard_fkey" FOREIGN KEY ("dashboard") REFERENCES "directus_dashboards" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "directus_permissions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT,
    "collection" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "permissions" json,
    "validation" json,
    "presets" json,
    "fields" TEXT,
    CONSTRAINT "directus_permissions_role_fkey" FOREIGN KEY ("role") REFERENCES "directus_roles" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "directus_presets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bookmark" TEXT,
    "user" TEXT,
    "role" TEXT,
    "collection" TEXT,
    "search" TEXT,
    "layout" TEXT DEFAULT 'tabular',
    "layout_query" json,
    "layout_options" json,
    "refresh_interval" INTEGER,
    "filter" json,
    "icon" TEXT DEFAULT 'bookmark',
    "color" TEXT,
    CONSTRAINT "directus_presets_role_fkey" FOREIGN KEY ("role") REFERENCES "directus_roles" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "directus_presets_user_fkey" FOREIGN KEY ("user") REFERENCES "directus_users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "directus_relations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "many_collection" TEXT NOT NULL,
    "many_field" TEXT NOT NULL,
    "one_collection" TEXT,
    "one_field" TEXT,
    "one_collection_field" TEXT,
    "one_allowed_collections" TEXT,
    "junction_field" TEXT,
    "sort_field" TEXT,
    "one_deselect_action" TEXT NOT NULL DEFAULT 'nullify'
);

-- CreateTable
CREATE TABLE "directus_revisions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "activity" INTEGER NOT NULL,
    "collection" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "data" json,
    "delta" json,
    "parent" INTEGER,
    "version" TEXT,
    CONSTRAINT "directus_revisions_version_fkey" FOREIGN KEY ("version") REFERENCES "directus_versions" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "directus_revisions_activity_fkey" FOREIGN KEY ("activity") REFERENCES "directus_activity" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "directus_revisions_parent_fkey" FOREIGN KEY ("parent") REFERENCES "directus_revisions" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "directus_roles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'supervised_user_circle',
    "description" TEXT,
    "ip_access" TEXT,
    "enforce_tfa" BOOLEAN NOT NULL DEFAULT false,
    "admin_access" BOOLEAN NOT NULL DEFAULT false,
    "app_access" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "directus_sessions" (
    "token" TEXT NOT NULL PRIMARY KEY,
    "user" TEXT,
    "expires" DATETIME NOT NULL,
    "ip" TEXT,
    "user_agent" TEXT,
    "share" TEXT,
    "origin" TEXT,
    CONSTRAINT "directus_sessions_share_fkey" FOREIGN KEY ("share") REFERENCES "directus_shares" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "directus_sessions_user_fkey" FOREIGN KEY ("user") REFERENCES "directus_users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "directus_settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "project_name" TEXT NOT NULL DEFAULT 'Directus',
    "project_url" TEXT,
    "project_color" TEXT NOT NULL DEFAULT '#6644FF',
    "project_logo" TEXT,
    "public_foreground" TEXT,
    "public_background" TEXT,
    "public_note" TEXT,
    "auth_login_attempts" INTEGER DEFAULT 25,
    "auth_password_policy" TEXT,
    "storage_asset_transform" TEXT DEFAULT 'all',
    "storage_asset_presets" json,
    "custom_css" TEXT,
    "storage_default_folder" TEXT,
    "basemaps" json,
    "mapbox_key" TEXT,
    "module_bar" json,
    "project_descriptor" TEXT,
    "default_language" TEXT NOT NULL DEFAULT 'en-US',
    "custom_aspect_ratios" json,
    "public_favicon" TEXT,
    "default_appearance" TEXT NOT NULL DEFAULT 'auto',
    "default_theme_light" TEXT,
    "theme_light_overrides" json,
    "default_theme_dark" TEXT,
    "theme_dark_overrides" json,
    CONSTRAINT "directus_settings_public_favicon_fkey" FOREIGN KEY ("public_favicon") REFERENCES "directus_files" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "directus_settings_storage_default_folder_fkey" FOREIGN KEY ("storage_default_folder") REFERENCES "directus_folders" ("id") ON DELETE SET NULL ON UPDATE NO ACTION,
    CONSTRAINT "directus_settings_public_background_fkey" FOREIGN KEY ("public_background") REFERENCES "directus_files" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "directus_settings_public_foreground_fkey" FOREIGN KEY ("public_foreground") REFERENCES "directus_files" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "directus_settings_project_logo_fkey" FOREIGN KEY ("project_logo") REFERENCES "directus_files" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "directus_shares" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "collection" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "role" TEXT,
    "password" TEXT,
    "user_created" TEXT,
    "date_created" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "date_start" DATETIME,
    "date_end" DATETIME,
    "times_used" INTEGER DEFAULT 0,
    "max_uses" INTEGER,
    CONSTRAINT "directus_shares_user_created_fkey" FOREIGN KEY ("user_created") REFERENCES "directus_users" ("id") ON DELETE SET NULL ON UPDATE NO ACTION,
    CONSTRAINT "directus_shares_role_fkey" FOREIGN KEY ("role") REFERENCES "directus_roles" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "directus_shares_collection_fkey" FOREIGN KEY ("collection") REFERENCES "directus_collections" ("collection") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "directus_translations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "language" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "directus_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "location" TEXT,
    "title" TEXT,
    "description" TEXT,
    "tags" json,
    "avatar" TEXT,
    "language" TEXT,
    "tfa_secret" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "role" TEXT,
    "token" TEXT,
    "last_access" DATETIME,
    "last_page" TEXT,
    "provider" TEXT NOT NULL DEFAULT 'default',
    "external_identifier" TEXT,
    "auth_data" json,
    "email_notifications" BOOLEAN DEFAULT true,
    "appearance" TEXT,
    "theme_dark" TEXT,
    "theme_light" TEXT,
    "theme_light_overrides" json,
    "theme_dark_overrides" json,
    CONSTRAINT "directus_users_role_fkey" FOREIGN KEY ("role") REFERENCES "directus_roles" ("id") ON DELETE SET NULL ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "directus_versions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "name" TEXT,
    "collection" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "hash" TEXT,
    "date_created" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "date_updated" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "user_created" TEXT,
    "user_updated" TEXT,
    CONSTRAINT "directus_versions_user_updated_fkey" FOREIGN KEY ("user_updated") REFERENCES "directus_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "directus_versions_user_created_fkey" FOREIGN KEY ("user_created") REFERENCES "directus_users" ("id") ON DELETE SET NULL ON UPDATE NO ACTION,
    CONSTRAINT "directus_versions_collection_fkey" FOREIGN KEY ("collection") REFERENCES "directus_collections" ("collection") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "directus_webhooks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "method" TEXT NOT NULL DEFAULT 'POST',
    "url" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "data" BOOLEAN NOT NULL DEFAULT true,
    "actions" TEXT NOT NULL,
    "collections" TEXT NOT NULL,
    "headers" json
);

-- CreateTable
CREATE TABLE "hadiths" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "sort" INTEGER,
    "user_created" TEXT,
    "date_created" DATETIME,
    "user_updated" TEXT,
    "date_updated" DATETIME,
    "date" DATETIME NOT NULL,
    CONSTRAINT "hadiths_user_updated_fkey" FOREIGN KEY ("user_updated") REFERENCES "directus_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "hadiths_user_created_fkey" FOREIGN KEY ("user_created") REFERENCES "directus_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "hadiths_translations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hadiths_id" INTEGER,
    "languages_code" TEXT,
    "topic" TEXT,
    "text" TEXT,
    CONSTRAINT "hadiths_translations_hadiths_id_fkey" FOREIGN KEY ("hadiths_id") REFERENCES "hadiths" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "hadiths_translations_languages_code_fkey" FOREIGN KEY ("languages_code") REFERENCES "languages" ("code") ON DELETE SET NULL ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "languages" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "direction" TEXT DEFAULT 'ltr'
);

-- CreateIndex
CREATE UNIQUE INDEX "directus_flows_operation_unique" ON "directus_flows"("operation");

-- CreateIndex
CREATE UNIQUE INDEX "directus_operations_resolve_unique" ON "directus_operations"("resolve");

-- CreateIndex
CREATE UNIQUE INDEX "directus_operations_reject_unique" ON "directus_operations"("reject");

-- CreateIndex
CREATE UNIQUE INDEX "directus_users_email_unique" ON "directus_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "directus_users_token_unique" ON "directus_users"("token");

-- CreateIndex
CREATE UNIQUE INDEX "directus_users_external_identifier_unique" ON "directus_users"("external_identifier");

-- CreateIndex
CREATE UNIQUE INDEX "hadiths_date_unique" ON "hadiths"("date");

