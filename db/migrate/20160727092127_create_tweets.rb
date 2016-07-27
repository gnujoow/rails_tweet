class CreateTweets < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
      t.integer :user_id #ref user
      t.text :body

      t.timestamps null: false
    end
  end
end
