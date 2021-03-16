import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Message de bienvenue', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Bienvenue dans la plateforme de rendu!');
  });
});
