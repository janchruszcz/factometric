class Metric < ApplicationRecord
  # Constants
  CATEGORIES = %w[engagement acquisition revenue feature]

  # Validations
  validates :name, :value, :timestamp, :category, presence: true
  validates :value, numericality: true
  validates :category, inclusion: { in: CATEGORIES }
end
