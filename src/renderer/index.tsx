import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Docker from 'dockerode';

const docker = new Docker({
  socketPath: '//./pipe/docker_engine'
});

renderLoading();
docker.listContainers()
  .then(renderContainers)
  .catch(renderError);

function renderLoading() {
  ReactDOM.render(
    <h1>Loading...</h1>,
    document.getElementById('root')
  );
}

function renderContainers(data: any) {
  console.log(data);
  ReactDOM.render(
    <pre>{JSON.stringify(data)}</pre>,
    document.getElementById('root')
  );
}

function renderError(error: any) {
  console.error(error)
  ReactDOM.render(
    <h1 style={{color: 'red'}}>{error.message}</h1>,
    document.getElementById('root')
  );
}
