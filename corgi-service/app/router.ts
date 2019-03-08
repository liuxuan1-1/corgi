import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.post('/api/accounts/login', controller.account.login);
  router.post('/api/accounts/sign', controller.account.sign);
  router.post('/api/accounts/update', controller.account.update);
  router.get('/api/accounts/exit', controller.account.exit);
  router.get('/api/accounts/getuserinfo', controller.account.getUserInfo);

  router.post('/api/img/uploadAvatar', controller.img.uploadAvatar);

  router.get('/api/template/getlist', controller.template.getList);
  router.get('/api/template/getfile', controller.template.getFile);
  router.get('/api/template/getmine', controller.template.getMine);
  router.get('/api/template/create', controller.template.create);
  router.get('/api/template/delete', controller.template.delete);
  router.post('/api/template/release', controller.template.release);
  router.post('/api/template/save', controller.template.save);

  router.get('/api/design/getlist', controller.design.getList);
  router.get('/api/design/getfile', controller.design.getFile);
  router.get('/api/design/delete', controller.design.delete);
  router.get('/api/design/create', controller.design.create);
  router.post('/api/design/save', controller.design.save);

};
