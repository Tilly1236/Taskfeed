// jest.config.cjs
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    // Transform any .js or .jsx file with babel-jest
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  moduleFileExtensions: ['js','jsx','json'],
  testMatch: ['**/?(*.)+(test).[jt]s?(x)']
};
