import Docker from 'dockerode';

const useSocket = !process.env.DOCKER_HOST;

const docker = useSocket
  ? new Docker({ socketPath: '/var/run/docker.sock' })
  : new Docker({
      host: process.env.DOCKER_HOST || 'http://localhost',
      port: parseInt(process.env.DOCKER_PORT || '2375'),
    });

export default docker;