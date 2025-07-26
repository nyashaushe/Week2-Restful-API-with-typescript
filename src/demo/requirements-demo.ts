/**
 * Comprehensive demo showcasing all required TypeScript features:
 * - Display output to terminal
 * - Recursion
 * - Classes
 * - Lists (Arrays)
 * - Asynchronous functions
 * - Exception throwing and handling
 */

// Custom exception classes
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

// Interface for demonstration
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// Class demonstrating OOP concepts
class UserManager {
  private users: User[] = [];
  private nextId: number = 1;

  // Method to add user with validation
  addUser(name: string, email: string): User {
    if (!name || name.trim().length === 0) {
      throw new ValidationError("Name cannot be empty");
    }

    if (!email || !email.includes("@")) {
      throw new ValidationError("Invalid email format");
    }

    const user: User = {
      id: this.nextId++,
      name: name.trim(),
      email: email.toLowerCase(),
      isActive: true,
    };

    this.users.push(user);
    console.log(`✅ User added: ${user.name} (ID: ${user.id})`);
    return user;
  }

  // Method demonstrating list operations
  getActiveUsers(): User[] {
    return this.users.filter((user) => user.isActive);
  }

  // Method demonstrating recursion - factorial calculation
  calculateUserScore(userId: number): number {
    const user = this.users.find((u) => u.id === userId);
    if (!user) {
      throw new ValidationError(`User with ID ${userId} not found`);
    }

    // Using recursion to calculate factorial based on user ID
    return this.factorial(user.id);
  }

  // Recursive function
  private factorial(n: number): number {
    console.log(`🔄 Calculating factorial of ${n}`);

    if (n <= 1) {
      return 1;
    }
    return n * this.factorial(n - 1);
  }

  // Asynchronous function simulating API call
  async fetchUserData(userId: number): Promise<User | null> {
    console.log(`🌐 Fetching data for user ID: ${userId}`);

    try {
      // Simulate network delay
      await this.delay(1000);

      // Simulate potential network error
      if (Math.random() < 0.3) {
        throw new NetworkError("Failed to fetch user data from server");
      }

      const user = this.users.find((u) => u.id === userId);
      if (user) {
        console.log(`📦 Data fetched successfully for: ${user.name}`);
        return user;
      } else {
        console.log(`❌ User with ID ${userId} not found`);
        return null;
      }
    } catch (error) {
      if (error instanceof NetworkError) {
        console.error(`🚫 Network error: ${error.message}`);
        throw error;
      }
      throw error;
    }
  }

  // Helper async function
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Method to display all users (terminal output)
  displayUsers(): void {
    console.log("\n📋 Current Users:");
    console.log("================");

    if (this.users.length === 0) {
      console.log("No users found.");
      return;
    }

    this.users.forEach((user) => {
      const status = user.isActive ? "🟢 Active" : "🔴 Inactive";
      console.log(
        `ID: ${user.id} | Name: ${user.name} | Email: ${user.email} | Status: ${status}`
      );
    });
    console.log("================\n");
  }

  // Method demonstrating list operations with arrays
  processUserBatch(userNames: string[]): User[] {
    console.log(`📝 Processing batch of ${userNames.length} users...`);

    const createdUsers: User[] = [];
    const errors: string[] = [];

    userNames.forEach((name, index) => {
      try {
        const email = `${name.toLowerCase().replace(" ", ".")}@example.com`;
        const user = this.addUser(name, email);
        createdUsers.push(user);
      } catch (error) {
        if (error instanceof ValidationError) {
          errors.push(`User ${index + 1}: ${error.message}`);
        }
      }
    });

    if (errors.length > 0) {
      console.log("⚠️  Errors encountered:");
      errors.forEach((error) => console.log(`  - ${error}`));
    }

    return createdUsers;
  }
}

// Main demonstration function
async function demonstrateFeatures(): Promise<void> {
  console.log("🚀 Starting TypeScript Features Demonstration");
  console.log("==============================================\n");

  const userManager = new UserManager();

  try {
    // 1. Display output to terminal & Classes & Lists
    console.log("1️⃣  Demonstrating Classes and Terminal Output:");
    userManager.addUser("John Doe", "john@example.com");
    userManager.addUser("Jane Smith", "jane@example.com");
    userManager.displayUsers();

    // 2. Exception handling
    console.log("2️⃣  Demonstrating Exception Handling:");
    try {
      userManager.addUser("", "invalid@email");
    } catch (error) {
      if (error instanceof ValidationError) {
        console.log(`🚫 Caught validation error: ${error.message}`);
      }
    }

    // 3. Lists/Arrays processing
    console.log("3️⃣  Demonstrating List Processing:");
    const batchUsers = ["Alice Johnson", "Bob Wilson", "", "Charlie Brown"];
    const createdUsers = userManager.processUserBatch(batchUsers);
    console.log(
      `✅ Successfully created ${createdUsers.length} users from batch`
    );

    // 4. Recursion
    console.log("4️⃣  Demonstrating Recursion:");
    const score = userManager.calculateUserScore(1);
    console.log(`🎯 User score (factorial): ${score}\n`);

    // 5. Asynchronous functions
    console.log("5️⃣  Demonstrating Asynchronous Functions:");

    // Multiple async calls
    const promises = [1, 2, 3].map((id) =>
      userManager.fetchUserData(id).catch((error) => {
        console.log(`Failed to fetch user ${id}: ${error.message}`);
        return null;
      })
    );

    const results = await Promise.all(promises);
    const successfulFetches = results.filter((result) => result !== null);
    console.log(
      `📊 Successfully fetched ${successfulFetches.length} out of 3 users`
    );

    // Final display
    userManager.displayUsers();
  } catch (error) {
    console.error("💥 Unexpected error:", error);
  }

  console.log("✨ Demonstration completed!");
}

// Export for testing
export { UserManager, ValidationError, NetworkError, demonstrateFeatures };

// Run demonstration if this file is executed directly
if (require.main === module) {
  demonstrateFeatures().catch(console.error);
}
