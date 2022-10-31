/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withAntdLess = require('next-plugin-antd-less');

const { theme } = require('./tailwind.config');

//! We need to assess how these are conflicting across different use cases.
//! When we switch branches, it may look good on one feature but completely wrong on another
//? We need to consider local overrides for many cases

const pluginAntdLess = withAntdLess({
  modifyVars: {
    'primary-color': theme.colors.primary['800'],
    'menu-highlight-color': theme.colors.primary['100'],
    'menu-inline-submenu-bg': theme.colors.primary['600'],
    'icon-color-hover': theme.colors.grayscale['white'],
    'heading-color': theme.colors.secondary['ink'],
    'text-color': theme.colors.secondary['ink'],
    'text-color-secondary': theme.colors.grayscale['black'],
  },
});

module.exports = withPlugins([[pluginAntdLess]], {
  reactStrictMode: true,
  swcMinify: true,
});
