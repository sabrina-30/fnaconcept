import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trustPoints } from '../../models/trust-point.model';

@Component({
  selector: 'app-trust-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trust-banner.component.html',
  styleUrls: ['./trust-banner.component.css']
})
export class TrustBannerComponent {
  trustPoints = trustPoints;
}
