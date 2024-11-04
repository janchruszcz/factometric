# Metrics API

A Rails API for managing and analyzing metrics data with support for time-series analytics and dashboard visualization.

## System Requirements

* Ruby 3.2.0+
* Rails 7.1+
* PostgreSQL 14+

## Database Schema

The application uses PostgreSQL with the following main table:

### Metrics
- `name` (string, required): Name of the metric
- `value` (decimal, required): Numeric value with precision of 20 and scale of 4
- `timestamp` (datetime, required): When the metric was recorded
- `category` (string, required): One of: engagement, acquisition, revenue, feature
- `granularity` (string, required): One of: minute, hourly, daily
- `source` (string, optional): Source of the metric
- `metadata` (jsonb): Additional metadata as JSON
- `tags` (string[]): Array of tags

## API Endpoints

### Metrics API (v1)

#### GET /api/v1/metrics
Fetch metrics with optional filtering:
- `search`: Filter by metric name
- `category`: Filter by category
- `granularity`: Filter by time granularity
- `start_date`: Filter by start date
- `end_date`: Filter by end date
- `source`: Filter by source
- `page`: Pagination (default: 1)

Response includes pagination headers.

#### POST /api/v1/metrics
Create a new metric:

Required fields:
```json
{
  "name": "string",
  "value": "decimal",
  "timestamp": "datetime",
  "category": "string",
  "granularity": "string"
}
```

Optional fields:
```json
{
  "source": "string",
  "tags": ["string"],
  "metadata": "jsonb"
}
```

#### GET /api/v1/metrics/:id
Fetch a single metric by ID

#### PUT /api/v1/metrics/:id
Update an existing metric

#### DELETE /api/v1/metrics/:id
Delete a metric

### Analytics API (v1)

#### GET /api/v1/analytics/summary
Get summary statistics for metrics:
- `count`: Total number of records
- `average`: Average value
- `min`: Minimum value
- `max`: Maximum value
- `sum`: Sum of values

Query parameters:
- `category`: Filter by category
- `start_date`: Start of time range
- `end_date`: End of time range

#### GET /api/v1/analytics/trends
Get time-series trend data with optional aggregation:
- `interval`: Aggregation interval (hour, day, week, month)
- `metric_name`: Filter by specific metric
- `category`: Filter by category

## Error Responses

All error responses follow this format:
```json
{
  "error": {
    "code": "error_code",
    "message": "Human readable message"
  }
}
```

Common error codes:
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `422`: Unprocessable Entity
- `429`: Too Many Requests

## Development Setup

1. Clone the repository
2. Install dependencies: `bundle install`
3. Setup database: `rails db:setup`
4. Run tests: `rspec`
5. Start server: `rails s`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT License. See LICENSE file for details.