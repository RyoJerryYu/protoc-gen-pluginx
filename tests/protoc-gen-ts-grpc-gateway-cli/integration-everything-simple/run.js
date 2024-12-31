#!/usr/bin/env node

// The integration tests run against a test server which needs to be run in
// various configurations. This node script is a helper which sets up the server
// and then runs the correct test files using web-test-runner.

let testCases = [
  {
    name: "defaultConfig",
    testDir: "defaultConfig",
    serverFlags: [],
  },
  {
    name: "allowPartial",
    testDir: "defaultConfig",
    serverFlags: ["--marshal_allow_partial=true"],
  },
  // {
  //   testDir: "defaultConfig",
  //   useProtoNames: true,
  //   emitUnpopulated: false,
  // },
  {
    name: "useEnumNumbers",
    testDir: "defaultConfig",
    serverFlags: ["--marshal_use_enum_numbers=true"],
  },
  {
    name: "emitUnpopulated",
    testDir: "defaultConfig",
    serverFlags: ["--marshal_emit_unpopulated=true"],
  },
  {
    name: "emitDefaultValues",
    testDir: "defaultConfig",
    serverFlags: ["--marshal_emit_default_values=true"],
  },
  {
    name: "unmarshalAllowPartial",
    testDir: "defaultConfig",
    serverFlags: ["--unmarshal_allow_partial=true"],
  },
  {
    name: "unmarshalDiscardUnknown",
    testDir: "defaultConfig",
    serverFlags: ["--unmarshal_discard_unknown=true"],
  }
];

import kill from "tree-kill";
import { createConnection } from "net";
import { spawn, spawnSync } from "child_process";

const interval = 100;

function waitForServer(port = 8081, host = "localhost") {
  return new Promise((resolve) => {
    const checkServer = () => {
      const client = createConnection({ port, host }, () => {
        client.end();
        resolve();
      });

      client.on("error", () => {
        setTimeout(checkServer, interval);
      });
    };

    checkServer();
  });
}

function runTest(testCase) {
  console.log("Running test case:", testCase.name);
  return new Promise(async (resolve, reject) => {
    // Set up the backend server.
    let server = spawn(
      "go",
      [
        "run",
        "./server",
        ...testCase.serverFlags,
      ],
      { stdio: "inherit" }
    );

    await waitForServer();
    let testErr;
    try {
      // Run the tests synchronously.
      const spawnReturn = spawnSync(
        "npx",
        ["web-test-runner",`./${testCase.testDir}/*_test.ts`, "--node-resolve", "--puppeteer"],
        { stdio: "inherit" }
      );
      if ( spawnReturn.status !== 0 ) {
        throw new Error(`Test failed with status ${spawnReturn.status}`);
      }
    } catch (err) {
      testErr = err;
    } finally {
      // Shut down the server.
      kill(server.pid, "SIGKILL", (killErr) => {
        if (killErr) console.error("Kill error: ", killErr);
        if (testErr) reject(testErr);
        else resolve(true);
      });
    }
  });
}

while (testCases.length > 0) {
  let testCase = testCases.pop();
  await runTest(testCase);
}
