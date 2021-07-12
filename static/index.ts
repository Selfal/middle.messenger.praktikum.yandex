// import { SignIn } from './pages/SignIn';
// import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';
// import { ProfileSetting } from './pages/ProfileSetting';
import { Router } from './utils/Router';

export const router = new Router('.app');
router
  .use('/', SignIn)
  .use('/sign-up', SignUp)
  .use('/home', Home)
  .use('/settings', ProfileSetting)
  .start();
