class CalculateScoreJob
	@queue = :scores

	def self.perform(score_id)
		Rails.logger.debug("XXXWTF #{score_id}")
		puts "#{score_id} XXX"
		ScoreEngine.calculate_score(score_id)
	end
end
