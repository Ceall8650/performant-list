const path = require('path');

module.exports = {
  webpack: {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      services: path.resolve(__dirname, 'src/services/'),
      hooks: path.resolve(__dirname, 'src/hooks/'),
      views: path.resolve(__dirname, 'src/views/'),
      utils: path.resolve(__dirname, 'src/utils/'),
    },
  },
};
