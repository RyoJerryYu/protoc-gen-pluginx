#!/usr/bin/env node

// The integration tests run against a test server which needs to be run in
// various configurations. This node script is a helper which sets up the server
// and then runs the correct test files using web-test-runner.

const defaultConfigCases = [
  {
    name: "defaultConfig",
    serverFlags: [],
  },
  {
    name: "allowPartial",
    serverFlags: ["--marshal_allow_partial=true"],
  },
  {
    name: "useEnumNumbers",
    serverFlags: ["--marshal_use_enum_numbers=true"],
  },
  {
    name: "emitUnpopulated",
    serverFlags: ["--marshal_emit_unpopulated=true"],
  },
  {
    name: "emitDefaultValues",
    serverFlags: ["--marshal_emit_default_values=true"],
  },
  {
    name: "unmarshalAllowPartial",
    serverFlags: ["--unmarshal_allow_partial=true"],
  },
  {
    name: "unmarshalDiscardUnknown",
    serverFlags: ["--unmarshal_discard_unknown=true"],
  }
];

const useProtoNameCases = [
  {
    name: "useProtoNames", // This test case has a different test file.
    serverFlags: ["--marshal_use_proto_names=true"],
  },
];

const testCases = [
  {
    name: "defaultConfig",
    testDir: "caseDefaultConfig",
    serverDir: "./server",
    cases: defaultConfigCases,
  },
  {
    name: "useProtoNames",
    testDir: "caseUseProtoNames", 
    serverDir: "./server",
    cases: useProtoNameCases,
  },
  {
    name: "defaultConfig_servergojson",
    testDir: "caseDefaultConfig",
    serverDir: "./servergojson",
    cases: defaultConfigCases,
  },
  {
    name: "stringEnum_servergojson",
    testDir: "caseStringEnums",
    serverDir: "./servergojson",
    cases: defaultConfigCases,
  },
  {
    name: "protobufES_defaultConfig",
    testDir: "caseProtobufES",
    serverDir: "./server",
    cases: defaultConfigCases,
  },
  {
    name: "protobufES_useProtoNames",
    testDir: "caseProtobufES",
    serverDir: "./server",
    cases: useProtoNameCases,
  },
  {
    name: "protobufES_servergojson",
    testDir: "caseProtobufES",
    serverDir: "./servergojson",
    cases: defaultConfigCases,
  },
]

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
        testCase.serverDir,
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

for (let i = 0; i < testCases.length; i++) {
  let testCase = testCases[i];
  for (let j = 0; j < testCase.cases.length; j++) {
    let test = testCase.cases[j];
    await runTest({
      name: `${testCase.name} ${test.name}`,
      testDir: testCase.testDir,
      serverDir: testCase.serverDir,
      serverFlags: test.serverFlags,
    })
  }
}
