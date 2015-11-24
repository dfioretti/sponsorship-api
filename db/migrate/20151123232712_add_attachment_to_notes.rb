class AddAttachmentToNotes < ActiveRecord::Migration
  def change
    add_column :notes, :attachment, :text
  end
end
