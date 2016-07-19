class ScoreWorker
  include Sidekiq::Worker
  def perform(score_id)
    ScoreEngine.calculate_score(score_id)
  end
end
