# TypeScript Requirements Demo

This demo showcases all the required TypeScript features:

## ✅ Requirements Implemented

### Basic Requirements

- **Display output to terminal**: Extensive use of `console.log()` throughout the demo
- **Recursion**: Factorial calculation using recursive function
- **Classes**: `UserManager` class with methods and private properties
- **Lists**: Array operations with user collections, filtering, and batch processing
- **Asynchronous functions**: `async/await` with Promise handling and error management

### Additional Requirements

- **Exception throwing and handling**: Custom `ValidationError` and `NetworkError` classes
- **TSLint**: Configuration file and linting scripts
- **Jest**: Comprehensive test suite with 15+ test cases

## 🚀 Running the Demo

### Run the interactive demonstration:

```bash
npm run demo
```

### Run the test suite:

```bash
npm run test:demo
```

### Run TSLint:

```bash
npm run lint
```

## 📋 Features Demonstrated

### 1. Terminal Output

- Colorful console logging with emojis
- Formatted user listings
- Error messages and success notifications

### 2. Recursion

- Factorial calculation using recursive algorithm
- Demonstrates base case and recursive case

### 3. Classes

- `UserManager` class with:
  - Private properties (`users`, `nextId`)
  - Public methods (`addUser`, `getActiveUsers`, etc.)
  - Constructor and method chaining

### 4. Lists/Arrays

- User collection management
- Array filtering with `filter()`
- Array mapping with `map()`
- Batch processing operations

### 5. Asynchronous Functions

- `async/await` syntax
- Promise handling with `Promise.all()`
- Error handling in async context
- Simulated network delays

### 6. Exception Handling

- Custom error classes extending `Error`
- Try-catch blocks
- Error propagation and handling
- Validation error scenarios

## 🧪 Test Coverage

The Jest test suite covers:

- Class instantiation and methods
- Exception throwing scenarios
- Asynchronous function behavior
- List operations and filtering
- Recursive function correctness
- Error handling edge cases

Run `npm run test:demo` to see all tests pass!
