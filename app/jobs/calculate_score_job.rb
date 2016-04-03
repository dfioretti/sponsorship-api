class CalculateScoreJob
	extend Resque::Plugins::Heroku

	def self.perform(score)
		ScoreEngine.calculate_score(score)
	end
end
