module.exports = {
    verbose: true,
    moduleFileExtensions: ['js', 'json', 'vue'],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': 'vue-jest'
    },
    moduleNameMapper: {
        '^.+\\.(css|less|sass|scss)$': 'identity-obj-proxy'
    },
    testPathIgnorePatterns: [
        'scripts',
        'node_modules'
    ],
    testURL: 'http://localhost/'
};
