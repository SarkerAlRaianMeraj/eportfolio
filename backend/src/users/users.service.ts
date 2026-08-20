import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  constructor(private configService: ConfigService) {}

  findById(id: string): User | null {
    return this.users.find((u) => u.id === id) ?? null;
  }

  findByEmail(email: string): User | null {
    return this.users.find((u) => u.email === email) ?? null;
  }

  async create(email: string, password: string): Promise<User> {
    const password_hash = await bcrypt.hash(password, 10);
    const user: User = {
      id: String(this.nextId++),
      email,
      password_hash,
      created_at: new Date().toISOString(),
    };
    this.users.push(user);
    return user;
  }

  async seedAdmin(): Promise<void> {
    const adminEmail = this.configService.get<string>(
      'ADMIN_EMAIL',
      'admin@portfolio.com',
    );
    const adminPassword = this.configService.get<string>(
      'ADMIN_PASSWORD',
      'admin123',
    );

    const existing = this.findByEmail(adminEmail);
    if (!existing) {
      await this.create(adminEmail, adminPassword);
    }
  }
}
