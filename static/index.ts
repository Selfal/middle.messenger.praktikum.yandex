import { SignIn } from './pages/SignIn/index';
import { Router } from './utils/Router';
console.log('test');
const router = new Router('.app');
router.use('/', SignIn).start();
