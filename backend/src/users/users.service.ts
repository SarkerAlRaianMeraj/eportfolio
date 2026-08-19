import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(email: string, password: string): Promise<User> {
    const password_hash = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ email, password_hash });
    return this.usersRepository.save(user);
  }

  async seedAdmin(): Promise<void> {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const existing = await this.findByEmail(adminEmail);
    if (!existing) {
      await this.create(adminEmail, adminPassword);
      console.log(`Admin user created: ${adminEmail}`);
    }
  }
}
