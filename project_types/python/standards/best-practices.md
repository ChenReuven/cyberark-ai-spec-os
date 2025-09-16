# Python Best Practices

## Code Organization

### Project Structure
- Use a clear, hierarchical project structure based on domain functionality
- Separate service logic, lambdas, models, utilities, and tests
- Follow the established project layout:
  ```
  project/
  ├── service/
  │   ├── lambdas/          # Lambda function handlers
  │   │   ├── public/       # Public API endpoints
  │   │   ├── private/      # Internal API endpoints
  │   │   └── scheduled/    # Scheduled tasks
  │   ├── logic/            # Core business logic
  │   ├── models/           # Data models and schemas
  │   └── utils/            # Utility functions
  ├── tests/
  │   ├── unit/             # Unit tests
  │   ├── integration/      # Integration tests
  │   └── e2e/              # End-to-end tests
  ├── cdk/                  # Infrastructure as code
  └── pyproject.toml        # Project dependencies and config
  ```

### Module and Package Design
- Keep modules focused on a single responsibility (following domain-driven design)
- Use `__init__.py` files to control package imports and expose public APIs
- Avoid circular imports by restructuring dependencies or using forward references
- Group related functionality into logical packages (e.g., `stores/`, `rotators/`, `monitoring/`)
- Use clear separation between public APIs and internal implementation details

## Code Quality

### Error Handling
- Use specific exception types rather than bare `except:`
- Create custom exception classes for domain-specific errors (e.g., `SecretInactiveException`, `RotatorDisabledException`)
- Use structured error handling with proper logging and context
- Implement error decorators for consistent error handling across lambdas
- Use `try`/`except`/`finally` blocks appropriately
- Always log exceptions with sufficient context for debugging and monitoring

### Type Hints
- Use comprehensive type hints for all function parameters and return values
- Leverage `typing` module for complex types (`Dict`, `List`, `Optional`, `Union`)
- Use `Literal` types for string constants and enums
- Use `mypy` for static type checking (included in dependencies)
- Consider using `TypedDict` for dictionary structures with known keys
- Use proper type hints for AWS SDK types (e.g., `mypy_boto3_*`)

### Documentation
- Write clear, concise docstrings for all public functions and classes
- Use triple quotes for all docstrings, even single-line ones
- Include parameter descriptions and return value information
- Document complex business logic with inline comments explaining "why"
- Maintain up-to-date README and API documentation

## Performance and Efficiency

### Memory Management
- Use generators for large datasets to save memory (especially for batch operations)
- Be mindful of object lifecycle in Lambda functions (consider cold start implications)
- Use appropriate data structures (sets for membership tests, deques for queues)
- Cache expensive computations appropriately (consider Lambda execution context reuse)
- Use connection pooling for database and external service connections

### Algorithmic Efficiency
- Choose appropriate algorithms and data structures for the scale of operations
- Use built-in functions and libraries when possible
- Profile code to identify bottlenecks, especially for high-traffic Lambda functions
- Consider using `functools.lru_cache` for expensive computations that persist across Lambda invocations
- Optimize database queries and batch operations where possible

## Security

### Input Validation
- Validate and sanitize all user inputs using Pydantic models
- Use parameterized queries for database operations (DynamoDB, etc.)
- Avoid `eval()` and `exec()` with untrusted input
- Implement proper authentication and authorization using tenant isolation decorators
- Validate path parameters and request bodies in Lambda functions
- Use proper secret management for sensitive data (AWS Secrets Manager, KMS)

### Dependencies
- Keep dependencies up to date using Poetry dependency management
- Use version constraints in `pyproject.toml` with appropriate flexibility (e.g., `^3.11` for Python)
- Pin specific versions for critical dependencies to ensure reproducible builds
- Use internal artifactory for internal dependencies with proper versioning
- Regularly audit dependencies for security vulnerabilities
- Use virtual environments and isolated container deployments

## Testing

### Test Coverage
- Aim for high test coverage (80%+ line coverage)
- Write unit tests for individual components and business logic
- Include integration tests for AWS service interactions
- Write end-to-end tests for critical user flows
- Test Lambda functions with appropriate mocking of AWS services
- Use property-based testing for complex logic validation

### Test Organization
- Follow AAA pattern (Arrange, Act, Assert)
- Use descriptive test names that explain the scenario being tested
- Group related tests in test classes with clear naming conventions
- Use fixtures for common test setup (conftest.py files)
- Separate unit, integration, and e2e tests into different directories
- Use helper classes and utilities for common test operations
- Mock external dependencies appropriately (AWS services, external APIs)

## Development Workflow

### Version Control
- Use meaningful commit messages following conventional commit standards
- Make small, atomic commits that can be easily reviewed
- Use feature branches for development with clear naming conventions
- Implement proper code review processes with required approvals
- Use CODEOWNERS file to ensure appropriate reviewers

### Development Environment
- Use Poetry for dependency management and virtual environment isolation
- Maintain consistent development environments across team using Poetry lock files
- Use pre-commit hooks for code quality checks (formatting, linting)
- Implement continuous integration/deployment with proper testing stages
- Use CDK for infrastructure as code with proper environment separation
- Maintain separate environments for dev, staging, and production

## AWS Lambda and Service-Specific Guidelines

### Lambda Function Design
- Keep Lambda handlers thin - delegate to service layer for business logic
- Initialize expensive resources (clients, connections) outside the handler when possible
- Use proper error handling decorators for consistent error responses
- Implement proper logging and tracing for observability
- Use appropriate timeout and memory configurations

### AWS Service Integration
- Use boto3 with proper session management and error handling
- Implement proper retry logic for AWS service calls
- Use AWS SDK type stubs (`boto3-stubs`) for better type safety
- Handle AWS service exceptions appropriately
- Use appropriate AWS services for different use cases (DynamoDB, Secrets Manager, KMS, etc.)

### Monitoring and Observability
- Use structured logging with proper context and correlation IDs
- Implement distributed tracing for request flows
- Use metrics collection for monitoring service health
- Implement proper error reporting and alerting
- Use monitoring decorators for consistent observability patterns

### Third-Party Libraries
- Use Poetry for dependency management (`pyproject.toml`)
- Choose well-maintained libraries with proper security practices
- Use internal artifactory for CyberArk-specific libraries
- Understand library dependencies and their implications for deployment size
- Use Pydantic for data validation and serialization
- Leverage AWS Lambda Powertools for common Lambda patterns

## Anti-Patterns to Avoid

### Code Smells
- Avoid deep nesting (use early returns and guard clauses)
- Don't use global variables unnecessarily (prefer dependency injection)
- Avoid monolithic functions (break into smaller, focused methods)
- Don't ignore error conditions (always handle exceptions appropriately)
- Avoid excessive pylint disables (fix the underlying issues instead)

### Python-Specific Anti-Patterns
- Don't use mutable default arguments
- Avoid using `import *` except in very specific cases
- Don't modify lists while iterating over them
- Avoid string concatenation in loops (use `join()` or f-strings)
- Don't ignore type hints warnings from mypy

### Lambda-Specific Anti-Patterns
- Don't put business logic directly in Lambda handlers
- Avoid initializing resources inside the handler function
- Don't ignore cold start implications for performance-critical paths
- Avoid tight coupling between Lambda functions and specific AWS resources

## Performance Monitoring

### Profiling and Monitoring
- Use AWS CloudWatch for Lambda function monitoring
- Implement custom metrics for business logic monitoring
- Use distributed tracing to understand request flows
- Monitor cold start times and optimize accordingly
- Use proper logging levels to avoid performance impact

### Optimization
- Profile before optimizing (measure first, optimize second)
- Focus on algorithmic improvements first
- Optimize AWS service calls (batch operations, connection reuse)
- Consider Lambda memory allocation for compute-intensive operations
- Use appropriate caching strategies for frequently accessed data

## Service Architecture Patterns

### Domain-Driven Design
- Organize code by domain concepts (secrets, identity, stores, rotators)
- Use clear boundaries between different service areas
- Implement proper abstraction layers (interfaces, factories)
- Keep related functionality grouped together

### Dependency Management
- Use dependency injection for testability
- Create factory classes for complex object creation
- Use abstract base classes for pluggable implementations
- Avoid tight coupling between layers
