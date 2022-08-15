import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService){}

  async use(req: any, res: any, next: () => void) {
    
    let idToken = req.headers['Authorization'];
    if(idToken == undefined){
      res.status(401).send('Unauthorized');
      return;
    }
    let verifiedToken = await this.authService.verifyToken(idToken);
    if(verifiedToken == null) {
      res.status(401).send('Premission denied');
      return;
    }
    req.user=verifiedToken;
    next();
  }
}
