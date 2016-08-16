class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :author
      t.string  :email
      t.string  :title
      t.string  :description
      t.decimal :price, precision: 10, scale: 2
      t.string  :edit_key
      t.integer :category_id
  
      t.timestamps(null: false)
    end
  end
end
