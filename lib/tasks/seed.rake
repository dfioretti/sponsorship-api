namespace :seed do
  task companies: :environment do
    Logger.new(STDOUT).info "Seeding..."
    request = Typhoeus::Request.new(
      'http://ewsapi.teneodigital.com/companies',
      method: :get,
      headers: {
        'Accept' => 'json',
        'Authorization' => ENV['TENEO_API_KEY']
      }
    )
    response = request.run
    companies = ActiveSupport::JSON.decode(response.response_body)

    companies.each do |c|
      Company.create api_id: c['id'], name: c['name'], ticker: c['ticker'], risk: c['risk']
    end

    Logger.new(STDOUT).info "Seeding complete."
  end
end
