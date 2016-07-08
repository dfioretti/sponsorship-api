class CreateTenantMigration < ActiveRecord::Migration
  def change
    create_table :tenants do |t|
      t.string :name
      t.string :subdomain
      t.string :image_url

      t.timestamps null: false
    end
  end
end
