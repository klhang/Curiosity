class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.string :text, null: false
      t.integer :answer_id, null: false
      t.integer :author_id, null: false
      t.timestamps
    end
    add_index :comments, :answer_id
  end
end
