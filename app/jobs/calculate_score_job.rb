class CalculateScoreJob
	@queue = :score
	
	def self.perform(score)
		ScoreEngine.calculate_score(score)
	end
end
