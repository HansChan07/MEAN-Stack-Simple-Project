import { MeanTestProjectPage } from './app.po';

describe('mean-test-project App', function() {
  let page: MeanTestProjectPage;

  beforeEach(() => {
    page = new MeanTestProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
