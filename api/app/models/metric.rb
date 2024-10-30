class Metric < ApplicationRecord
  # Constants
  CATEGORIES = %w[engagement acquisition revenue feature]
  GRANULARITIES = %w[minute hourly daily]

  # Validations
  validates :name, :value, :timestamp, :category, :granularity, presence: true
  validates :value, numericality: true
  validates :category, inclusion: { in: CATEGORIES }
  validates :granularity, inclusion: { in: GRANULARITIES }
end
