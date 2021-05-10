// appdynamics gets installed as part of the docker image build
// eslint-disable-next-line import/no-unresolved
require('appdynamics').profile({
    nodeName: 'GRMUS_Container',
    reuseNode: true,
    reuseNodePrefix: 'GRMUS_Container',
  });