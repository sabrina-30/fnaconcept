import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './contact-form/contact-form.component';

interface ContactInfo {
  address: string;
  emails: string[];
  phone: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactInfo: ContactInfo = {
    address: '53 Avenue Joffre 93800, Épinay-sur-Seine',
    emails: ['contact.fnaconcept@gmail.com', 'akhemis.fnaconcept@gmail.com'],
    phone: '+33 7 53 80 14 14'
  };
}
