@questions.each do |question|
  json.set! question.id do
    json.extract! question, :id, :title, :description, :author_id
  end
end
