/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user-create.dto';
import { createTransport } from 'nodemailer';
 
@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser({username, password}: CreateUserDto): Promise<void> {
    const user = this.create({
        username,
        password
    });
    await this.save(user);
    const mailTransporter = createTransport({
        host: 'smtp.ethereal.email',
        secure: false,
        auth: {
            user: 'samir.ankunding49@ethereal.email',
            pass: '4Rqx7YSFTnMBnf8Qty'
        }
    })
    mailTransporter.sendMail({
        from: 'samir.ankunding49@ethereal.email',
        to: 'samir.ankunding49@ethereal.email',
        subject: 'Message of Vefification',
        text: `You were successfully registered!
        Username: ${user.username} 
        Password: ${user.password}`,
    }, (err)=> {
        if(err) {
            console.log(err);
        }
        else{
            console.log('Email sent to user');
        }
    });
  }

}
