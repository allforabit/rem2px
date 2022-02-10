const tokens = require('./data/tokens.json')

const colors = Object.keys(tokens.global)
  .filter((k) => tokens.global[k].type === 'color')
  .map((k) => [k, tokens.global[k].value])
  .reduce((acc, [k, v]) => {
    return { ...acc, [k]: v }
  }, {})

module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx,json}'],
  theme: {
    colors: colors,
  },
  plugins: [],
}
