module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',  // raiz do backend
  modulePaths: ['<rootDir>/src'], // ajusta para seu src, se estiver usando src
  moduleFileExtensions: ['ts', 'js', 'json'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',  // aqui aponta pro tsconfig dentro do backend
    },
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // ajuste para os paths do seu projeto
  },
  testMatch: ['**/*.spec.ts'],
};
