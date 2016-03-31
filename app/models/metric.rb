class Metric < ActiveRecord::Base

	def self.load_scarborough_data
		Spreadsheet.client_encoding = 'UTF-8'
		book = Spreadsheet.open Rails.root.join('import', 'scarborough_data.xls')
		sheet = book.worksheet 6
		entity = nil
		first = true
		sheet.each do |row|
			# get the state first loop
			if first
				entity = row[0]
				first = false
				next
			end
			metric = row[0]
			if metric == ""
				next
			end
			metric = row[0].downcase.split(" ").join("_")
			Metric.new(
				:entity_id => entity,
				:entity_type => 'state',
				:source => 'scarborough',
				:metric => "#{metric}_pop",
				:value => row[1],
				:icon => 'icons/scarborough.png'
			).save
			Metric.new(
				:entity_id => entity,
				:entity_type => 'state',
				:source => 'scarborough',
				:metric => "#{metric}_percent",
				:value => row[2],
				:icon => 'icons/scarborough.png'
			).save
		end
	end
	def self.load_attendance
		Spreadsheet.client_encoding = 'UTF-8'
		book = Spreadsheet.open Rails.root.join('import', 'raw_data.xls')
		sheet = book.worksheet 2
		sheet.each do |row|
			Metric.new(
				:entity_id => row[0],
				:entity_type => 'asset',
				:source => 'espn',
				:metric => 'home_games',
				:value => row[1],
				:icon => '/metrics/espn.png'
			).save
			Metric.new(
				:entity_id => row[0],
				:entity_type => 'asset',
				:source => 'espn',
				:metric => 'total_attendance',
				:value => row[2],
				:icon => '/metrics/espn.png'
			).save
			Metric.new(
				:entity_id => row[0],
				:entity_type => 'asset',
				:source => 'espn',
				:metric => 'average_attendance',
				:value => row[3],
				:icon => '/metrics/espn.png'
			).save
			Metric.new(
				:entity_id => row[0],
				:entity_type => 'asset',
				:source => 'espn',
				:metric => 'attendance_percentage',
				:value => row[4],
				:icon => '/metrics/espn.png'
			).save
		end
	end
	def self.load_mvp_index
		Spreadsheet.client_encoding = 'UTF-8'
		book = Spreadsheet.open Rails.root.join('import', 'raw_data.xls')
		sheet = book.worksheet 1

		# get headings
		headings = sheet.row(0)
		headings.delete_at(0)

		sheet.each 1 do |row|
			i = 1
			headings.each do |h|
				if h.include? "twitter"
					Metric.new(
						:entity_id => row[0],
						:entity_type => 'asset',
						:source => 'twitter',
						:metric => h,
						:value => row[i],
						:icon => '/metrics/twitter.png'
					).save
				elsif h.include? "facebook"
					Metric.new(
						:entity_id => row[0],
						:entity_type => 'asset',
						:source => 'facebook',
						:metric => h,
						:value => row[i],
						:icon => '/metrics/facebook.png'
					).save
				elsif h.include? "google"
					Metric.new(
						:entity_id => row[0],
						:entity_type => 'asset',
						:source => 'google',
						:metric => h,
						:value => row[i],
						:icon => '/metrics/google.png'
					).save
				elsif h.include? "instagram"
					Metric.new(
						:entity_id => row[0],
						:entity_type => 'asset',
						:source => 'instagram',
						:metric => h,
						:value => row[i],
						:icon => '/metrics/instagram.png'
					).save
				else
					Metric.new(
						:entity_id => row[0],
						:entity_type => 'asset',
						:source => 'mvp_index',
						:metric => h,
						:value => row[i],
						:icon => '/metrics/mvp_index.png'
					).save
				end
				i += 1
			end
		end
	end
	def self.load_fanbase
		Spreadsheet.client_encoding = 'UTF-8'
		book = Spreadsheet.open Rails.root.join('import', 'raw_data.xls')
		sheet = book.worksheet 3
		headings = sheet.row(0)
		headings.delete_at(0)
		sheet.each 1 do |row|
			i = 1
			headings.each do |h|
				Metric.new(
					:entity_id => row[0],
					:entity_type => 'asset',
					:source => 'scarborough',
					:metric => h,
					:value => row[i],
					:icon => '/metrics/scarborough.png'
				).save
				i += 1
			end
		end
	end
	def self.load_forbes
		Spreadsheet.client_encoding = 'UTF-8'
		book = Spreadsheet.open Rails.root.join('import', 'raw_data.xls')
		sheet = book.worksheet 0
		headings = sheet.row(0)
		headings.delete_at(0)
		sheet.each 1 do |row|
			i = 1
			headings.each do |h|
				Metric.new(
					:entity_id => row[0],
					:entity_type => 'asset',
					:source => 'team',
					:metric => h,
					:value => row[i],
					:icon => '/metrics/team.png'
				).save
				i += 1
			end
		end
	end

	def self.import_all_data
		Metric.delete_all
		Metric.load_forbes
		Metric.load_fanbase
		Metric.load_mvp_index
		Metric.load_attendance
	end

	def self.add_active_to_data
		metrics = Metric.where(:entity_id => 'denver_broncos')
		metrics.each do |m|
			Datum.new(
				:source => m.source,
				:point => m.metric,
				:icon => m.icon,
				:active => true
			).save
		end
	end
end
