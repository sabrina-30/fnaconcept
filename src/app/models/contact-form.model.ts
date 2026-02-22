export interface ContactFormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  service: string;
  message: string;
}

export interface ContactFormState {
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: boolean;
  errorMessage: string;
}

export interface FormValidationRules {
  nom: {
    required: true;
    minLength: 2;
  };
  prenom: {
    required: true;
    minLength: 2;
  };
  email: {
    required: true;
    pattern: RegExp;
  };
  telephone: {
    required: true;
    pattern: RegExp;
  };
  service: {
    required: true;
  };
  message: {
    required: true;
    minLength: 10;
  };
}

export interface ServiceOption {
  value: string;
  label: string;
}

export const validationMessages = {
  nom: {
    required: 'Le nom est requis',
    minlength: 'Le nom doit contenir au moins 2 caractères'
  },
  prenom: {
    required: 'Le prénom est requis',
    minlength: 'Le prénom doit contenir au moins 2 caractères'
  },
  email: {
    required: 'L\'adresse e-mail est requise',
    pattern: 'Veuillez entrer une adresse e-mail valide'
  },
  telephone: {
    required: 'Le numéro de téléphone est requis',
    pattern: 'Veuillez entrer un numéro de téléphone français valide'
  },
  service: {
    required: 'Veuillez sélectionner un service'
  },
  message: {
    required: 'Le message est requis',
    minlength: 'Le message doit contenir au moins 10 caractères'
  }
};

export const serviceOptions: ServiceOption[] = [
  { value: '', label: 'Sélectionnez un service' },
  { value: 'devis', label: 'Demande de devis gratuit' },
  { value: 'info', label: 'Informations sur un service' },
  { value: 'suivi', label: 'Suivi de chantier' },
  { value: 'autre', label: 'Autre demande' }
];
