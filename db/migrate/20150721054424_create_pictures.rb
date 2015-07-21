class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.string :picurl
      t.string :pictitle

      t.timestamps null: false
    end
  end
end
