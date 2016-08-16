get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/result' do
  survey = JSON.parse(request.body.read)

  p survey
  puts survey["name"]
  
  questions = survey["questions"]
  p questions
  
end