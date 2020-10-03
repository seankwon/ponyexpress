import { 
  ServerRequest 
} from 'https://deno.land/std@0.73.0/http/server.ts';
import Router from './router.ts';

const router = new Router();

router.get('/funny', (req: ServerRequest) => {
  req.respond({ status: 200, body: 'hello world' });
});

router.listen(8008);