# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_10_24_122532) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "metrics", force: :cascade do |t|
    t.string "name", null: false
    t.decimal "value", precision: 20, scale: 4, null: false
    t.datetime "timestamp", null: false
    t.string "category", null: false
    t.string "granularity", null: false
    t.string "source"
    t.jsonb "metadata", default: {}
    t.string "tags", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category"], name: "index_metrics_on_category"
    t.index ["granularity"], name: "index_metrics_on_granularity"
    t.index ["source"], name: "index_metrics_on_source"
    t.index ["tags"], name: "index_metrics_on_tags", using: :gin
    t.index ["timestamp"], name: "index_metrics_on_timestamp"
  end

end
