import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContactMessage } from './contact.entity';
import { CreateContactDto } from './create-contact.dto';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private messages: ContactMessage[] = [];
  private nextId = 1;

  constructor(private configService: ConfigService) {}

  create(createContactDto: CreateContactDto): ContactMessage {
    const message: ContactMessage = {
      id: String(this.nextId++),
      name: createContactDto.name,
      email: createContactDto.email,
      message: createContactDto.message,
      created_at: new Date().toISOString(),
    };
    this.messages.push(message);

    void this.sendEmailNotification(createContactDto);

    return { ...message };
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

      const safeName = escapeHtml(dto.name);
      const safeEmail = escapeHtml(dto.email);
      const safeMessage = escapeHtml(dto.message);

      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: contactEmail,
        subject: `New Contact from ${safeName}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `,
      });

      this.logger.log('Email notification sent successfully');
    } catch (error) {
      this.logger.error('Failed to send email notification', error);
    }
  }

  findAll(): ContactMessage[] {
    return [...this.messages].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }
}
