# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160403061354) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "hstore"

  create_table "asset_set_items", force: :cascade do |t|
    t.integer  "asset_set_id"
    t.integer  "asset_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "asset_sets", force: :cascade do |t|
    t.string   "name"
    t.integer  "user_id"
    t.integer  "portfolio"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "assets", force: :cascade do |t|
    t.string   "name"
    t.string   "scope"
    t.string   "category"
    t.string   "subcategory"
    t.text     "description"
    t.decimal  "cost"
    t.date     "renewal"
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.float    "score"
    t.string   "pretty_cost"
    t.string   "pretty_renewal"
    t.string   "pretty_term"
    t.string   "image_url"
    t.string   "facebook_page"
    t.string   "fanpage_link"
    t.string   "twitter_handle"
    t.integer  "facebook_fans"
    t.integer  "facebook_conversation"
    t.integer  "twitter_followers"
    t.float    "klout_score"
    t.integer  "total_stats"
    t.string   "image"
    t.text     "thumb"
    t.boolean  "owned",                 default: false
    t.boolean  "active",                default: true
    t.string   "entity_key"
  end

  create_table "cards", force: :cascade do |t|
    t.string   "title"
    t.json     "model"
    t.json     "state"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "companies", force: :cascade do |t|
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.string   "name"
    t.decimal  "risk"
    t.string   "ticker"
    t.string   "api_id"
    t.string   "industry"
    t.boolean  "visible",    default: true
  end

  add_index "companies", ["name"], name: "index_companies_on_name", using: :btree

  create_table "custom_components", force: :cascade do |t|
    t.string   "name"
    t.integer  "dashboard_id"
    t.string   "view"
    t.string   "interval"
    t.integer  "asset_set_id"
    t.json     "data"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.json     "model"
    t.json     "state"
    t.boolean  "active",       default: true
  end

  create_table "dashboards", force: :cascade do |t|
    t.integer  "company_id"
    t.integer  "user_id"
    t.json     "state",      default: {}
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.string   "kind"
    t.integer  "item_id"
    t.string   "name"
  end

  create_table "data", force: :cascade do |t|
    t.integer  "asset_id"
    t.string   "source"
    t.string   "point"
    t.decimal  "value"
    t.date     "date"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.string   "kind"
    t.string   "icon"
    t.integer  "score_id"
    t.boolean  "active",     default: false
  end

  create_table "insights", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "company_id"
    t.text     "body"
    t.text     "attachment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "metrics", force: :cascade do |t|
    t.string   "entity_key"
    t.string   "entity_type"
    t.string   "source"
    t.string   "metric"
    t.decimal  "value"
    t.string   "icon"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.decimal  "norm_value"
    t.decimal  "rank"
  end

  create_table "notes", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "company_id"
    t.text     "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text     "attachment"
  end

  create_table "scores", force: :cascade do |t|
    t.string   "name"
    t.json     "score"
    t.text     "image"
    t.integer  "asset_set"
    t.string   "asset_set_name"
    t.integer  "company_id"
    t.integer  "user_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "taggings", force: :cascade do |t|
    t.integer  "tag_id"
    t.integer  "taggable_id"
    t.string   "taggable_type"
    t.integer  "tagger_id"
    t.string   "tagger_type"
    t.string   "context",       limit: 128
    t.datetime "created_at"
  end

  add_index "taggings", ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true, using: :btree
  add_index "taggings", ["taggable_id", "taggable_type", "context"], name: "index_taggings_on_taggable_id_and_taggable_type_and_context", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string  "name"
    t.integer "taggings_count", default: 0
  end

  add_index "tags", ["name"], name: "index_tags_on_name", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "provider",               default: "email", null: false
    t.string   "uid",                    default: "",      null: false
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "name"
    t.string   "image"
    t.string   "email"
    t.json     "tokens"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "permission_level",       default: 0
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree

end
