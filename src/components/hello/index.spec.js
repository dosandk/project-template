import Hello from './index.js';

describe('HelloComponent', () => {
  let component;

  beforeEach(() => {
    component = new Hello();

    document.body.append(component.element);
  });

  afterEach(() => {
    component.destroy();
    component = null;
  });

  it('should be rendered correctly', () => {
    expect(component.element).toBeInTheDocument();
    expect(component.element).toBeVisible();
  });

  it('should have ability to be removed', () => {
    component.remove();

    expect(
      component.element
    ).not.toBeInTheDocument();
  });
});
