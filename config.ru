require 'toto'

# Rack config
use Rack::Static, :urls => ['/css', '/js', '/img', '/fonts', '/favicon.ico'], :root => 'public'
use Rack::CommonLogger

if ENV['RACK_ENV'] == 'development'
  use Rack::ShowExceptions
end

# Run application
toto = Toto::Server.new do
  #
  # Add your settings here
  # set [:setting], [value]
  #
  set :date do |now|
    now.strftime("%B #{now.day.ordinal} %Y")
  end
  set :url, "http://wordsbyf.at"
  set :author, "fat"
  set :title, 'wordsbyf.at'
  set :summary,     :max => 250
  set :error, lambda {|code|
        file = File.open("./public/404.html", "rb")
        contents = file.read
      }
end

run toto