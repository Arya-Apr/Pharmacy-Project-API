/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from './user.repository';
import { JwtPayload } from './jwt-user-payload';
import { User } from './user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UsersRepository)
        private userRepository: UsersRepository,
    ) {
        super({
            secretOrKey: 'topSecret51',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    
    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        const user: User = await this.userRepository.findOne( { where: {username} } );
    
        if(!user) {
            throw new UnauthorizedException();
        }
    
        return user;
       }
}