# Go Code Style Guide

This document outlines the coding style standards for Go projects, based on the official Go style guide and community best practices.

## Code Formatting

### Automatic Formatting
- Always use `gofmt` or `goimports` to format code
- Configure your editor to format on save
- Use `goimports` to automatically manage imports
- Follow the formatting decisions made by `gofmt`

### Line Length
- No strict line length limit (gofmt handles this)
- Break long lines naturally at logical points
- Prefer readability over strict length limits

## Package and Import Organization

### Package Naming
- Use short, concise package names
- Use lowercase, single-word names when possible
- Avoid underscores, hyphens, or mixed caps
- Make package names descriptive of their purpose

```go
// Good
package user
package http
package template

// Bad
package userManager
package user_manager
package HTTP
```

### Import Organization
- Use `goimports` to automatically organize imports
- Group imports in the following order:
  1. Standard library
  2. Third-party packages
  3. Local packages

```go
import (
    // Standard library
    "context"
    "fmt"
    "net/http"
    
    // Third-party
    "github.com/gorilla/mux"
    "github.com/stretchr/testify/assert"
    
    // Local
    "github.com/company/project/internal/user"
    "github.com/company/project/pkg/logger"
)
```

### Import Style
- Use blank imports only for side effects
- Avoid dot imports except in test files
- Use descriptive aliases for conflicting package names

```go
// Good - descriptive alias
import (
    "database/sql"
    
    mysqldriver "github.com/go-sql-driver/mysql"
    postgresdriver "github.com/lib/pq"
)

// Bad - unclear alias
import (
    sql1 "database/sql"
    sql2 "another/sql/package"
)
```

## Naming Conventions

### General Principles
- Use mixedCaps (camelCase) for multi-word names
- Use short names for short variable lifetimes
- Use descriptive names for longer lifetimes
- Be consistent with naming patterns

### Variables and Functions
- Use camelCase for unexported names
- Use PascalCase for exported names
- Use single letters for short-lived variables (i, j, k for loops)
- Use descriptive names for longer-lived variables

```go
// Good
var userCount int
var maxRetryAttempts = 3

func calculateTotalPrice(items []Item) float64 {
    var total float64
    for _, item := range items {
        total += item.Price
    }
    return total
}

// Exported function
func ProcessUserData(userData []byte) (*User, error) {
    // ...
}
```

### Constants
- Use camelCase or PascalCase depending on visibility
- Group related constants in blocks
- Use iota for sequential constants

```go
// Good
const (
    maxRetries = 3
    timeout    = 30 * time.Second
)

// Exported constants
const (
    StatusPending = "pending"
    StatusActive  = "active"
    StatusInactive = "inactive"
)

// Using iota
const (
    StatusUnknown Status = iota
    StatusPending
    StatusActive
    StatusInactive
)
```

### Types and Structs
- Use PascalCase for exported types
- Use camelCase for unexported types
- Use descriptive names that indicate purpose
- Avoid stuttering (e.g., `user.UserManager` should be `user.Manager`)

```go
// Good
type User struct {
    ID    int64  `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

type userRepository struct {
    db *sql.DB
}

// Bad - stuttering
type UserUser struct {} // redundant
type user.UserManager struct {} // should be user.Manager
```

### Interfaces
- Use single-method interfaces when possible
- Name interfaces with -er suffix for single methods
- Place interfaces close to their usage, not implementation

```go
// Good - single method interface
type Writer interface {
    Write([]byte) (int, error)
}

type Reader interface {
    Read([]byte) (int, error)
}

// Good - multi-method interface
type UserRepository interface {
    Create(user *User) error
    GetByID(id int64) (*User, error)
    Update(user *User) error
    Delete(id int64) error
}
```

### Methods and Receivers
- Use short, consistent receiver names
- Use pointer receivers for methods that modify the receiver
- Use pointer receivers for large structs
- Be consistent with receiver type within a type

```go
type User struct {
    ID   int64
    Name string
}

// Good - consistent short receiver name
func (u *User) SetName(name string) {
    u.Name = name
}

func (u *User) GetName() string {
    return u.Name
}

// Bad - inconsistent receiver names
func (user *User) SetEmail(email string) {} // should be 'u'
func (usr *User) GetEmail() string {}       // should be 'u'
```

## Comments and Documentation

### Package Documentation
- Write package comments for all packages
- Start with "Package packagename ..."
- Place before package declaration

```go
// Package user provides functionality for managing user accounts,
// including creation, authentication, and profile management.
//
// This package handles user data validation, password hashing,
// and integration with the authentication service.
package user
```

### Function Documentation
- Document all exported functions
- Start with the function name
- Explain what the function does, not how
- Document parameters and return values when not obvious

```go
// ProcessPayment processes a payment transaction for the given amount.
// It validates the payment details, charges the payment method, and
// returns a transaction ID on success.
//
// Returns an error if the payment fails or if the amount is invalid.
func ProcessPayment(amount float64, paymentMethod PaymentMethod) (string, error) {
    // Implementation...
}
```

### Type Documentation
- Document all exported types
- Explain the purpose and usage of the type
- Document important fields when not obvious

```go
// User represents a registered user in the system.
// It contains authentication and profile information.
type User struct {
    // ID is the unique identifier for the user
    ID int64 `json:"id"`
    
    // Name is the user's display name
    Name string `json:"name"`
    
    // Email is the user's email address, used for authentication
    Email string `json:"email"`
    
    // createdAt is the timestamp when the user was created
    createdAt time.Time
}
```

### Inline Comments
- Use inline comments sparingly
- Explain complex business logic or non-obvious code
- Avoid comments that restate the code

```go
// Good - explains why
// We use a buffer here to avoid multiple allocations
// when building the SQL query string
var buffer strings.Builder

// Bad - restates the code
// Set the user name to the provided name
user.Name = name
```

## Error Handling

### Error Creation
- Use `fmt.Errorf` with verb `%w` to wrap errors
- Create sentinel errors for expected conditions
- Use custom error types for complex error information

```go
// Sentinel errors
var (
    ErrUserNotFound = errors.New("user not found")
    ErrInvalidEmail = errors.New("invalid email format")
)

// Error wrapping
func GetUser(id int64) (*User, error) {
    user, err := db.FindUser(id)
    if err != nil {
        if errors.Is(err, sql.ErrNoRows) {
            return nil, ErrUserNotFound
        }
        return nil, fmt.Errorf("failed to get user %d: %w", id, err)
    }
    return user, nil
}

// Custom error type
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation failed for field %s: %s", e.Field, e.Message)
}
```

### Error Checking
- Always check errors explicitly
- Handle errors at the appropriate level
- Don't ignore errors unless absolutely necessary

```go
// Good
func processFile(filename string) error {
    file, err := os.Open(filename)
    if err != nil {
        return fmt.Errorf("failed to open file: %w", err)
    }
    defer file.Close()
    
    data, err := io.ReadAll(file)
    if err != nil {
        return fmt.Errorf("failed to read file: %w", err)
    }
    
    return processData(data)
}

// Bad - ignoring errors
func processFile(filename string) error {
    file, _ := os.Open(filename) // Don't ignore errors
    defer file.Close()
    
    data, _ := io.ReadAll(file) // Don't ignore errors
    return processData(data)
}
```

## Function and Method Design

### Function Length
- Keep functions focused on a single responsibility
- Break down large functions into smaller, testable units
- Aim for functions that fit on a single screen

### Parameter Design
- Limit the number of parameters (prefer structs for many parameters)
- Use meaningful parameter names
- Consider using options pattern for configuration

```go
// Good - using options pattern
type ServerOptions struct {
    Port    int
    Timeout time.Duration
    Debug   bool
}

func NewServer(opts ServerOptions) *Server {
    // Set defaults if needed
    if opts.Port == 0 {
        opts.Port = 8080
    }
    if opts.Timeout == 0 {
        opts.Timeout = 30 * time.Second
    }
    
    return &Server{
        port:    opts.Port,
        timeout: opts.Timeout,
        debug:   opts.Debug,
    }
}

// Alternative: functional options
type ServerOption func(*Server)

func WithPort(port int) ServerOption {
    return func(s *Server) {
        s.port = port
    }
}

func WithTimeout(timeout time.Duration) ServerOption {
    return func(s *Server) {
        s.timeout = timeout
    }
}
```

### Return Values
- Return errors as the last return value
- Use named return values for documentation, not for control flow
- Consider returning structs instead of multiple values

```go
// Good - error as last return value
func parseUser(data []byte) (*User, error) {
    var user User
    if err := json.Unmarshal(data, &user); err != nil {
        return nil, fmt.Errorf("failed to parse user: %w", err)
    }
    return &user, nil
}

// Good - named returns for documentation
func divide(a, b float64) (result float64, err error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}
```

## Struct Design

### Field Organization
- Group related fields together
- Put exported fields before unexported fields
- Use struct tags appropriately for serialization

```go
type User struct {
    // Exported fields
    ID       int64     `json:"id" db:"id"`
    Name     string    `json:"name" db:"name" validate:"required,min=1,max=100"`
    Email    string    `json:"email" db:"email" validate:"required,email"`
    Active   bool      `json:"active" db:"active"`
    
    // Timestamps
    CreatedAt time.Time `json:"created_at" db:"created_at"`
    UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
    
    // Unexported fields
    password string
    salt     string
}
```

### Constructor Functions
- Provide constructor functions for complex initialization
- Use `New` prefix for constructors
- Initialize all necessary fields

```go
func NewUser(name, email string) *User {
    return &User{
        Name:      name,
        Email:     email,
        Active:    true,
        CreatedAt: time.Now(),
        UpdatedAt: time.Now(),
    }
}

// Constructor with validation
func NewUserWithValidation(name, email string) (*User, error) {
    if name == "" {
        return nil, errors.New("name is required")
    }
    if !isValidEmail(email) {
        return nil, errors.New("invalid email format")
    }
    
    return NewUser(name, email), nil
}
```

## Concurrency Patterns

### Goroutine Management
- Always have a clear goroutine lifecycle
- Use context for cancellation
- Avoid goroutine leaks

```go
// Good - proper goroutine management
func processItems(ctx context.Context, items []Item) error {
    const maxWorkers = 10
    sem := make(chan struct{}, maxWorkers)
    var wg sync.WaitGroup
    
    for _, item := range items {
        select {
        case <-ctx.Done():
            break
        case sem <- struct{}{}:
            wg.Add(1)
            go func(item Item) {
                defer wg.Done()
                defer func() { <-sem }()
                
                if err := processItem(ctx, item); err != nil {
                    log.Printf("Failed to process item %v: %v", item.ID, err)
                }
            }(item)
        }
    }
    
    wg.Wait()
    return ctx.Err()
}
```

### Channel Usage
- Use channels for communication, not synchronization
- Close channels when no more data will be sent
- Use buffered channels judiciously

```go
// Good - producer-consumer pattern
func generateNumbers(ctx context.Context, max int) <-chan int {
    numbers := make(chan int)
    
    go func() {
        defer close(numbers)
        for i := 1; i <= max; i++ {
            select {
            case <-ctx.Done():
                return
            case numbers <- i:
            }
        }
    }()
    
    return numbers
}
```

## Testing Style

### Test Function Naming
- Use descriptive test names that explain the scenario
- Follow the pattern `TestFunctionName_Scenario_ExpectedBehavior`
- Use table-driven tests for multiple scenarios

```go
func TestUserValidation_EmptyName_ReturnsError(t *testing.T) {
    user := User{Name: "", Email: "test@example.com"}
    
    err := user.Validate()
    
    if err == nil {
        t.Error("Expected error for empty name, got nil")
    }
}

func TestCalculateTotal_VariousInputs(t *testing.T) {
    tests := []struct {
        name     string
        items    []Item
        expected float64
    }{
        {
            name:     "empty items",
            items:    []Item{},
            expected: 0.0,
        },
        {
            name:     "single item",
            items:    []Item{{Price: 10.5}},
            expected: 10.5,
        },
        {
            name:     "multiple items",
            items:    []Item{{Price: 10.0}, {Price: 15.5}},
            expected: 25.5,
        },
    }
    
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result := calculateTotal(tt.items)
            if result != tt.expected {
                t.Errorf("calculateTotal() = %v, want %v", result, tt.expected)
            }
        })
    }
}
```

### Test Organization
- Keep test files in the same package as the code
- Use `testdata/` directory for test fixtures
- Group related tests in subtests

## Build and Tooling

### Go Modules
- Use Go modules for dependency management
- Keep `go.mod` and `go.sum` in version control
- Use semantic versioning for your modules

### Build Tags
- Use build tags for environment-specific code
- Document build tag requirements in README

```go
//go:build integration
// +build integration

package user_test

// Integration tests that require external dependencies
```

### Code Quality Tools
- Use `go vet` to catch common mistakes
- Use `golangci-lint` for comprehensive linting
- Configure pre-commit hooks for code quality

### Recommended Tools
- **gofmt**: Code formatting
- **goimports**: Import management
- **go vet**: Static analysis
- **golangci-lint**: Comprehensive linting
- **gotests**: Test generation
- **go mod**: Dependency management

## File Organization

### File Naming
- Use lowercase with underscores for multi-word files
- Use descriptive names that indicate file purpose
- Group related functionality in the same file

```
// Good file names
user.go
user_test.go
user_repository.go
http_handler.go
config_loader.go

// Bad file names
User.go
userTest.go
user-repository.go
HTTPHandler.go
```

### Directory Structure
- Keep files focused on a single concern
- Use internal packages for implementation details
- Organize by feature, not by layer when possible

This style guide should be used in conjunction with automated formatting and linting tools to maintain consistent code quality across Go projects.
