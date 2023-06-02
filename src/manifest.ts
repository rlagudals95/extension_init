import packageJson from "../package.json";
import { ManifestType } from "./manifest-type";

const manifest: ManifestType = {
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson?.description ?? "",
  options_page: "src/pages/options/index.html",
  background: { service_worker: "src/pages/background/index.js" },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "ohoo_favicon_48.png",
  },

  icons: {
    "128": "ohoo_favicon_128.png",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.js"],
      css: ["contentStyle.css"],
    },
  ],
  browser_action: {
    default_title: "Test",
    default_popup: "popup.html",
  },
  host_permissions: [
    "https://studio.ohoolabs.com/",
    "https://*/*",
    "http://*/*",
  ],
  permissions: ["scripting", "storage", "activeTab", "downloads", "cookies"],
  devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: [
        "../dist/src/pages/content/index.js",
        "../dist/src/pages/content/index.js",
        "../dist/src/pages/popup/index.html",
        "contentStyle.css",
        "ohoo_favicon_128.png",
        "ohoo_favicon_48.png",
      ],
      matches: [],
    },
  ],
};

export default manifest;
