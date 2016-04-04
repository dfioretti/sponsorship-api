class CalculateScoreJob
	@queue = :scores

	def self.perform(score_id)
		ScoreEngine.calculate_score(score_id)
	end
end
