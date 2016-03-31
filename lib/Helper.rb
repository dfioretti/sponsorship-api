class Helper

	def self.keyify(name)
		return name.downcase.split(" ").join("_")
	end

	def self.dekeyify(key)
		return key.split("_").join(" ").titleize
	end
	
end
