# Go Best Practices

## Project Structure

### Standard Go Project Layout
- Follow the standard Go project layout for larger projects
- Keep simple projects flat with minimal structure
- Use clear, descriptive directory names

```
project/
├── cmd/
│   └── myapp/
│       └── main.go
├── internal/
│   ├── handler/
│   ├── service/
│   └── repository/
├── pkg/
│   └── utils/
├── api/
├── web/
├── configs/
├── scripts/
├── build/
├── deployments/
├── test/
├── docs/
├── go.mod
├── go.sum
├── Makefile
└── README.md
```

### Package Organization
- Use `internal/` for private application code
- Use `pkg/` for library code that can be imported by external applications
- Keep `cmd/` for main applications
- Group related functionality into coherent packages

## Code Quality

### Error Handling
- Handle errors explicitly, don't ignore them
- Use sentinel errors for expected error conditions
- Wrap errors with context using `fmt.Errorf` or `errors.Wrap`
- Return errors as the last return value

```go
// Good
func processFile(filename string) (*Data, error) {
    file, err := os.Open(filename)
    if err != nil {
        return nil, fmt.Errorf("failed to open file %s: %w", filename, err)
    }
    defer file.Close()
    
    data, err := parseFile(file)
    if err != nil {
        return nil, fmt.Errorf("failed to parse file %s: %w", filename, err)
    }
    
    return data, nil
}

// Bad - ignoring errors
func processFile(filename string) *Data {
    file, _ := os.Open(filename)
    data, _ := parseFile(file)
    return data
}
```

### Concurrency
- Use goroutines for concurrent operations
- Communicate through channels, don't share memory
- Use `sync.WaitGroup` for waiting on multiple goroutines
- Implement proper context cancellation
- Use `sync.Once` for one-time initialization

```go
// Good - using channels for communication
func processItems(items []Item) <-chan Result {
    results := make(chan Result, len(items))
    
    go func() {
        defer close(results)
        var wg sync.WaitGroup
        
        for _, item := range items {
            wg.Add(1)
            go func(item Item) {
                defer wg.Done()
                result := processItem(item)
                results <- result
            }(item)
        }
        
        wg.Wait()
    }()
    
    return results
}
```

### Memory Management
- Be mindful of slice capacity to avoid memory leaks
- Use object pools for frequently allocated objects
- Profile memory usage in production applications
- Understand garbage collector behavior and tuning

```go
// Good - preventing slice memory leak
func filterLargeSlice(input []LargeStruct, predicate func(LargeStruct) bool) []LargeStruct {
    var result []LargeStruct
    for _, item := range input {
        if predicate(item) {
            result = append(result, item)
        }
    }
    return result
}

// Better - with capacity hint
func filterLargeSliceOptimized(input []LargeStruct, predicate func(LargeStruct) bool) []LargeStruct {
    result := make([]LargeStruct, 0, len(input)/4) // estimate capacity
    for _, item := range input {
        if predicate(item) {
            result = append(result, item)
        }
    }
    return result
}
```

## Interface Design

### Interface Principles
- Keep interfaces small and focused
- Define interfaces at the point of use, not implementation
- Use composition over inheritance
- Accept interfaces, return concrete types

```go
// Good - small, focused interface
type Writer interface {
    Write([]byte) (int, error)
}

type FileProcessor interface {
    Process(io.Reader) error
}

// Implementation accepts interface
func processFile(processor FileProcessor, filename string) error {
    file, err := os.Open(filename)
    if err != nil {
        return err
    }
    defer file.Close()
    
    return processor.Process(file)
}
```

### Embedding and Composition
- Use embedding for sharing behavior
- Prefer composition over inheritance
- Be explicit about interface satisfaction

```go
type Logger interface {
    Log(message string)
}

type TimestampLogger struct {
    Logger
}

func (tl *TimestampLogger) Log(message string) {
    timestamped := fmt.Sprintf("[%s] %s", time.Now().Format(time.RFC3339), message)
    tl.Logger.Log(timestamped)
}
```

## Testing

### Test Organization
- Place tests in the same package as the code being tested
- Use `_test.go` suffix for test files
- Use table-driven tests for multiple test cases
- Write benchmarks for performance-critical code

```go
func TestUserValidation(t *testing.T) {
    tests := []struct {
        name    string
        user    User
        wantErr bool
    }{
        {
            name: "valid user",
            user: User{Name: "John", Email: "john@example.com"},
            wantErr: false,
        },
        {
            name: "empty name",
            user: User{Name: "", Email: "john@example.com"},
            wantErr: true,
        },
        {
            name: "invalid email",
            user: User{Name: "John", Email: "invalid"},
            wantErr: true,
        },
    }
    
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            err := tt.user.Validate()
            if (err != nil) != tt.wantErr {
                t.Errorf("User.Validate() error = %v, wantErr %v", err, tt.wantErr)
            }
        })
    }
}
```

### Testing Best Practices
- Use testify for assertions and mocking when needed
- Write integration tests for critical paths
- Use build tags to separate unit and integration tests
- Mock external dependencies
- Test error conditions as well as happy paths

## Performance

### Optimization Guidelines
- Profile before optimizing
- Use `go tool pprof` for CPU and memory profiling
- Benchmark critical code paths
- Consider using `sync.Pool` for frequently allocated objects
- Optimize hot paths identified through profiling

```go
// Benchmark example
func BenchmarkStringConcatenation(b *testing.B) {
    for i := 0; i < b.N; i++ {
        var result string
        for j := 0; j < 100; j++ {
            result += "hello"
        }
    }
}

func BenchmarkStringBuilder(b *testing.B) {
    for i := 0; i < b.N; i++ {
        var builder strings.Builder
        for j := 0; j < 100; j++ {
            builder.WriteString("hello")
        }
        _ = builder.String()
    }
}
```

## Security

### Security Best Practices
- Validate all inputs from external sources
- Use secure random number generation (`crypto/rand`)
- Implement proper authentication and authorization
- Use HTTPS for all network communications
- Sanitize data before logging

```go
import (
    "crypto/rand"
    "crypto/subtle"
)

// Good - constant time comparison
func comparePasswords(hashedPassword, password []byte) bool {
    return subtle.ConstantTimeCompare(hashedPassword, password) == 1
}

// Good - secure random generation
func generateToken() (string, error) {
    bytes := make([]byte, 32)
    if _, err := rand.Read(bytes); err != nil {
        return "", err
    }
    return base64.URLEncoding.EncodeToString(bytes), nil
}
```

## Dependency Management

### Module Management
- Use Go modules for dependency management
- Pin versions in `go.mod` for reproducible builds
- Regularly update dependencies for security patches
- Use `go mod tidy` to clean up unused dependencies
- Vendor dependencies for critical applications

### Third-Party Libraries
- Choose well-maintained, popular libraries
- Minimize external dependencies
- Review licenses of dependencies
- Use semantic versioning for your own modules

## Configuration and Environment

### Configuration Management
- Use environment variables for configuration
- Provide sensible defaults
- Validate configuration at startup
- Use structured configuration with validation

```go
type Config struct {
    Port     int    `env:"PORT" envDefault:"8080"`
    Database string `env:"DATABASE_URL" validate:"required"`
    LogLevel string `env:"LOG_LEVEL" envDefault:"info"`
}

func LoadConfig() (*Config, error) {
    cfg := &Config{}
    if err := env.Parse(cfg); err != nil {
        return nil, fmt.Errorf("failed to parse config: %w", err)
    }
    
    validate := validator.New()
    if err := validate.Struct(cfg); err != nil {
        return nil, fmt.Errorf("invalid config: %w", err)
    }
    
    return cfg, nil
}
```

## Development Workflow

### Build and Deployment
- Use Makefiles for common tasks
- Implement proper CI/CD pipelines
- Use Docker for containerization
- Implement health checks and metrics endpoints
- Use semantic versioning for releases

### Code Organization
- Keep functions small and focused
- Use meaningful variable and function names
- Group related functionality into packages
- Document public APIs with clear comments
- Use consistent error handling patterns

## Go-Specific Guidelines

### Language Features
- Use `defer` for cleanup operations
- Leverage zero values effectively
- Use type switches for interface handling
- Implement `String()` method for custom types
- Use channels for communication between goroutines

```go
// Good use of defer
func processFile(filename string) error {
    file, err := os.Open(filename)
    if err != nil {
        return err
    }
    defer file.Close() // Always closes, even on early returns
    
    // Process file...
    return nil
}

// Good use of zero values
type User struct {
    Name  string
    Email string
    Age   int // Zero value is 0, which might be meaningful
}

// No need for constructor in many cases
func NewUser(name, email string) User {
    return User{
        Name:  name,
        Email: email,
        // Age defaults to 0
    }
}
```

### Standard Library Usage
- Prefer standard library solutions when available
- Use `context` package for cancellation and timeouts
- Leverage `fmt` package for formatted output
- Use `log/slog` for structured logging (Go 1.21+)
- Use appropriate data structures from standard library

## Anti-Patterns to Avoid

### Common Mistakes
- Don't use goroutines without proper synchronization
- Avoid global variables except for configuration
- Don't ignore errors or handle them generically
- Avoid premature optimization
- Don't use channels as mutexes

### Go-Specific Anti-Patterns
- Don't use `panic` for normal error handling
- Avoid empty interfaces (`interface{}`) when possible
- Don't mutate slices passed as parameters without documentation
- Avoid blocking operations in goroutines without timeouts
- Don't use `init()` functions for complex initialization

## Monitoring and Observability

### Metrics and Monitoring
- Implement health check endpoints
- Use structured logging with appropriate levels
- Implement metrics collection (Prometheus format)
- Add distributed tracing for microservices
- Monitor goroutine leaks and memory usage

```go
// Health check endpoint
func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
    status := map[string]string{
        "status":    "healthy",
        "timestamp": time.Now().UTC().Format(time.RFC3339),
        "version":   version.BuildVersion,
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(status)
}
```

### Performance Monitoring
- Use `expvar` package for runtime metrics
- Implement custom metrics for business logic
- Profile CPU and memory usage regularly
- Monitor response times and error rates
- Set up alerting for critical metrics
