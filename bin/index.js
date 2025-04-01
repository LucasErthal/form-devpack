#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import inquirer from "inquirer";

console.log("🚀 Setting up your project...");

// Ask user for package manager and project type
inquirer
  .prompt([
    {
      type: "list",
      name: "packageManager",
      message: "Which package manager do you want to use?",
      choices: ["npm", "yarn"],
    },
    {
      type: "list",
      name: "projectType",
      message: "Is this a React or React Native project?",
      choices: ["React", "React Native"],
    },
  ])
  .then((answers) => {
    const packageManager = answers.packageManager;
    const projectType = answers.projectType;
    const installCommand = packageManager === "yarn" ? "yarn add" : "npm install";

    // Dependencies   
    const dependencies = ["react-hook-form", "zod", "@hookform/resolvers"];

    try {
      // Step 1: Install Dependencies
      console.log(`📦 Installing dependencies with ${packageManager}...`);
      execSync(`${installCommand} ${dependencies.join(" ")}`, { stdio: "inherit" });

      // Step 2: Define Paths
      const templateDir = path.join(new URL(".", import.meta.url).pathname, "../templates");
      const targetDir = process.cwd();

      if (!fs.existsSync(templateDir)) {
        console.error("❌ Error: Template folder not found!");
        process.exit(1);
      }

      // Step 3: Copy Common Files (Everything Except `react/` & `react-native/`)
      function copyCommonFiles(src, dest, exclude = [], excludeFiles = []) {
        fs.readdirSync(src).forEach((file) => {
          const srcPath = path.join(src, file);
          const destPath = path.join(dest, file);

          if (exclude.includes(file)) return; // Skip excluded directories
          if (excludeFiles.includes(file)) return; // Skip excluded files

          if (fs.statSync(srcPath).isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            copyCommonFiles(srcPath, destPath, [], excludeFiles); // Recursively copy directories
          } else {
            fs.copyFileSync(srcPath, destPath);
            console.log(`✅ File copied to "${dest}"`);
          }
        });
      }

      copyCommonFiles(templateDir, targetDir, ["react", "react-native"]);

      // Step 4: Copy the Selected Template Files
      const selectedTemplateDir = path.join(templateDir, projectType.toLowerCase().replace(" ", "-"));

      function copyRecursive(src, dest, excludeFiles = []) {
        if (!fs.existsSync(src)) {
          console.error(`❌ Error: Template folder for ${projectType} not found!`);
          process.exit(1);
        }

        if (fs.statSync(src).isDirectory()) {
          fs.mkdirSync(dest, { recursive: true });
          fs.readdirSync(src).forEach((file) => {
            if (excludeFiles.includes(file)) return; // Skip excluded files
            copyRecursive(path.join(src, file), path.join(dest, file), excludeFiles);
          });
        } else {
          if (excludeFiles.includes(path.basename(src))) return; // Skip excluded files
          fs.copyFileSync(src, dest);
          console.log(`✅ File copied to "${dest}"`);
        }
      }

      copyRecursive(selectedTemplateDir, targetDir);

      console.log(`🎉 ${projectType} setup complete!`);
    } catch (error) {
      console.error("❌ Error:", error.message);
      process.exit(1);
    }
  });