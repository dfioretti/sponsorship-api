class AddNameIndexToCompanies < ActiveRecord::Migration
  def change
    add_index :companies, :name
  end
end
