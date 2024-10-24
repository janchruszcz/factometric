class CreateMetrics < ActiveRecord::Migration[7.1]
  def change
    create_table :metrics do |t|
      t.string :name, null: false
      t.decimal :value, null: false, precision: 20, scale: 4
      t.datetime :timestamp, null: false
      t.string :category, null: false
      t.string :source
      t.jsonb :metadata, default: {}
      t.string :tags, array: true, default: []

      t.timestamps

      t.index :timestamp
      t.index :category
      t.index :source
      t.index :tags, using: :gin
    end
  end
end
