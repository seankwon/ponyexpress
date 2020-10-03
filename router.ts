import { 
  serve, 
  ServerRequest 
} from 'https://deno.land/std@0.73.0/http/server.ts';

export interface IRouter {
  listen: (port: number) => Promise<void>
}

export class Router implements IRouter {
  //FIXME: dont use any...
  routes: any = {};

  get(path: string, cb: Function): void {
    this.routes[path] = {
      GET: cb
    };
  }

  run(request: ServerRequest): void {
    const { method, url } = request;
    // check the if the method and url exist in the routes obj. 
    if (!!this.routes[url] && this.routes[url][method]) {
      this.routes[url][method](request);
    }
  }

  async listen (port: number): Promise<void> {
    const server = serve({ hostname: "0.0.0.0", port: port });
    for await (const request of server) {
      this.run(request);
      // request.respond({ status: 200, body: JSON.stringify(request) });
    }
  }
}

export default Router;