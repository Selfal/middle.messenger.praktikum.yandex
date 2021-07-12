import { SignIn } from './pages/SignIn/index.ts';
import { SignUp } from './pages/SignUp/index.ts';
import { Home } from './pages/Home/index.ts';
import { ProfileSetting } from './pages/ProfileSetting/index.ts';
import { Router } from './utils/Router';

export const router = new Router('.app');
router
  .use('/', SignIn)
  .use('/sign-up', SignUp)
  .use('/home', Home)
  .use('/settings', ProfileSetting)
  .start();
