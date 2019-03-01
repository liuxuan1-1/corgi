
export default () => {
  return async function userCheck(ctx, next) {
    if (!ctx.session.corgi_userId) {
      ctx.status = 401;
      ctx.body = {
        success: true,
        message: '需要登录',
        data: {},
      };
    } else {
      await next();
    }
  };
};
