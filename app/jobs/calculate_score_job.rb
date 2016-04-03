class CalculateScoreJob < ActiveJob::Base
	queue_as :score

	def perform(score)
		ScoreEngine.calculate_score(score)
	end
end
