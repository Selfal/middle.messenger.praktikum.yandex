import { SignIn } from './pages/SignIn/index';
import { SignUp } from './pages/SignUp/index';
import { Home } from './pages/Home/index';
import { ProfileSetting } from './pages/ProfileSetting/index';
import { Router } from './utils/Router';

export const router = new Router('.app');
router
  .use('/', SignIn)
  .use('/sign-up', SignUp)
  .use('/home', Home)
  .use('/settings', ProfileSetting)
  .start();
