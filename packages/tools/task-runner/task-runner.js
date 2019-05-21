#!/usr/bin/env node
const [, , cmdName, ...packageNames] = process.argv;
const { execSync, exec } = require("child_process");
const { pipe, isEmpty, trim, split } = require("ramda");

exec("lerna list", (a, result) => {
  const totalPackages = pipe(
    trim,
    split("\n")
  )(result);

  const matchedPackages = totalPackages.filter(
    package =>
      !isEmpty(
        packageNames.filter(packageName => package.endsWith(packageName))
      )
  );

  partCmd(matchedPackages);
});

const checkCmd = cmd => {
  switch (cmd) {
    case "bootstrap":
      return {
        message: "lerna bootstrap",
        valid: true
      };
    case "build":
      return {
        message: `lerna run build`,
        valid: true
      };
    default:
      return {
        message: `The ${cmd} that you provided is not yet supported...`,
        valid: false
      };
  }
};
const runCmd = cmd => packages => {
  if (checkCmd(cmd).valid) {
    execSync(
      `${checkCmd(cmd).message} ${packages.reduce(
        (a, b) => `${a} --scope ${b} `,
        ""
      )} --concurrency=4`
    );
  } else {
    console.error(checkCmd(cmd).message);
  }
};

const partCmd = runCmd(cmdName);
