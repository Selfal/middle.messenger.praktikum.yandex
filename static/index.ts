import { SignIn } from './pages/SignIn/index';
import { SignUp } from './pages/SignUp/index';
import { Home } from './pages/Home/index';
import { ProfileSettings } from './pages/ProfileSettings/index';
import { Router } from './utils/Router';
import { Page404 } from '../dist/pages/404/index';
import { Page500 } from '../dist/pages/500/index';

export const router = new Router('.app');
router
  .use('/', SignIn)
  .use('/sign-up', SignUp)
  .use('/home', Home)
  .use('/settings', ProfileSettings)
  .use('/404', Page404)
  .use('/500', Page500)
  .start();
