import {
  UserManager,
  ValidationError,
  NetworkError,
} from "../demo/requirements-demo";

describe("Requirements Demo Tests", () => {
  let userManager: UserManager;

  beforeEach(() => {
    userManager = new UserManager();
  });

  describe("UserManager Class", () => {
    test("should add user successfully", () => {
      const user = userManager.addUser("John Doe", "john@example.com");

      expect(user).toBeDefined();
      expect(user.name).toBe("John Doe");
      expect(user.email).toBe("john@example.com");
      expect(user.isActive).toBe(true);
      expect(user.id).toBe(1);
    });

    test("should throw ValidationError for empty name", () => {
      expect(() => {
        userManager.addUser("", "test@example.com");
      }).toThrow(ValidationError);
    });

    test("should throw ValidationError for invalid email", () => {
      expect(() => {
        userManager.addUser("John Doe", "invalid-email");
      }).toThrow(ValidationError);
    });

    test("should handle whitespace in names", () => {
      const user = userManager.addUser("  John Doe  ", "john@example.com");
      expect(user.name).toBe("John Doe");
    });

    test("should convert email to lowercase", () => {
      const user = userManager.addUser("John Doe", "JOHN@EXAMPLE.COM");
      expect(user.email).toBe("john@example.com");
    });
  });

  describe("List Operations", () => {
    test("should return active users", () => {
      userManager.addUser("John Doe", "john@example.com");
      userManager.addUser("Jane Smith", "jane@example.com");

      const activeUsers = userManager.getActiveUsers();
      expect(activeUsers).toHaveLength(2);
      expect(activeUsers.every((user) => user.isActive)).toBe(true);
    });

    test("should process user batch correctly", () => {
      const userNames = ["Alice Johnson", "Bob Wilson", "Charlie Brown"];
      const createdUsers = userManager.processUserBatch(userNames);

      expect(createdUsers).toHaveLength(3);
      expect(createdUsers[0].name).toBe("Alice Johnson");
      expect(createdUsers[1].name).toBe("Bob Wilson");
      expect(createdUsers[2].name).toBe("Charlie Brown");
    });

    test("should handle errors in batch processing", () => {
      const userNames = ["Valid User", "", "Another Valid User"];
      const createdUsers = userManager.processUserBatch(userNames);

      // Should create 2 users, skip the empty name
      expect(createdUsers).toHaveLength(2);
      expect(createdUsers[0].name).toBe("Valid User");
      expect(createdUsers[1].name).toBe("Another Valid User");
    });
  });

  describe("Recursion", () => {
    test("should calculate factorial correctly", () => {
      userManager.addUser("Test User", "test@example.com");
      const score = userManager.calculateUserScore(1);

      // Factorial of 1 is 1
      expect(score).toBe(1);
    });

    test("should calculate factorial for higher numbers", () => {
      // Add users to get higher IDs
      userManager.addUser("User 1", "user1@example.com");
      userManager.addUser("User 2", "user2@example.com");
      userManager.addUser("User 3", "user3@example.com");
      userManager.addUser("User 4", "user4@example.com");

      const score = userManager.calculateUserScore(4);

      // Factorial of 4 is 24
      expect(score).toBe(24);
    });

    test("should throw error for non-existent user", () => {
      expect(() => {
        userManager.calculateUserScore(999);
      }).toThrow(ValidationError);
    });
  });

  describe("Asynchronous Functions", () => {
    test("should fetch user data successfully", async () => {
      userManager.addUser("Test User", "test@example.com");

      // Mock Math.random to avoid network error
      const originalRandom = Math.random;
      Math.random = jest.fn(() => 0.5); // Above 0.3 threshold

      const userData = await userManager.fetchUserData(1);

      expect(userData).toBeDefined();
      expect(userData?.name).toBe("Test User");

      // Restore original Math.random
      Math.random = originalRandom;
    });

    test("should return null for non-existent user", async () => {
      // Mock Math.random to avoid network error
      const originalRandom = Math.random;
      Math.random = jest.fn(() => 0.5);

      const userData = await userManager.fetchUserData(999);

      expect(userData).toBeNull();

      Math.random = originalRandom;
    });

    test("should handle network errors", async () => {
      userManager.addUser("Test User", "test@example.com");

      // Mock Math.random to trigger network error
      const originalRandom = Math.random;
      Math.random = jest.fn(() => 0.1); // Below 0.3 threshold

      await expect(userManager.fetchUserData(1)).rejects.toThrow(NetworkError);

      Math.random = originalRandom;
    });
  });

  describe("Exception Handling", () => {
    test("should create custom ValidationError", () => {
      const error = new ValidationError("Test message");

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.name).toBe("ValidationError");
      expect(error.message).toBe("Test message");
    });

    test("should create custom NetworkError", () => {
      const error = new NetworkError("Network failed");

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(NetworkError);
      expect(error.name).toBe("NetworkError");
      expect(error.message).toBe("Network failed");
    });
  });
});
