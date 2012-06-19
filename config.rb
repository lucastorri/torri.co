### 
# Compass
###

# Susy grids in Compass
# First: gem install compass-susy-plugin
# require 'susy'

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Haml
###

# CodeRay syntax highlighting in Haml
# First: gem install haml-coderay
# require 'haml-coderay'

# CoffeeScript filters in Haml
# First: gem install coffee-filter
# require 'coffee-filter'

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

###
# Page command
###

# Per-page layout changes:
# 
# With no layout
# page "/path/to/file.html", :layout => false
# 
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
# 
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy (fake) files
# page "/this-page-has-no-template.html", :proxy => "/template-file.html" do
#   @which_fake_page = "Rendering a fake page with a variable"
# end

###
# Helpers
###

# Methods defined in the helpers block are available in templates
helpers do
  require 'babosa'
  def slug str
    str.to_s.to_slug.approximate_ascii.normalize.to_s
  end
  
  def current_pages request
    request.env["PATH_INFO"] =~ /([^\/|^\.]+)[\/]{0,1}([^\.]+){0,1}/
    current_page = $1 || data.pages.first
    current_subpage = $2
    [current_page, current_subpage]
  end
  
  def titles_for current_page, current_subpage
    subtitle = nil
    title = data.pages.find do |p|
      if p.is_a? Hash
        subtitle = p.values.first.find { |sp| slug(sp) == current_subpage }
        p = p.keys.first
      end
      slug(p) == current_page
    end
    title = title.keys.first if title.is_a? Hash
    if data.to_h.has_key? current_page
      subtitle = data.try(current_page).find { |sp| slug(sp) == current_subpage }
    end
    [title, subtitle]
  end
  
  def current_info request
    current_page, current_subpage = current_pages request
    title, subtitle = titles_for current_page, current_subpage
    [current_page, current_subpage, title, subtitle]
  end
  
end

# Change the CSS directory
# set :css_dir, "alternative_css_directory"

# Change the JS directory
# set :js_dir, "alternative_js_directory"

# Change the images directory
# set :images_dir, "alternative_image_directory"

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css
  
  # Minify Javascript on build
  # activate :minify_javascript
  
  # Enable cache buster
  # activate :cache_buster
  
  # Use relative URLs
  # activate :relative_assets
  
  # Compress PNGs after build
  # First: gem install middleman-smusher
  # require "middleman-smusher"
  # activate :smusher
  
  # Or use a different image path
  # set :http_path, "/Content/images/"
end

page "/index.html", :proxy => "about.html"

activate :directory_indexes
