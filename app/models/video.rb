class Video < ActiveRecord::Base

	def youtube_id
		if url =~ /https?:\/\/(?:(?:www\.)?youtube\.com\/watch\?v=|youtu\.be\/)(.+)/
			$1
		end
	end
	
end
