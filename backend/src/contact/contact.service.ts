import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ContactMessage } from './contact.entity';
import { CreateContactDto } from './create-contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    @InjectRepository(ContactMessage)
    private contactRepository: Repository<ContactMessage>,
    private configService: ConfigService,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<ContactMessage> {
    const message = this.contactRepository.create(createContactDto);
    const saved = await this.contactRepository.save(message);

    await this.sendEmailNotification(createContactDto);

    return saved;
  }

  private async sendEmailNotification(dto: CreateContactDto): Promise<void> {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    const contactEmail = this.configService.get<string>('CONTACT_EMAIL');

    if (!apiKey || !contactEmail) {
      this.logger.warn('Email not configured - message saved to database only');
      return;
    }

    try {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);

      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: contactEmail,
        subject: `New Contact from ${dto.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${dto.name}</p>
          <p><strong>Email:</strong> ${dto.email}</p>
          <p><strong>Message:</strong></p>
          <p>${dto.message}</p>
        `,
      });

      this.logger.log('Email notification sent successfully');
    } catch (error) {
      this.logger.error('Failed to send email notification', error);
    }
  }

  async findAll(): Promise<ContactMessage[]> {
    return this.contactRepository.find({ order: { created_at: 'DESC' } });
  }
}
