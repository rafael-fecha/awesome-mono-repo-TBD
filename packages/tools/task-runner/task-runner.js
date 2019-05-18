#!/usr/bin/env node

const [, , cmdName, ...packageNames] = process.argv;
const { execSync, exec } = require("child_process");
const { intersection } = require("ramda");

const packages = execSync("lerna list", { encoding: "utf-8" })
  .trim()
  .split("\n");
const checkCmd = cmd => {
  switch (cmd) {
    case "bootstrap":
      return "lerna bootstrap";
    case "build":
      return `lerna run build`;
    default:
      console.error(`The ${cmd} that you provided is not yet supported...`);
  }
};
const runCmd = cmd => package => exec(`${checkCmd(cmd)} --scope ${package}`);
const partCmd = runCmd(cmdName);

const execCmdOnPackages = intersection(packages, packageNames).forEach(partCmd);
