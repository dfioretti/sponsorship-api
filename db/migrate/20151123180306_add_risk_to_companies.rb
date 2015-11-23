class AddRiskToCompanies < ActiveRecord::Migration
  def change
    add_column :companies, :name, :string
    add_column :companies, :risk, :decimal
    add_column :companies, :ticker, :string
  end
end
