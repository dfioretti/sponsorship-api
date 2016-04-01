class ScoreEngine


	def self.passion_score
		social_reach = Hash.new
		avidity = Hash.new

		# calculate tier 2
		Asset.where(:active => true).each do |a|
			fb_reach = 0.25 * a.metrics.where(:metric => 'facebook_likes').first.norm_value
			tw_reach = 0.5 * a.metrics.where(:metric => 'twitter_followers').first.norm_value
			ins_reach = 0.25 * a.metrics.where(:metric => 'instagram_followers').first.norm_value
			social_reach[a.entity_key] = (fb_reach + ins_reach + tw_reach)

			avid = 0.7 * a.metrics.where(:metric => 'avid_fan_index').first.norm_value
			casual = 0.3 * a.metrics.where(:metric => 'casual_fan_index').first.norm_value
			avidity[a.entity_key] = (avid + casual)
		end

		avid_mean = avidity.values.sum / avidity.values.size.to_f
		avid_stdev = ScoreEngine.standard_deviation(avid_mean, avidity.values)
		social_mean = social_reach.values.sum / social_reach.values.size.to_f
		social_stdev = ScoreEngine.standard_deviation(social_mean, social_reach.values)

		# calculate root
		derived_z = Hash.new
		social_reach.keys.each do |asset|
			avid_z = ScoreEngine.z_score(avidity[asset], avid_mean, avid_stdev)
			social_z = ScoreEngine.z_score(social_reach[asset], social_mean, social_stdev)
			derived_z[asset] = (0.4 * avid_z) + (0.6 * social_z)
		end

		# normalize root
		rank = Hash.new
		sorted_z = derived_z.values.sort.uniq
		derived_z.keys.each do |k|
			rank[k] = (sorted_z.index(derived_z[k]) + 1) / sorted_z.size.to_f
		end
		return rank
	end

	# calculate and save norm_value for all data points
	def self.cache_z_scores
		Metric.pluck(:metric).uniq.each do |m|
			values = Metric.where(:metric => m).pluck(:value)
			mean = values.sum / values.size.to_f
			stdev = ScoreEngine.standard_deviation(mean, values)
			Metric.where(:metric => m).each do |mm|
				mm.norm_value = ScoreEngine.z_score(mm.value, mean, stdev)
				mm.save
			end
		end
	end

	def self.standard_deviation(mean, list)
		tmp = []
		list.each do |i|
			tmp.push((i-mean) ** 2)
		end
		Math.sqrt(tmp.sum / tmp.size.to_f)
	end

	def self.z_score(val, mean, stdev)
		(val - mean) / stdev
	end
end

=begin
#ins_mean = Metric.where(:metric => 'instagram_followers').average(:value)

		metrics = Metric.pluck(:metric)
		metrics.eachd
		# values
		fb = Metric.where(:metric => 'facebook_likes').pluck(:value)
		ins = Metric.where(:metric => 'instagram_followers').pluck(:value)
		twt = Metric.where(:metric=> 'twitter_followers').pluck(:value)

		# means
		fb_mean = fb.sum / fb.size.to_f
		tw_mean = twt.sum / twt.size.to_f
		ins_mean = ins.sum / ins.size.to_f


		fb_stdev = ScoreEngine.standard_deviation(fb_mean, fb)
		tw_stdev = ScoreEngine.standard_deviation(tw_mean, twt)
		ins_stdev = ScoreEngine.standard_deviation(ins_mean, ins)

		Metric.where(:metric => 'facebook_likes').each do |m|
			m.norm_value = ScoreEngine.z_score(m.value, fb_mean, fb_stdev)
			m.save
		end

		Metric.where(:metric => 'instagram_followers').each do |m|
			m.norm_value = ScoreEngine.z_score(m.value, ins_mean, ins_stdev)
			m.save
		end

		Metric.where(:metric => 'twitter_followers').each do |m|
			m.norm_value = ScoreEngine.z_score(m.value, tw_mean, tw_stdev)
			m.save
		end

		#Rails.logger.debug(std)
=end
