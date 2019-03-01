import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.post('/api/accounts/login', controller.account.login);
  router.post('/api/accounts/sign', controller.account.sign);
  router.get('/api/accounts/exit', controller.account.exit);
  router.get('/api/accounts/getuserinfo', controller.account.getUserInfo);

  router.post('/api/img/uploadAvatar', controller.img.uploadAvatar);

};
