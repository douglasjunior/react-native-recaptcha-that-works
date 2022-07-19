module.exports = {
  testEnvironment: 'jsdom',
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!@react-navigation|@react-native|react-native)',
  ]
};
