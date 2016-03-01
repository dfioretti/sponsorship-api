class AddSourceTypeToData < ActiveRecord::Migration
  def change
    add_column :data, :type, :string
  end
end
