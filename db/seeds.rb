Category.create!([
  {name: "auto"},
  {name: "apartments"},
  {name: "electronics"},
  {name: "jobs"},
  {name: "home"}
])

Article.create!([
  {author: "Joel", email: "joel@dbc.com", title: "Table for Sale", description: "It has four legs and is overall a good time.", price: 100.50, category_id: 5},
])