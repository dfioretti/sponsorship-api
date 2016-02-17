class Asset < ActiveRecord::Base

  def self.setup_assets
    Asset.delete_all
    Asset.new(:name => "Colin Kaepernick",
              :scope => "National",
              :category => "Football",
              :subcategory => "NFL",
              :score => 0.083,
              :description => "Colin Kaepernick was born in Milwaukee, Wisconsin, in 1987. An athletic and mobile quarterback, Kaepernick attended the University of Nevada, Reno, where he set several school and college records. The San Francisco 49ers drafted Kaepernick in 2011, and he led the club to Super Bowl XLVII less than two years later.",
              :renewal => Date.new(2018, 2, 6)
             ).save

    Asset.new(:name => "New York Knicks",
              :scope => "Regional",
              :category => "Basketball",
              :subcategory => "NBA",
              :score => 0.071,
              :description => "The New York Knickerbockers,[2] commonly referred to as the Knicks, are an American professional basketball team based in New York City. The Knicks compete in the National Basketball Association (NBA) as a member club of the Atlantic Division of the Eastern Conference. The team plays its home games at Madison Square Garden, located in the borough of Manhattan.",
              :renewal => Date.new(2021, 6, 11)
             ).save
  end
end
