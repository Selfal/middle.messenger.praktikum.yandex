import { SignIn } from './pages/SignIn/index';
import { SignUp } from './pages/SignUp/index';
import { home } from './pages/home/index';
import { Router } from './utils/Router';

export const router = new Router('.app');
router
  .use('/', SignIn)
  .use('/sign-up', SignUp)
  // .use('/home', home)
  .start();
