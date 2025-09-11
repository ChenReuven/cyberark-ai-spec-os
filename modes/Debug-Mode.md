# Debug Mode Instructions

You are in debug mode. Your primary objective is to systematically identify, analyze, and resolve bugs in the Admin Portal UI application. Follow this structured debugging process:

## Phase 1: Problem Assessment

### 1. Gather Context
Understand the current issue by examining:
- **Error Messages**: Read error messages, stack traces, or failure reports
- **Codebase Structure**: Examine the project structure and recent changes
- **Expected vs Actual**: Identify the expected vs actual behavior
- **Test Failures**: Review relevant test files and their failures
- **Recent Changes**: Check git history for recent modifications

### 2. Reproduce the Bug
Before making any changes:
- **Run Application/Tests**: Execute the application or tests to confirm the issue
- **Document Steps**: Record the exact steps to reproduce the problem
- **Capture Outputs**: Document error outputs, logs, or unexpected behaviors
- **Create Bug Report**: Provide a clear bug report with:
  - Steps to reproduce
  - Expected behavior
  - Actual behavior
  - Error messages/stack traces
  - Environment details (Node.js version, npm version, OS)

## Phase 2: Investigation

### 3. Root Cause Analysis
Systematically trace the issue:
- **Code Execution Path**: Follow the code execution leading to the bug
- **Variable States**: Examine variable states, data flows, and control logic
- **Common Issues**: Check for:
  - Null/undefined references
  - Off-by-one errors
  - Race conditions
  - Incorrect assumptions
  - Type mismatches
  - Async/await issues
- **Component Interactions**: Use search tools to understand how affected components interact
- **Dependencies**: Review package.json for version conflicts or missing dependencies

### 4. Hypothesis Formation
- **Form Hypotheses**: Create specific theories about what's causing the issue
- **Prioritize**: Rank hypotheses by likelihood and impact
- **Plan Verification**: Design test steps for each hypothesis

## Phase 3: Resolution

### 5. Implement Fix
Make targeted, minimal changes:
- **Address Root Cause**: Fix the underlying issue, not just symptoms
- **Follow Patterns**: Ensure changes follow existing code patterns and conventions
- **Defensive Programming**: Add appropriate error handling and validation
- **Edge Cases**: Consider edge cases and potential side effects
- **Type Safety**: Maintain TypeScript type safety

### 6. Verification
Thoroughly test the fix:
- **Run Tests**: Execute tests to verify the fix resolves the issue
- **Reproduce Steps**: Execute the original reproduction steps to confirm resolution
- **Regression Testing**: Run broader test suites to ensure no regressions
- **Edge Case Testing**: Test related edge cases and boundary conditions

## Phase 4: Quality Assurance

### 7. Code Quality
Ensure the fix maintains quality:
- **Code Review**: Review the fix for quality and maintainability
- **Test Coverage**: Add or update tests to prevent regression
- **Documentation**: Update relevant documentation if necessary
- **Similar Issues**: Consider if similar bugs might exist elsewhere in the codebase

### 8. Final Report
Document the resolution:
- **Summary**: What was fixed and how
- **Root Cause**: Explanation of the underlying issue
- **Preventive Measures**: Any measures taken to prevent similar issues
- **Improvements**: Suggestions for preventing similar issues

## Admin Portal UI Specific Debugging

### Common Issues & Solutions

#### 1. Feature Flag Issues
```tsx
// Check feature flag configuration
import { useFeatureFlag } from "../core/feature-flags/hooks/useFeatureFlag";

// Verify flag is properly set
const hasFeature = useFeatureFlag("feature-name");
console.log("Feature flag value:", hasFeature);
```

#### 2. Shell Integration Issues
```tsx
// Check if running in Shell environment
import { isPartOfShell } from "../core/utils/shell-utils";

const shellStatus = isPartOfShell();
console.log("Running in Shell:", shellStatus);
```

#### 3. Authentication/Authorization Issues
```tsx
// Verify user rights and roles
import { useAuthorization } from "../core/hooks/auth/useAuthorization";
import { RightsEnum } from "../core/types/auth.types";

const canPerformAction = useAuthorization([RightsEnum.DomainCustomization]);
console.log("User can perform action:", canPerformAction);
```

#### 4. API/Network Issues
```tsx
// Check API responses and errors
import { Api } from "../core/api/api";

// Verify API configuration
console.log("API base URL:", Api.defaults.baseURL);
console.log("API headers:", Api.defaults.headers);
```

#### 5. Component Rendering Issues
```tsx
// Add debugging to component lifecycle
useEffect(() => {
  console.log("Component mounted with props:", props);
  console.log("Component state:", state);
}, [props, state]);
```

### Debug Tools & Commands

#### 1. Development Commands
```bash
# Start development server with debugging
npm start

# Run tests with verbose output
npm run test:unit -- --verbose

# Check for TypeScript errors
npx tsc --noEmit

# Run linting with detailed output
npm run lint:ci
```

#### 2. Testing Commands
```bash
# Run specific test file
npm run test:unit -- ComponentName.test.tsx

# Run tests with coverage
npm run test:unit:coverage

# Run E2E tests
npm run test:e2e:mock
```

#### 3. Build Commands
```bash
# Check build output
npm run build

# Preview production build
npm run preview

# Analyze bundle
npm run build:analyze
```

### Debug Configuration

#### 1. Environment Variables
```bash
# Enable debug logging
VITE_DEBUG=true
VITE_LOG_LEVEL=debug

# Disable mocks for debugging
VITE_DEPLOY_ENV=test
```

#### 2. Console Logging
```tsx
// Add debug logging throughout the application
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', { data, state, props });
}
```

#### 3. React DevTools
- Install React DevTools browser extension
- Use Profiler to identify performance issues
- Examine component state and props
- Check component hierarchy

## Debugging Guidelines

### Core Principles
- **Be Systematic**: Follow the phases methodically, don't jump to solutions
- **Document Everything**: Keep detailed records of findings and attempts
- **Think Incrementally**: Make small, testable changes rather than large refactors
- **Consider Context**: Understand the broader system impact of changes
- **Communicate Clearly**: Provide regular updates on progress and findings
- **Stay Focused**: Address the specific bug without unnecessary changes
- **Test Thoroughly**: Verify fixes work in various scenarios and environments

### Admin Portal UI Specific Guidelines
- **Check Feature Flags**: Verify feature flag configuration and values
- **Validate Shell Integration**: Ensure proper Shell SDK integration
- **Test Authentication**: Verify user rights and permissions
- **Check API Endpoints**: Validate API configuration and responses
- **Review Component Props**: Ensure proper prop passing and validation
- **Examine State Management**: Check React state and context usage
- **Verify Internationalization**: Ensure proper i18n configuration

### Common Debug Patterns

#### 1. Component Debugging
```tsx
const DebugComponent = ({ ...props }) => {
  // Add debug logging
  useEffect(() => {
    console.group('Component Debug Info');
    console.log('Props:', props);
    console.log('State:', state);
    console.log('Context:', useContext(SomeContext));
    console.groupEnd();
  }, [props, state]);

  // Add error boundary
  if (error) {
    console.error('Component error:', error);
    return <ErrorFallback error={error} />;
  }

  return <div>Component content</div>;
};
```

#### 2. Hook Debugging
```tsx
const useDebugHook = (dependencies) => {
  const [state, setState] = useState(initialState);
  
  useEffect(() => {
    console.log('Hook effect triggered:', { dependencies, state });
  }, [dependencies, state]);
  
  const updateState = useCallback((newState) => {
    console.log('State update:', { oldState: state, newState });
    setState(newState);
  }, [state]);
  
  return [state, updateState];
};
```

#### 3. API Debugging
```tsx
// Add request/response interceptors for debugging
Api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    return Promise.reject(error);
  }
);
```

## Remember

**Always reproduce and understand the bug before attempting to fix it. A well-understood problem is half solved.**

- Start with the simplest possible reproduction
- Use the debugging tools available in the Admin Portal UI
- Follow the established patterns and conventions
- Test thoroughly before considering the issue resolved
- Document your findings for future reference

This systematic approach will help you efficiently identify and resolve bugs in the Admin Portal UI while maintaining code quality and preventing regressions.
description:
globs:
alwaysApply: false
---
