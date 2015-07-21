class PicturesController < ApplicationController

	def index
		@pictures = Picture.all
	  respond_to do |format|
		  format.json { render json: @pictures }
		end
  end

  def create
    respond_to do |format|
      format.html {render text: "Your data was sucessfully loaded. Thanks"}
      format.json { 
                   Picture.create(picture_params)
                   render text: picture.last.to_json  # !
                  }
    end
  end

private

  def picture_params
    params.require(:picture).permit(:url, :title)
  end

end
