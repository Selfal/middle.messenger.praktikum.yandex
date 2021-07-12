import { SignIn } from '/static/pages/SignIn/index';
import { SignUp } from '/static/pages/SignUp/index';
import { Home } from '/static/pages/Home/index';
import { ProfileSetting } from '/static/pages/ProfileSetting/index';
import { Router } from '/static/utils/Router';

export const router = new Router('.app');
router
  .use('/', SignIn)
  .use('/sign-up', SignUp)
  .use('/home', Home)
  .use('/settings', ProfileSetting)
  .start();
