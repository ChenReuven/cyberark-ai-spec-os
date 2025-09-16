import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Installation',
      items: [
        'installation/overview',
        'installation/quick-start',
        'installation/manual',
        'installation/team-setup',
        'installation/troubleshooting'
      ],
    },
    {
      type: 'category',
      label: 'Workflow',
      items: [
        'workflow/first-project'
      ],
    },
    {
      type: 'category',
      label: 'Best Practices',
      items: [
        'best-practices/overview'
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      items: [
        'troubleshooting/common-issues'
      ],
    },
  ],
};

export default sidebars;
