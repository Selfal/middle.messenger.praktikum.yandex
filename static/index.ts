import { SignIn } from './pages/SignIn/SignIn.ts';
import { SignUp } from './pages/SignUp/SignUp.ts';
import { Home } from './pages/Home/Home.ts';
import { ProfileSetting } from './pages/ProfileSetting/ProfileSetting.ts';
import { Router } from './utils/Router';

export const router = new Router('.app');
router
  .use('/', SignIn)
  .use('/sign-up', SignUp)
  .use('/home', Home)
  .use('/settings', ProfileSetting)
  .start();
