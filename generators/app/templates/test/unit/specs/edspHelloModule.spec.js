import { createTest, destroyVM } from '../util';
import EdspHelloModule from 'packages/edspHelloModule';

describe('EdspHelloModule', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(EdspHelloModule, true);
    expect(vm.$el).to.exist;
  });
});

