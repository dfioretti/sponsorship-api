class Asset < ActiveRecord::Base
  has_many :metrics, :primary_key => 'entity_key', :foreign_key => 'entity_key'
  has_many :historicals, :primary_key => 'entity_key', :foreign_key => 'entity_key'
  def self.move_images
    Asset.all.each do |a|
      a.image = "/images/properties/#{a.id}.jpg"
      a.save
    end
  end

  def self.load_profiles
		Spreadsheet.client_encoding = 'UTF-8'
		book = Spreadsheet.open Rails.root.join('import', 'raw_data.xls')
		sheet = book.worksheet 4
		sheet.each 1 do |row|
			a = Asset.where(:entity_key => row[0])
      if a != nil?
  			a.first.description = row[15]
  			a.first.save
      end
		end
	end

  def self.create_st_louis
    Asset.new(
      :name => "St. Louis Blues",
      :scope => "Regional",
      :category => "Sports Team",
      :entity_key => "st._louis_blues",
      :active => false,
    ).save
    Asset.new(
      :name => "St. Louis Cardinals",
      :scope => "Regional",
      :category => "Sports Team",
      :entity_key => "st._louis_cardinals",
      :active => false,
    ).save
  end
  def self.jets
    Asset.new(
      :name => "Winnipeg Jets",
      :scope => "Regional",
      :category => "Sports Team",
      :entity_key => "winnipeg_jets",
      :active => false,
    ).save
  end
  def self.pelicans
    Asset.new(
      :name => "New Orleans Pelicans",
      :scope => "Regional",
      :category => "Sports Team",
      :entity_key => "new_orleans_pelicans",
      :active => false,
    ).save
  end
  def self.create_rams
    Asset.new(
      :name => "Los Angeles Rams",
      :scope => "Regional",
      :category => "Sports Team",
      :entity_key => "los_angeles_rams",
      :active => false,
    ).save
  end

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

  def self.set_random_dates
    Asset.all.each do |a|
      a.renewal = rand(Date.civil(2016, 5, 1)..Date.civil(2025, 12, 31))
      a.save
    end
  end

  def self.add_scope_to_assets
    Asset.all.each do |a|
      if a.category == "Sports Team"
        a.scope = "Regional"
      else
        a.scope = "National"
      end
      a.save
    end
  end

  def self.new_create_assets
    file = File.join(Rails.root, 'config', 'asset_data.json')
    json = File.read(file)
    data_hash = JSON.parse(json)
    data_hash.each do |item|
      asset = Asset.new(item)
      asset.pretty_renewal = "10/31/2018"
      asset.pretty_term = "2 Years"
      asset.pretty_cost = "$4 M"
      asset.score = 0.071
      asset.save
    end
  end

  def self.add_local_filenames
    Asset.all.each do |a|
      a.image = "/images/#{a.name.gsub(/\s+/, '')}.jpg"
      a.save
    end
  end

  def self.create_new (name, logo, subcategory)
      Asset.new(
        :name => name.strip,
        :scope => "Regional",
        :category => "Sports",
        :subcategory => subcategory,
        :image_url => logo,
        :renewal => Date.new(2020, 1, 1),
        :score => 0.08
      ).save
  end

  def self.thumb_images
    path = Rails.root.join('public', 'images')
    Dir.glob("#{path}/*.jpg") do |img|
      out = File.basename img, '.jpg'
      outfile = Rails.root.join('public', 'images', 'thumbs', "#{out}.jpg")
      system("convert -resize 50x50 #{img} #{outfile} ")
    end
  end
  def self.cache_asset_images
    Asset.all.each do |a|
      file_name = a.id
      url = a.image_url
      system("exec wget -O #{file_name}.jpg #{url} ")
    end
  end

  def self.save_encoded_thumb
    Asset.all.each do |a|
      data = Base64.encode64(File.read("public/images/thumbs/#{a.id}.jpg")).gsub("\n", '')
      uri  = "data:image/jpg;base64,#{data}"
      a.thumb = uri
      a.save
    end

  end

  def self.create_nationals
    json = [{"image_url":"http://i.forbesimg.com/media/lists/people/floyd-mayweather_100x100.jpg","name":"Floyd Mayweather","subcategory":"Athletes"},{"image_url":"http://i.forbesimg.com/media/lists/people/manny-pacquiao_100x100.jpg","name":"Manny Pacquiao","subcategory":"Athletes"},{"image_url":"http://i.forbesimg.com/media/lists/people/katy-perry_100x100.jpg","name":"Katy Perry","subcategory":"Musicians"},{"image_url":"http://i.forbesimg.com/media/lists/people/one-direction_100x100.jpg","name":"One Direction","subcategory":"Musicians"},{"image_url":"http://i.forbesimg.com/media/lists/people/howard-stern_100x100.jpg","name":"Howard Stern","subcategory":"Personalities"},{"image_url":"http://i.forbesimg.com/media/lists/people/garth-brooks_100x100.jpg","name":"Garth Brooks","subcategory":"Musicians"},{"image_url":"http://i.forbesimg.com/media/lists/people/james-patterson_100x100.jpg","name":"James Patterson","subcategory":"Authors"},{"image_url":"http://i.forbesimg.com/media/lists/people/robert-do...guez","subcategory":"Athletes"},{"image_url":"http://i.forbesimg.com/media/lists/people/channing-tatum_100x100.jpg","name":"Channing Tatum","subcategory":"Actors"},{"image_url":"http://i.forbesimg.com/media/lists/people/kaley-cuoco-sweeting_100x100.jpg","name":"Kaley Cuoco-Sweeting","subcategory":"Television actresses"},{"image_url":"http://i.forbesimg.com/media/lists/people/kevin-hart_100x100.jpg","name":"Kevin Hart","subcategory":"Comedians"},{"image_url":"http://i.forbesimg.com/media/lists/people/miranda-lambert_100x100.jpg","name":"Miranda Lambert","subcategory":"Musicians"},{"image_url":"http://i.forbesimg.com/media/lists/people/jennifer-lopez_100x100.jpg","name":"Jennifer Lopez","subcategory":"Musicians"},{"image_url":"http://i.forbesimg.com/media/lists/people/blake-shelton_100x100.jpg","name":"Blake Shelton","subcategory":"Musicians"},{"image_url":"http://i.forbesimg.com/media/lists/people/sofia-vergara_100x100.jpg","name":"Sofía Vergara","subcategory":"Television actresses"}]
    json.each do |j|
      a = Asset.new(j)
      a.scope = "National"
      a.category = "Celebrities"
      a.pretty_cost = "$4M"
      a.pretty_renewal = "10/31/2018"
      a.pretty_term = "2 Years"
      a.save
    end
  end

  def self.better_logos
    Asset.all.each do |a|
      a.image_url = "https://logo.clearbit.com/www.#{a.name.downcase.gsub(/\s+/, "")}.com"
      a.pretty_cost = "$3M"
      a.pretty_renewal = "12/31/2020"
      a.pretty_term = "3 Years"
      a.save
    end
  end
  def self.load_assets
    Asset.delete_all
    bnames = """Arizona Diamondbacks,Atlanta Braves,Chicago Cubs,Cincinnati Reds,Colorado Rockies,Los Angeles Dodgers,Miami Marlins,Milwaukee Brewers,New York Mets,Philadelphia Phillies,Pittsburgh Pirates,San Diego Padres,San Francisco Giants,St. Louis Cardinals,Washington Nationals, Baltimore Orioles,Boston Red Sox,Chicago White Sox,Cleveland Indians,Detroit Tigers,Houston Astros,Kansas City Royals,Los Angeles Angels of Anaheim,Minnesota Twins,New York Yankees,Oakland Athletics,Seattle Mariners,Tampa Bay Rays,Texas Rangers,Toronto Blue Jays""".split(",")
    blogos = """http://content.sportslogos.net/logos/54/50/thumbs/gnnnrbxcmjhdgeu6mavqk3945.gif,http://content.sportslogos.net/logos/54/51/thumbs/3kgwjp6heowkeg3w8zoow9ggy.gif,http://content.sportslogos.net/logos/54/54/thumbs/q9gvs07u72gc9xr3395u6jh68.gif,http://content.sportslogos.net/logos/54/56/thumbs/z9e0rqit393ojiizsemd0t1hx.gif,http://content.sportslogos.net/logos/54/58/thumbs/ej4v6a8q5w5gegtf7ilqbhoz7.gif,http://content.sportslogos.net/logos/54/63/thumbs/efvfv5b5g1zgpsf56gb04lthx.gif,http://content.sportslogos.net/logos/54/3637/thumbs/y6oklqzigo1ver57oxlt60ee0.gif,http://content.sportslogos.net/logos/54/64/thumbs/ophgazfdzfdkeugut9bdw3iyz.gif,http://content.sportslogos.net/logos/54/67/thumbs/m01gfgeorgvbfw15fy04alujm.gif,http://content.sportslogos.net/logos/54/70/thumbs/o4lmh7dq5e3uordl7hvk6i3ug.gif,http://content.sportslogos.net/logos/54/71/thumbs/7112502014.gif,http://content.sportslogos.net/logos/54/73/thumbs/7343442015.gif,http://content.sportslogos.net/logos/54/74/thumbs/cpqj6up5bvgpoedg5fwsk20ve.gif,http://content.sportslogos.net/logos/54/72/thumbs/3zhma0aeq17tktge1huh7yok5.gif,http://content.sportslogos.net/logos/54/578/thumbs/rcehah9k0kekjkgzm077fflws.gif, http://content.sportslogos.net/logos/53/52/thumbs/lty880yrmrra64y6tqfqmdnbf.gif,http://content.sportslogos.net/logos/53/53/thumbs/c0whfsa9j0vbs079opk2s05lx.gif,http://content.sportslogos.net/logos/53/55/thumbs/oxvkprv7v4inf5dgqdebp0yse.gif,http://content.sportslogos.net/logos/53/57/thumbs/5753472014.gif,http://content.sportslogos.net/logos/53/59/thumbs/txtu234jlffk0q5l62uhnwm3q.gif,http://content.sportslogos.net/logos/53/4929/thumbs/492995032000.gif,http://content.sportslogos.net/logos/53/62/thumbs/fmrl2b6xf5hruiike42gn62yu.gif,http://content.sportslogos.net/logos/53/922/thumbs/wsghhaxkh5qq0hdkbt1b5se41.gif,http://content.sportslogos.net/logos/53/65/thumbs/peii986yf4l42v3aa3hy0ovlf.gif,http://content.sportslogos.net/logos/53/68/thumbs/1256.gif,http://content.sportslogos.net/logos/53/69/thumbs/6xk2lpc36146pbg2kydf13e50.gif,http://content.sportslogos.net/logos/53/75/thumbs/1305.gif,http://content.sportslogos.net/logos/53/2535/thumbs/qiru2jftx1a378eq8ad0s4ik4.gif,http://content.sportslogos.net/logos/53/77/thumbs/ajfeh4oqeealq37er15r3673h.gif,http://content.sportslogos.net/logos/53/78/thumbs/2559d7603ouedg7ldhw0br4fn.gif""".split(',')
    i = 0
    bnames.each do |n|
      Asset.create_new(n, blogos[i], "Baseball")
      i += 1
    end
    hnames = """Anaheim Ducks,Arizona Coyotes,Boston Bruins,Buffalo Sabres,Calgary Flames,Carolina Hurricanes,Chicago Blackhawks,Colorado Avalanche,Columbus Blue Jackets,Dallas Stars,Detroit Red Wings,Edmonton Oilers,Florida Panthers,Los Angeles Kings,Minnesota Wild,Montreal Canadiens,Nashville Predators,New Jersey Devils,New York Islanders,New York Rangers,Ottawa Senators,Philadelphia Flyers,Pittsburgh Penguins,San Jose Sharks,St. Louis Blues,Tampa Bay Lightning,Toronto Maple Leafs,Vancouver Canucks,Washington Capitals,Winnipeg Jets""".split(',')
    hlogos = """http://content.sportslogos.net/logos/1/1736/thumbs/173616512014.gif,http://content.sportslogos.net/logos/1/5263/thumbs/526378072015.gif,http://content.sportslogos.net/logos/1/3/thumbs/venf9fmhgnsawnxxvehf.gif,http://content.sportslogos.net/logos/1/4/thumbs/i40oxcdbo7xtfamqqhqachoyo.gif,http://content.sportslogos.net/logos/1/5/thumbs/50.gif,http://content.sportslogos.net/logos/1/6/thumbs/fotih31tn5r345nufo5xxayh3.gif,http://content.sportslogos.net/logos/1/7/thumbs/56.gif,http://content.sportslogos.net/logos/1/8/thumbs/64.gif,http://content.sportslogos.net/logos/1/9/thumbs/jhepegs329pc7ugyypebl28wg.gif,http://content.sportslogos.net/logos/1/10/thumbs/1079172014.gif,http://content.sportslogos.net/logos/1/11/thumbs/yo3wysbjtagzmwj37tb11u0fh.gif,http://content.sportslogos.net/logos/1/12/thumbs/6cphie5heyvfwn6lbzfowe61h.gif,http://content.sportslogos.net/logos/1/13/thumbs/94.gif,http://content.sportslogos.net/logos/1/14/thumbs/71jepx81eqzz1l6q9g1g5j1lh.gif,http://content.sportslogos.net/log...humbs/124.gif,http://content.sportslogos.net/logos/1/17/thumbs/lvchw3qfsun2e7oc02kh2zxb6.gif,http://content.sportslogos.net/logos/1/18/thumbs/32tfs723a3bes0p0hb4hgcy1u.gif,http://content.sportslogos.net/logos/1/19/thumbs/79520qbne58r9i71zhuggbff0.gif,http://content.sportslogos.net/logos/1/20/thumbs/144.gif,http://content.sportslogos.net/logos/1/21/thumbs/2bkf2l3xyxi5p0cavbj8.gif,http://content.sportslogos.net/logos/1/22/thumbs/161.gif,http://content.sportslogos.net/logos/1/24/thumbs/174.gif,http://content.sportslogos.net/logos/1/26/thumbs/dmo1xf3z4pph27vmg3gf.gif,http://content.sportslogos.net/logos/1/25/thumbs/187.gif,http://content.sportslogos.net/logos/1/27/thumbs/97hhvk8e5if0riesnex30etgz.gif,http://content.sportslogos.net/logos/1/28/thumbs/2887612017.gif,http://content.sportslogos.net/logos/1/29/thumbs/tlxz9higxwygaehl0j5h.gif,http://content.sportslogos.net/logos/1/30/thumbs/llrs2zxi127vkqgcsvfb.gif,http://content.sportslogos.net/logos/1/3050/thumbs/z9qyy9xqoxfjn0njxgzoy2rwk.gif""".split(',')
    i = 0
    hnames.each do |n|
      Asset.create_new(n, hlogos[i], "Hockey")
      i += 1
    end

    bbnames = """Atlanta Hawks,Boston Celtics,Brooklyn Nets,Charlotte Hornets,Chicago Bulls,Cleveland Cavaliers,Dallas Mavericks,Denver Nuggets,Detroit Pistons,Golden State Warriors,Houston Rockets,Indiana Pacers,Los Angeles Clippers,Los Angeles Lakers,Memphis Grizzlies,Miami Heat,Milwaukee Bucks,Minnesota Timberwolves,New Orleans Pelicans,New York Knicks,Oklahoma City Thunder,Orlando Magic,Philadelphia 76ers,Phoenix Suns,Portland Trail Blazers,Sacramento Kings,San Antonio Spurs,Toronto Raptors,Utah Jazz,Washington Wizards""".split(',')
    bblogos = """http://content.sportslogos.net/logos/6/220/thumbs/22091682016.gif,http://content.sportslogos.net/logos/6/213/thumbs/slhg02hbef3j1ov4lsnwyol5o.gif,http://content.sportslogos.net/logos/6/3786/thumbs/hsuff5m3dgiv20kovde422r1f.gif,http://content.sportslogos.net/logos/6/5120/thumbs/512019262015.gif,http://content.sportslogos.net/logos/6/221/thumbs/hj3gmh82w9hffmeh3fjm5h874.gif,http://content.sportslogos.net/logos/6/222/thumbs/e4701g88mmn7ehz2baynbs6e0.gif,http://content.sportslogos.net/logos/6/228/thumbs/ifk08eam05rwxr3yhol3whdcm.gif,http://content.sportslogos.net/logos/6/229/thumbs/xeti0fjbyzmcffue57vz5o1gl.gif,http://content.sportslogos.net/logos/6/223/thumbs/3079.gif,http://content.sportslogos.net/logos/6/235/thumbs/qhhir6fj8zp30f33s7sfb4yw0.gif,http://content.sportslogos.net/logos/6/230/thumbs/8xe4813lzybfhfl14axgzzqeq.gif,http://content.sportslogos.net/logos/6/224/thumbs/3083.gif,http://content.sportslogos.net/logos/6/236/thumbs/23654622016.gif,http://content.sportslogos.net/logos/6/2...gif,http://content.sportslogos.net/logos/6/225/thumbs/22582752016.gif,http://content.sportslogos.net/logos/6/232/thumbs/zq8qkfni1g087f4245egc32po.gif,http://content.sportslogos.net/logos/6/4962/thumbs/496226812014.gif,http://content.sportslogos.net/logos/6/216/thumbs/2nn48xofg0hms8k326cqdmuis.gif,http://content.sportslogos.net/logos/6/2687/thumbs/khmovcnezy06c3nm05ccn0oj2.gif,http://content.sportslogos.net/logos/6/217/thumbs/wd9ic7qafgfb0yxs7tem7n5g4.gif,http://content.sportslogos.net/logos/6/218/thumbs/21870342016.gif,http://content.sportslogos.net/logos/6/238/thumbs/23843702014.gif,http://content.sportslogos.net/logos/6/239/thumbs/bahmh46cyy6eod2jez4g21buk.gif,http://content.sportslogos.net/logos/6/240/thumbs/832.gif,http://content.sportslogos.net/logos/6/233/thumbs/827.gif,http://content.sportslogos.net/logos/6/227/thumbs/22745782016.gif,http://content.sportslogos.net/logos/6/234/thumbs/m2leygieeoy40t46n1qqv0550.gif,http://content.sportslogos.net/logos/6/219/thumbs/21956712016.gif""".split(',')
    i = 0
    bbnames.each do |n|
      Asset.create_new(n, bblogos[i], "Basketball")
      i += 1
    end

    fnames = """Arizona Cardinals,Atlanta Falcons,Baltimore Ravens,Buffalo Bills,Carolina Panthers,Chicago Bears,Cincinnati Bengals,Cleveland Browns,Dallas Cowboys,Denver Broncos,Detroit Lions,Green Bay Packers,Houston Texans,Indianapolis Colts,Jacksonville Jaguars,Kansas City Chiefs,Los Angeles Rams,Miami Dolphins,Minnesota Vikings,New England Patriots,New Orleans Saints,New York Giants,New York Jets,Oakland Raiders,Philadelphia Eagles,Pittsburgh Steelers,San Diego Chargers,San Francisco 49ers,Seattle Seahawks,Tampa Bay Buccaneers,Tennessee Titans,Washington Redskins""".split(',')
    flogos = """http://content.sportslogos.net/logos/7/177/thumbs/kwth8f1cfa2sch5xhjjfaof90.gif,http://content.sportslogos.net/logos/7/173/thumbs/299.gif,http://content.sportslogos.net/logos/7/153/thumbs/318.gif,http://content.sportslogos.net/logos/7/149/thumbs/n0fd1z6xmhigb0eej3323ebwq.gif,http://content.sportslogos.net/logos/7/174/thumbs/f1wggq2k8ql88fe33jzhw641u.gif,http://content.sportslogos.net/logos/7/169/thumbs/364.gif,http://content.sportslogos.net/logos/7/154/thumbs/403.gif,http://content.sportslogos.net/logos/7/155/thumbs/15578552015.gif,http://content.sportslogos.net/logos/7/165/thumbs/406.gif,http://content.sportslogos.net/logos/7/161/thumbs/9ebzja2zfeigaziee8y605aqp.gif,http://content.sportslogos.net/logos/7/170/thumbs/cwuyv0w15ruuk34j9qnfuoif9.gif,http://content.sportslogos.net/logos/7/171/thumbs/dcy03myfhffbki5d7il3.gif,http://content.sportslogos.net/logos/7/157/thumbs/570.gif,http://content.sportslogos.net/logos/7/158/thumbs/593.gif,http://content.sportslogos.net/logos/7/159/thumbs/15.../7/150/thumbs/15041052013.gif,http://content.sportslogos.net/logos/7/172/thumbs/17227042013.gif,http://content.sportslogos.net/logos/7/151/thumbs/y71myf8mlwlk8lbgagh3fd5e0.gif,http://content.sportslogos.net/logos/7/175/thumbs/907.gif,http://content.sportslogos.net/logos/7/166/thumbs/919.gif,http://content.sportslogos.net/logos/7/152/thumbs/v7tehkwthrwefgounvi7znf5k.gif,http://content.sportslogos.net/logos/7/163/thumbs/g9mgk6x3ge26t44cccm9oq1vl.gif,http://content.sportslogos.net/logos/7/167/thumbs/960.gif,http://content.sportslogos.net/logos/7/156/thumbs/970.gif,http://content.sportslogos.net/logos/7/164/thumbs/8e1jhgblydtow4m3okwzxh67k.gif,http://content.sportslogos.net/logos/7/179/thumbs/17994552009.gif,http://content.sportslogos.net/logos/7/180/thumbs/pfiobtreaq7j0pzvadktsc6jv.gif,http://content.sportslogos.net/logos/7/176/thumbs/17636702014.gif,http://content.sportslogos.net/logos/7/160/thumbs/1053.gif,http://content.sportslogos.net/logos/7/168/thumbs/im5xz2q9bjbg44xep08bf5czq.gif""".split(',')
    i = 0
    fnames.each do |n|
      Asset.create_new(n, flogos[i], "Football")
      i += 1
    end
  end
end
