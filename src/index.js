import HelloComponent from './components/hello';

const component = new HelloComponent();
const root = document.getElementById('root');

if (root) {
  root.append(component.element);
} else {
  throw new Error('Root element not found');
}

if ('serviceWorker' in navigator) {
  Notification.requestPermission((result) => {
    if (result !== 'granted') {
      console.error(
        'Denied notification permission'
      );
    }
  });

  navigator.serviceWorker
    .register('./service-worker.js', {
      scope: '/',
      type: 'module'
    })
    .then((registration) => {
      console.log(registration);
    })
    .catch((error) => console.log(error));
}
