class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.string :vidtitle
      t.string :vidurl

      t.timestamps null: false
    end
  end
end
