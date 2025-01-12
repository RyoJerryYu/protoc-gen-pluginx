#!/usr/bin/env node

// The integration tests run against a test server which needs to be run in
// various configurations. This node script is a helper which sets up the server
// and then runs the correct test files using web-test-runner.

let testCases = [
  {
    testDir: "defaultConfig",
    useProtoNames: false,
    emitUnpopulated: false,
  },
  {
    testDir: "emitUnpopulated",
    useProtoNames: false,
    emitUnpopulated: true,
  },
  {
    testDir: "useProtoNames",
    useProtoNames: true,
    emitUnpopulated: false,
  },
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
  console.log("Running test case:", testCase.testDir);
  return new Promise(async (resolve, reject) => {
    // Set up the backend server.
    let server = spawn(
      "go",
      [
        "run",
        "./server",
        "--use_proto_names=" + testCase.useProtoNames,
        "--emit_unpopulated=" + testCase.emitUnpopulated,
      ],
      { stdio: "inherit" }
    );

    await waitForServer();
    let testErr;
    try {
      // Run the tests synchronously.
      const spawnReturn = spawnSync(
        "npx",
        ["web-test-runner",`./${testCase.testDir}/*_test.ts`, "--node-resolve"],
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
