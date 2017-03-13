import { FiousePage } from './app.po';

describe('fiouse App', () => {
  let page: FiousePage;

  beforeEach(() => {
    page = new FiousePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
