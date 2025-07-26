#!/usr/bin/env node

import { demonstrateFeatures } from "./requirements-demo";

console.log("🎯 TypeScript Requirements Demonstration");
console.log("========================================");
console.log("This demo showcases:");
console.log("✅ Display output to terminal");
console.log("✅ Recursion (factorial calculation)");
console.log("✅ Classes (UserManager)");
console.log("✅ Lists/Arrays (user collections)");
console.log("✅ Asynchronous functions (async/await)");
console.log("✅ Exception throwing and handling");
console.log("✅ TSLint integration");
console.log("✅ Jest testing framework");
console.log("");

// Run the demonstration
demonstrateFeatures()
  .then(() => {
    console.log("🎉 All requirements demonstrated successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Error running demonstration:", error);
    process.exit(1);
  });
