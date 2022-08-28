import HelloComponent from './components/hello';

const component = new HelloComponent();
const root = document.getElementById('root');

if (root) {
  root.append(component.element);
} else {
  throw new Error('Root element not found');
}
