Rails.application.routes.draw do

  resources :videos
  devise_for :users
  root 'home#index'
  resources :pictures
  match "photoshare", to: "home#photoshare", as: "photoshare", via: [:get, :post]
  match "vidshare", to: "home#vidshare", as: "vidshare", via: [:get, :post]

end
