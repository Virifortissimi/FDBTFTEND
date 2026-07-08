import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

type LegalSection = {
  id: 'privacy' | 'terms';
  overline: string;
  title: string;
  updated: string;
  summary: string;
  groups: Array<{
    heading: string;
    body?: string;
    items?: string[];
  }>;
};

@Component({
  selector: 'app-legal-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section style="padding: 8rem 1rem 5rem; background:
      radial-gradient(circle at top left, rgba(22, 198, 90, 0.1), transparent 28%),
      linear-gradient(180deg, var(--surface-base), var(--surface-subtle));">
      <div style="max-width: 72rem; margin: 0 auto;" class="space-y-8">
        <div class="card" style="padding: 2rem;">
          <p class="type-overline" style="margin-bottom: 1rem;">Legal</p>
          <h1 class="type-display" style="margin-bottom: 1rem;">Privacy Policy & Terms of Service</h1>
          <p class="type-body" style="max-width: 48rem;">
            These pages explain how FoodBot handles user information and the rules for using the FoodBot app, website,
            and related services operated by Scalefort.
          </p>
          <div class="flex flex-wrap gap-3" style="margin-top: 1.5rem;">
            <a routerLink="/privacy-policy" class="btn-outline">Privacy Policy</a>
            <a routerLink="/terms-of-service" class="btn-outline">Terms of Service</a>
            <a routerLink="/contact" class="btn-green">Contact Support</a>
          </div>
        </div>

        <article *ngFor="let section of visibleSections" class="card" style="padding: 2rem;" [id]="section.id">
          <div class="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-6 items-start">
            <aside class="card-inset" style="position: sticky; top: 6rem;">
              <p class="type-overline" style="margin-bottom: 0.75rem;">{{section.overline}}</p>
              <h2 class="type-heading" style="margin-bottom: 0.75rem;">{{section.title}}</h2>
              <p class="type-body-s" style="margin-bottom: 1rem;">Effective date: {{section.updated}}</p>
              <p class="type-body-s">{{section.summary}}</p>
            </aside>

            <div class="space-y-6">
              <section *ngFor="let group of section.groups" class="card-inset">
                <h3 class="type-title" style="margin-bottom: 0.75rem;">{{group.heading}}</h3>
                <p *ngIf="group.body" class="type-body-s" style="margin-bottom: 0.75rem;">{{group.body}}</p>
                <ul *ngIf="group.items" class="space-y-2" style="margin: 0; padding-left: 1.2rem;">
                  <li *ngFor="let item of group.items" class="type-body-s">{{item}}</li>
                </ul>
              </section>
            </div>
          </div>
        </article>
      </div>
    </section>
  `
})
export class LegalPageComponent {
  readonly sections: LegalSection[] = [
    {
      id: 'privacy',
      overline: 'Privacy Policy',
      title: 'Privacy Policy',
      updated: 'July 8, 2026',
      summary: 'We collect only what we need to operate, secure, personalize, and improve FoodBot. We do not sell personal information.',
      groups: [
        {
          heading: 'Who We Are',
          body: 'FoodBot is operated by Scalefort. This Privacy Policy applies to FoodBot websites, mobile apps, APIs, and related services.'
        },
        {
          heading: 'Information We Collect',
          items: [
            'Account information such as name, email address, password credentials, verification status, and profile details you provide.',
            'Nutrition and planning information such as food preferences, goals, allergies or restrictions you choose to enter, meal plans, recipes, shopping lists, nutrition logs, and coaching messages.',
            'Payment and subscription status. Payment card details are processed by payment providers or app stores and are not stored directly by FoodBot.',
            'Support and communication data, including messages sent through contact forms, newsletter signups, API access requests, and related correspondence.',
            'Device, usage, and technical data such as app version, browser type, IP address, crash details, diagnostics, and approximate region.'
          ]
        },
        {
          heading: 'How We Use Information',
          items: [
            'Create and secure your account, authenticate sessions, and prevent unauthorized access.',
            'Provide meal planning, recipe, grocery, nutrition tracking, learning, AI coach, and support features.',
            'Personalize recommendations based on your preferences, goals, and prior activity.',
            'Process subscriptions, manage entitlements, send service messages, and respond to support requests.',
            'Analyze performance, fix bugs, improve product quality, and protect FoodBot, users, and partners from abuse.'
          ]
        },
        {
          heading: 'AI Features and Health Information',
          body: 'FoodBot may use the information you provide to generate meal, recipe, habit, and nutrition guidance. FoodBot is not a medical device and does not provide diagnosis, emergency care, or a substitute for advice from a licensed clinician. Avoid entering sensitive medical information unless you are comfortable using it in the product.'
        },
        {
          heading: 'Sharing and Service Providers',
          items: [
            'We share information with trusted vendors that help us host, secure, analyze, message, and operate FoodBot.',
            'We may share subscription or purchase status with payment processors, app stores, and entitlement providers.',
            'We may disclose information if required by law, to protect rights and safety, or in connection with a merger, acquisition, financing, or transfer of business assets.',
            'We do not sell your personal information.'
          ]
        },
        {
          heading: 'Data Retention',
          body: 'We keep personal information for as long as needed to provide FoodBot, meet legal and accounting obligations, resolve disputes, enforce agreements, and maintain security. Some local app data may remain on your device until you clear it or uninstall the app.'
        },
        {
          heading: 'Your Choices and Rights',
          items: [
            'You can update profile details in your account where the app provides controls.',
            'You can unsubscribe from non-essential marketing emails using the link in those emails or by contacting support.',
            'You can request access, correction, export, restriction, or deletion of your personal information by contacting support@foodbot.ng.',
            'To delete your account and associated FoodBot data, contact support@foodbot.ng from your account email with the subject "Delete my FoodBot account".'
          ]
        },
        {
          heading: 'Children',
          body: 'FoodBot is not intended for children under 13. If you believe a child has provided personal information without appropriate consent, contact support@foodbot.ng so we can review and remove it where required.'
        },
        {
          heading: 'International Users',
          body: 'FoodBot may process information in countries other than where you live. We use reasonable safeguards designed to protect information according to this Privacy Policy.'
        },
        {
          heading: 'Changes and Contact',
          body: 'We may update this Privacy Policy as FoodBot changes. If changes are material, we will take reasonable steps to notify users. Questions or privacy requests can be sent to support@foodbot.ng.'
        }
      ]
    },
    {
      id: 'terms',
      overline: 'Terms of Service',
      title: 'Terms of Service',
      updated: 'July 8, 2026',
      summary: 'These terms govern use of FoodBot. By using FoodBot, you agree to use it lawfully and responsibly.',
      groups: [
        {
          heading: 'Agreement to These Terms',
          body: 'These Terms of Service apply to FoodBot websites, apps, APIs, subscriptions, and related services operated by Scalefort. If you do not agree, do not use FoodBot.'
        },
        {
          heading: 'Accounts and Security',
          items: [
            'You are responsible for providing accurate account information and keeping your login credentials secure.',
            'You are responsible for activity under your account unless caused by FoodBot security failures.',
            'You must notify us promptly if you suspect unauthorized account access.',
            'We may suspend or restrict accounts that violate these terms, create risk, or are required to be restricted by law.'
          ]
        },
        {
          heading: 'Acceptable Use',
          items: [
            'Do not use FoodBot for unlawful, harmful, deceptive, abusive, or infringing activity.',
            'Do not attempt to reverse engineer, scrape, overload, bypass security, or interfere with FoodBot systems.',
            'Do not upload content that you do not have rights to use or that violates another person\'s rights.',
            'Do not rely on FoodBot for emergency medical decisions, diagnosis, or treatment.'
          ]
        },
        {
          heading: 'Nutrition and Wellness Guidance',
          body: 'FoodBot provides planning, education, recipe, grocery, tracking, and coaching tools for general wellness and nutrition support. Outputs can be incomplete or inaccurate. You are responsible for checking ingredients, allergens, dietary suitability, and professional medical advice where needed.'
        },
        {
          heading: 'Subscriptions, Billing, and Cancellation',
          items: [
            'Some FoodBot features may require a paid subscription or approved API access.',
            'Prices, billing periods, trial terms, taxes, and renewal details are shown before purchase where required.',
            'Subscriptions purchased through an app store must be managed and cancelled through that app store account.',
            'Subscriptions purchased through web or other payment providers must be managed through the relevant FoodBot or provider flow.',
            'Cancelling a subscription stops future renewals but does not automatically refund prior charges unless required by law or the applicable store or payment provider policy.'
          ]
        },
        {
          heading: 'User Content and License',
          body: 'You keep ownership of content you enter into FoodBot. You grant FoodBot a limited license to host, process, display, adapt, and use that content as needed to provide, secure, support, and improve the service.'
        },
        {
          heading: 'FoodBot Content and Intellectual Property',
          body: 'FoodBot, including its software, design, branding, recipes, generated interfaces, documentation, and other content, is owned by Scalefort or its licensors. You may use FoodBot only as allowed by these terms and the product experience.'
        },
        {
          heading: 'Third-Party Services',
          body: 'FoodBot may link to or integrate with third-party services such as payment processors, app stores, analytics, hosting, authentication, communications, or health and nutrition data providers. Those services may have their own terms and privacy policies.'
        },
        {
          heading: 'Availability and Changes',
          body: 'We work to keep FoodBot reliable, but the service may change, pause, or become unavailable from time to time. We may add, modify, or remove features as the product evolves.'
        },
        {
          heading: 'Disclaimers and Liability',
          body: 'FoodBot is provided on an "as is" and "as available" basis to the fullest extent permitted by law. We are not liable for indirect, incidental, special, consequential, or punitive damages, or loss of data, profits, goodwill, or business opportunities, except where the law does not allow such limits.'
        },
        {
          heading: 'Termination',
          body: 'You may stop using FoodBot at any time. We may suspend or terminate access if you violate these terms, create risk for the service or other users, or if continued access would be unlawful.'
        },
        {
          heading: 'Contact',
          body: 'Questions about these terms, subscriptions, account deletion, or support can be sent to support@foodbot.ng.'
        }
      ]
    }
  ];

  readonly visibleSections: LegalSection[];

  constructor(route: ActivatedRoute) {
    const path = route.snapshot.routeConfig?.path;

    if (path === 'privacy-policy') {
      this.visibleSections = this.sections.filter(section => section.id === 'privacy');
      return;
    }

    if (path === 'terms-of-service') {
      this.visibleSections = this.sections.filter(section => section.id === 'terms');
      return;
    }

    this.visibleSections = this.sections;
  }
}
