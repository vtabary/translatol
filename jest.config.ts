import { getJestProjects } from '@nrwl/jest';

export default {
  projects: getJestProjects(),
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
