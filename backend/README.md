# LIGHT CHASER SERVER

[中文版](README_zh.md) | English

Light Chaser data visualization editor backend basic open source version

- Java 17
- SpringBoot 3.2.5
- Mybatis Plus 3.5.5
- SQLite Database (Out-of-the-box)

## Quick Start

1. Clone the project
```bash
git clone https://github.com/xiaopujun/light-chaser-server.git
```
2. Run the project (automatically creates SQLite database)

```bash
mvn spring-boot:run
```

After the project starts, it will automatically:
- Create SQLite database file (`./data/light_chaser_server.db`)
- Execute database initialization scripts
- Store uploaded resource files in the `./data/resources` directory

## Database Description

The project uses SQLite database by default with the following advantages:
- No need to install database server
- Out-of-the-box, automatically creates database files
- Lightweight, suitable for development and small deployments
- Database file location: `./data/light_chaser_server.db`

## Configuration

To modify the database path or other configurations, adjust in application.yml:

```yaml
spring:
  datasource:
    url: jdbc:sqlite:./data/light_chaser_server.db  # SQLite database file path

light-chaser:
  project-resource-path: ./data/resources  # Project resource path
  source-image-path: /static/images/       # Project image component upload path
  cover-path: /static/covers/              # Project cover path
  migration:                               # Whether to automatically run database migration scripts
    enable: true
```

## Multi-Database Support

The project supports connection testing for multiple database types:

- **SQLite** - Default database, ready to use
- **MySQL** - Full support with connection pooling and configuration optimization
- **PostgreSQL** - Complete driver support with timeout configuration
- **Oracle** - Enterprise database support with connection management
- **SQL Server** - Microsoft SQL Server support with SSL configuration

### Database Connection Testing

Use the REST API to test database connections:

```bash
# Test SQLite connection (default)
curl http://localhost:8080/api/datasource/test/1

# Add and test other database types
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "MySQL Test",
  "type": 1,
  "username": "root",
  "password": "password",
  "url": "localhost:3306/testdb",
  "des": "MySQL database test connection"
}' http://localhost:8080/api/datasource/add
```

### Supported Database Types

| Database | Type ID | Default Port | URL Format |
|----------|---------|--------------|------------|
| SQLite | 0 | - | `jdbc:sqlite:./data/database.db` |
| MySQL | 1 | 3306 | `jdbc:mysql://localhost:3306/dbname` |
| PostgreSQL | 2 | 5432 | `jdbc:postgresql://localhost:5432/dbname` |
| Oracle | 3 | 1521 | `jdbc:oracle:thin:@localhost:1521/XE` |
| SQL Server | 4 | 1433 | `jdbc:sqlserver://localhost:1433;databaseName=dbname` |

## Features

- **Multi-database Connection Management** - Support for mainstream databases
- **Intelligent URL Normalization** - Automatic completion of incomplete database URLs
- **Connection Pool Optimization** - HikariCP with database-specific configurations
- **Friendly Error Handling** - Detailed error messages with solutions
- **Data Visualization Backend** - RESTful APIs for data visualization editor
- **File Upload Management** - Support for images and project files
- **Database Migration System** - Automatic schema versioning and updates

## Development

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- Git

### Build

```bash
mvn clean compile
```

### Run Tests

```bash
mvn test
```

### Package

```bash
mvn clean package
```

## API Documentation

### DataSource Management

- `GET /api/datasource/list` - Get all data sources
- `POST /api/datasource/add` - Add new data source
- `GET /api/datasource/test/{id}` - Test data source connection
- `POST /api/datasource/update` - Update data source
- `DELETE /api/datasource/del/{id}` - Delete data source

### Project Management

- File upload and management
- Project configuration and data persistence
- Cover image handling

## License

Apache License 2.0

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

If you encounter any issues or have questions, please create an issue in the [GitHub repository](https://github.com/xiaopujun/light-chaser-server/issues).