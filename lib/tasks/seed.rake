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
        company.update api_id: c['id'], name: c['name'], ticker: c['ticker'], risk: c['risk'], industry: c['industry']
      else
        Company.create api_id: c['id'], name: c['name'], ticker: c['ticker'], risk: c['risk'], industry: c['industry']
      end
    end

    Logger.new(STDOUT).info "Seeding complete."
  end

  task fifa: :environment do
    c = Company.create(name: 'FIFA', visible: false)

    Dashboard.where(kind: 'fifa').update_all(company_id: c.id)
  end


  task fifa_dashboard_components: :environment do
    Dashboard.where(kind: 'fifa').find_each do |dashboard|
      dashboard.state = Dashboard::FIFA_DEFAULT_STATE
      dashboard.save
    end
  end
end
