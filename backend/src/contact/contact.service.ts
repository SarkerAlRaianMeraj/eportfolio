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

  async create(
    createContactDto: CreateContactDto,
  ): Promise<ContactMessage & { email_sent: boolean }> {
    const message: ContactMessage = {
      id: String(this.nextId++),
      name: createContactDto.name,
      email: createContactDto.email,
      message: createContactDto.message,
      created_at: new Date().toISOString(),
    };
    this.messages.push(message);

    const email_sent = await this.sendEmailNotification(createContactDto);

    return { ...message, email_sent };
  }

  private async sendEmailNotification(dto: CreateContactDto): Promise<boolean> {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    const contactEmail = this.configService.get<string>('CONTACT_EMAIL');

    if (!apiKey || !contactEmail) {
      this.logger.warn('Email not configured - message saved to database only');
      return false;
    }

    try {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);

      const safeName = escapeHtml(dto.name);
      const safeEmail = escapeHtml(dto.email);
      const safeMessage = escapeHtml(dto.message);

      const { data, error } = await resend.emails.send({
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

      if (error) {
        this.logger.error(
          `Failed to send email notification: ${JSON.stringify(error)}`,
        );
        return false;
      }

      this.logger.log(`Email notification sent successfully (id: ${data?.id})`);
      return true;
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to send email notification: ${detail}`);
      return false;
    }
  }

  findAll(): ContactMessage[] {
    return [...this.messages].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }
}
