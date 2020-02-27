import { index } from './index.action'

module.exports = {
  path: '/',
  '/': {
    get: {
      action: index,
      level: 'public'
    }
  }
};
