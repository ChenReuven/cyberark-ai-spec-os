# Python Code Style Guide

This document outlines the coding style standards for Python projects, based on PEP 8 and community best practices.

## Code Layout

### Indentation
- Use 4 spaces per indentation level
- Never mix tabs and spaces
- Use spaces around operators and after commas
- Continuation lines should align wrapped elements vertically

```python
# Good
result = some_function(argument_one, argument_two,
                      argument_three, argument_four)

# Bad
result = some_function(argument_one, argument_two,
    argument_three, argument_four)
```

### Line Length
- Limit lines to 88 characters (Black formatter standard)
- For docstrings and comments, limit to 72 characters
- Use implied line continuation inside parentheses, brackets, and braces

### Blank Lines
- Two blank lines around top-level function and class definitions
- One blank line around method definitions inside classes
- Use blank lines sparingly to separate logical sections

```python
class MyClass:
    """Class docstring."""

    def __init__(self):
        """Constructor."""
        pass

    def method_one(self):
        """Method docstring."""
        pass

    def method_two(self):
        """Another method."""
        pass


def standalone_function():
    """Standalone function."""
    pass
```

## Imports

### Import Organization
Follow this specific order with blank lines between groups:

1. **Standard library imports** (built-in Python modules)
2. **Third-party imports** (external libraries)
3. **AWS/boto3 related imports**
4. **Internal framework imports** (infra-*, dpa-shared, etc.)
5. **Local application imports** (service.*)

```python
# Standard library
from http import HTTPStatus
from typing import Any, Dict, Optional

# Third-party
import boto3
from pydantic import BaseModel, Field

# AWS specific
from aws_lambda_context import LambdaContext
from mypy_boto3_kms.client import KMSClient

# Internal framework
from dpa_shared.config.dpa_config_resolver import DPAConfigResolver
from infra_logging.infra_logging import Logger, get_logger
from infra_tracing.infra_tracing import Tracer, get_tracer

# Local application
from service.logic.secrets_manager import SecretsManager
from service.models.secrets_mgmt_context import SecretsMgmtContext
from service.utils.ctx_utils import load_secrets_ctx_from_event
```

### Import Style
- Use absolute imports for all local application imports
- Avoid wildcard imports (`from module import *`) completely
- Import specific functions/classes from modules when they're frequently used
- Group related imports on the same line when appropriate
- Sort imports alphabetically within each group (use `isort` tool)

## Naming Conventions

### General Rules
- Use descriptive names that clearly indicate purpose
- Avoid abbreviations and single-letter names (except for counters)
- Use English words and avoid non-ASCII characters

### Specific Conventions

#### Variables and Functions
- Use `snake_case` for variables and functions
- Use descriptive names that clearly indicate purpose and domain context
- Prefer full words over abbreviations (except for widely understood terms)

```python
# Good
secret_metadata = load_secret_metadata(secret_id)
secrets_manager = SecretsManager(context)
tenant_id = extract_tenant_id_from_token(token)

# Bad
sm = get_sm(ctx)
md = load_md(id)
```

#### Classes
- Use `PascalCase` for class names
- Use descriptive nouns that represent the entity or concept
- Consider domain-specific naming patterns

```python
# Good
class SecretsManager:
    pass

class SecretsMgmtContext:
    pass

class DynamoSecretsMetadataDB:
    pass

# Bad
class secretsManager:
    pass

class db_conn:
    pass
```

#### Constants
- Use `UPPER_SNAKE_CASE` for module-level constants
- Group related constants together
- Use type hints for constants when appropriate

```python
# Good
SERVICE_NAME: str = "adb-secrets-mgmt-service"
MAX_RETRY_ATTEMPTS: int = 3
DEFAULT_TIMEOUT_SECONDS: int = 30

# Module-level service instances
TRACER: Tracer = get_tracer(SERVICE_NAME)
METRICS: Metrics = get_metrics()
```

#### Private Methods and Variables
- Use single leading underscore for internal use
- Use double leading underscore for name mangling (rare cases)

```python
class MyClass:
    def __init__(self):
        self.public_var = "public"
        self._internal_var = "internal"
        self.__private_var = "private"

    def public_method(self):
        pass

    def _internal_method(self):
        pass
```

## String Formatting

### Preferred Methods
1. f-strings (Python 3.6+) - preferred for simple formatting
2. `.format()` method - for complex formatting
3. `%` formatting - legacy, avoid in new code

```python
# Good - f-strings
name = "Alice"
age = 30
message = f"Hello, {name}! You are {age} years old."

# Good - .format() for complex cases
template = "User {name} has {count} items in {category}"
message = template.format(name=user.name, count=len(items), category="cart")

# Avoid - % formatting
message = "Hello, %s! You are %d years old." % (name, age)
```

## Comments and Docstrings

### Comments
- Use comments sparingly and only when necessary
- Write comments that explain "why", not "what"
- Keep comments up to date with code changes
- Use inline comments sparingly

```python
# Good - explains why
# We use a timeout here because the external API can be slow
response = requests.get(url, timeout=30)

# Bad - explains what (obvious from code)
# Get the response from the URL
response = requests.get(url)
```

### Docstrings
- Use triple double quotes for all docstrings (single-line and multi-line)
- Keep docstrings concise but informative
- Focus on business logic and domain concepts rather than implementation details
- Include key parameters and return information when not obvious from type hints

```python
def load_secret_metadata(secret_id: str, context: SecretsMgmtContext) -> SecretMetadata:
    """
    Load metadata for a managed secret from the metadata store.
    """
    # Implementation here

class SecretsManager:
    """
    Core service for managing secrets lifecycle operations.
    
    Handles creation, retrieval, rotation, and deletion of secrets
    across different secret stores and encryption methods.
    """

    def create_managed_secret(self, request: CreateSecretRequest) -> CreateSecretResponse:
        """
        Create a new managed secret with proper encryption and metadata storage.
        """
        # Implementation here
```

## Function and Method Design

### Function Length
- Keep functions short and focused (ideally under 50 lines)
- Extract complex logic into separate functions
- Use descriptive function names

### Parameters
- Limit number of parameters (ideally under 5)
- Use keyword arguments for optional parameters
- Use type hints for all parameters and return values

```python
def process_user_data(
    user_id: int,
    data: Dict[str, Any],
    validate: bool = True,
    timeout: int = 30
) -> ProcessingResult:
    """Process user data with optional validation."""
    pass
```

### Return Values
- Be consistent with return types
- Use `None` rather than empty collections when appropriate
- Consider using named tuples or dataclasses for complex return values

## Error Handling

### Exception Handling
- Catch specific exceptions, never use bare `except:`
- Use appropriate exception types for different error conditions
- Log exceptions with sufficient context for debugging and monitoring
- Use error handling decorators for consistent patterns across Lambda functions

```python
# Good - specific exception handling with logging
try:
    secret_data = secrets_store.load_secret(secret_id)
except SecretNotFoundException as e:
    logger.error(f"Secret not found: {secret_id}", extra={"secret_id": secret_id})
    raise SecretsMgmtError(ErrorCode.SECRET_NOT_FOUND, str(e))
except EncryptionError as e:
    logger.error(f"Failed to decrypt secret: {secret_id}", extra={"error": str(e)})
    raise SecretsMgmtError(ErrorCode.DECRYPTION_FAILED, str(e))
```

### Custom Exceptions
- Create domain-specific exception classes with clear inheritance
- Keep exceptions simple with clear error messages
- Use appropriate base exception types

```python
# Domain-specific exceptions
class SecretInactiveException(Exception):
    """Raised when attempting to use an inactive secret."""
    pass

class RotatorDisabledException(Exception):
    """Raised when secret rotation is disabled for the secret type."""
    pass

class ConnectorManagementClientException(Exception):
    """Raised when connector management operations fail."""
    pass
```

### Pylint Usage
- Use `# pylint: disable=` comments sparingly and only when necessary
- Document why pylint rules are being disabled
- Prefer fixing the underlying issue rather than disabling warnings
- Common acceptable disables in this codebase:
  - `# pylint: disable=too-many-arguments` for complex business methods
  - `# pylint: disable=unused-argument` for Lambda handlers with unused parameters

## Class Design

### Class Structure
- Order methods logically: special methods, public methods, private methods
- Use properties for computed attributes
- Implement `__str__` and `__repr__` for better debugging

```python
class User:
    """Represents a user in the system."""

    def __init__(self, user_id: int, name: str, email: str):
        self.user_id = user_id
        self.name = name
        self.email = email
        self._created_at = datetime.now()

    def __str__(self) -> str:
        return f"User({self.name})"

    def __repr__(self) -> str:
        return f"User(id={self.user_id}, name='{self.name}', email='{self.email}')"

    @property
    def age_days(self) -> int:
        """Calculate age in days since creation."""
        return (datetime.now() - self._created_at).days

    def update_email(self, new_email: str) -> None:
        """Update user's email address."""
        self._validate_email(new_email)
        self.email = new_email

    def _validate_email(self, email: str) -> None:
        """Validate email format."""
        if "@" not in email:
            raise ValueError("Invalid email format")
```

## Pydantic Models

### Model Definition
- Use Pydantic models extensively for data validation, API contracts, and configuration
- Define field types explicitly with comprehensive type hints
- Use `Field()` for validation constraints and documentation
- Leverage `Literal` types for discriminated unions and string constants
- Use proper inheritance patterns for related models

```python
from typing import Literal, Optional, Union
from pydantic import BaseModel, Field, field_validator

class SecretMetadata(BaseModel):
    """Base metadata for all secret types."""
    
    secret_id: str = Field(..., description="Unique secret identifier")
    tenant_id: str = Field(..., description="Tenant identifier")
    secret_type: str = Field(..., description="Type of secret")
    is_active: bool = Field(default=True, description="Whether secret is active")
    
class IAMUserSecretData(BaseModel):
    """Secret data for IAM user credentials."""
    access_key_id: str = Field(..., description="AWS access key ID")
    secret_access_key: str = Field(..., description="AWS secret access key")

class _TypedIAMUserSecretData(IAMUserSecretData):
    """
    Using type to be able to differentiate when used in a discriminated union
    """
    type: Literal['IAM'] = Field(default='IAM', description='Type of the secret')

# Discriminated union for different secret types
CustomerSecretDataTypes = Union[
    _TypedIAMUserSecretData,
    _TypedPAMAccountSecretData,
    # ... other secret types
]
```### Model Usage Patterns
- Use models for API request/response validation in Lambda functions
- Use models for configuration management and settings
- Leverage Pydantic for data serialization/deserialization
- Use discriminated unions for polymorphic data structures

```python
# API request validation in Lambda handlers
def lambda_handler(event: dict, context: LambdaContext) -> dict:
    """Lambda handler with proper request validation."""
    try:
        # Validate request using Pydantic model
        request = CreateSecretRequest.model_validate(event['body'])
        
        # Process request
        result = secrets_manager.create_secret(request)
        
        # Return validated response
        return result.model_dump()
    except ValidationError as e:
        logger.error(f"Request validation failed: {e}")
        return build_error_response(HTTPStatus.BAD_REQUEST, str(e))

# Configuration management
class SecretsMgmtServiceConfig(BaseModel):
    """Service configuration with validation."""
    tenant_id: str
    kms_key_id: Optional[str] = None
    encryption_enabled: bool = True
    
    @classmethod
    def from_environment(cls) -> 'SecretsMgmtServiceConfig':
        """Load configuration from environment variables."""
        return cls.model_validate(os.environ)
```

### Field Validation
- Use built-in validators when possible (`EmailStr`, `HttpUrl`, etc.)
- Create custom validators for business logic
- Use `Field()` constraints for simple validation
- Group related validation in model validators

```python
from pydantic import BaseModel, Field, validator, root_validator
from typing import List, Optional

class ProductModel(BaseModel):
    """Product model with comprehensive validation."""
    
    name: str = Field(..., min_length=3, max_length=100)
    price: float = Field(..., gt=0, description="Price in USD")
    discount_percent: Optional[float] = Field(None, ge=0, le=100)
    tags: List[str] = Field(default_factory=list)
    
    @validator('tags')
    def validate_tags(cls, v):
        """Validate product tags."""
        if len(v) > 10:
            raise ValueError('Too many tags (maximum 10)')
        return [tag.lower().strip() for tag in v]
    
    @root_validator
    def validate_discount(cls, values):
        """Validate discount logic."""
        price = values.get('price')
        discount = values.get('discount_percent')
        
        if price and discount and price < 10 and discount > 50:
            raise ValueError('High discount not allowed for low-price items')
        
        return values
```

## Code Formatting Tools

### Recommended Tools for This Project
- **Poetry**: Dependency management and virtual environments (primary)
- **pylint**: Code analysis and style checking (actively used in codebase)
- **mypy**: Static type checking (included in dependencies)
- **Pydantic**: Data validation and settings management (core dependency)
- **boto3-stubs**: Type stubs for AWS SDK (included in dependencies)

### Project-Specific Configuration

#### pyproject.toml (Poetry configuration)
```toml
[tool.poetry]
name = "adb-secrets-mgmt-service"
version = "3.1"
description = "Secrets Management for ADB"

[tool.poetry.dependencies]
python = "^3.11 || ^3.13"
pydantic = "*"
mypy = "*"
boto3-stubs = { extras = ["dynamodb", "kms", "sts", "secretsmanager", "ssm", "events", "scheduler"], version = "*" }

[tool.pytest.ini_options]
filterwarnings = [
    "error::pydantic.warnings.PydanticDeprecatedSince20",
    "error::pydantic.warnings.PydanticDeprecationWarning"
]
```

### Lambda Function Patterns
- Use consistent patterns for Lambda handlers
- Implement proper error handling decorators
- Use structured logging with correlation IDs
- Follow the established import organization

## File Organization

### Module Structure
- Organize by domain functionality (secrets, identity, stores, rotators, monitoring)
- Keep modules focused on single responsibilities
- Use `__init__.py` to control public interfaces
- Separate Lambda handlers from business logic

### File Naming Conventions
- Use `snake_case` for all Python module names
- Use descriptive names that reflect the module's purpose
- Follow established patterns in the codebase

```python
# Good module names (following project patterns)
secrets_manager.py
secret_manager_types.py
dynamo_secrets_metadata_db.py
managed_kms_secret_encryptor.py
load_secret_session.py

# Lambda handler naming
list_secrets.py
create_secret.py
disable_secret.py
```

### Package Organization
- Group related Lambda functions by visibility (public/, private/, scheduled/)
- Separate core logic from Lambda handlers
- Use factory patterns for complex object creation
- Maintain clear boundaries between different service areas

```
service/
├── lambdas/
│   ├── public/secrets/          # Public API endpoints
│   ├── private/identity/        # Internal API endpoints  
│   └── scheduled/rotation/      # Scheduled tasks
├── logic/
│   ├── secrets_manager.py       # Core business logic
│   ├── stores/                  # Secret storage implementations
│   ├── rotators/                # Secret rotation logic
│   └── monitoring/              # Observability and monitoring
├── models/                      # Pydantic models and schemas
└── utils/                       # Utility functions and helpers
```

This style guide reflects the actual patterns and conventions used in this AWS Lambda-based secrets management service.
