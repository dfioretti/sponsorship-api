class AddApiIdToCompanies < ActiveRecord::Migration
  def change
    add_column :companies, :api_id, :string
  end
end
