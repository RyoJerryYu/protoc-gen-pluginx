import { esbuildPlugin } from "@web/dev-server-esbuild";
import { puppeteerLauncher } from "@web/test-runner-puppeteer";

export default {
  files: ["**/*.test.ts"],
  plugins: [esbuildPlugin({ ts: true })],
  testsFinishTimeout: 20000,
  browsers: [puppeteerLauncher({ launchOptions: { args: ['--no-sandbox'] } })],
  browserLogs: true,
};
