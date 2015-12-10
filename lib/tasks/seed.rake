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
      company = Company.find_by_api_id c['id']
      if company
        company.update risk: c['risk']
      else
        Company.create api_id: c['id'], name: c['name'], ticker: c['ticker'], risk: c['risk']
      end
    end

    Logger.new(STDOUT).info "Seeding complete."
  end
end
