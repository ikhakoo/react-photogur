class VideosController < ApplicationController

	def index
		@videos = Video.all
	  respond_to do |format|
		  format.json { render json: @videos }
		end
  end

  def create
    respond_to do |format|
      format.html {render text: "Your data was sucessfully loaded. Thanks"}
      format.json {
      						if params[:vidurl] =~ /https?:\/\/(?:(?:www\.)?youtube\.com\/watch\?v=|youtu\.be\/)(.+)/
										$1
                   Video.create(video_params)
                   render text: video.last.to_json  # !
                  else
                 	 render alert: "Not a Youtube Link"
                 	end
                  }
    end
  end

private

  def video_params
    params.require(:video).permit(:vidurl, :vidtitle)
  end


end
