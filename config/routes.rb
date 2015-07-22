Rails.application.routes.draw do

  resources :videos
  devise_for :users
  root 'home#index'
  resources :pictures
  match "photos", to: "home#photos", as: "photos", via: [:get, :post]
  match "videos", to: "home#videos", as: "videos", via: [:get, :post]

end
