// dangerfile.ts

import { danger, fail, warn, message } from "danger";

// 🚨 Fail if no description is provided in the PR
if (!danger.github.pr.body || danger.github.pr.body.length < 10) {
  fail("Please provide a meaningful description for this PR.");
}

// ⚠️ Warn if the PR is too large
const bigPRThreshold = 800;
if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
  warn("This PR is big, consider breaking it into smaller ones.");
}

// ✅ Message to remind about checklist
message("✅ Don't forget to complete the PR checklist!");

// ⚠️ Warn if critical files are modified
const criticalFiles = [
  "package.json",
  ".nvmrc",
  ".eslintrc.json",
  "tsconfig.json",
  ".github/",
  ".husky/",
  "README.md",
  ".prettierignore",
  ".prettierrc",
  ".lintstagedrc",
];

const modifiedFiles = danger.git.modified_files.join(" ");
criticalFiles.forEach((file) => {
  if (modifiedFiles.includes(file)) {
    warn(
      `⚠️ You are modifying a critical file: \`${file}\`. Please make sure changes are reviewed thoroughly.`
    );
  }
});
