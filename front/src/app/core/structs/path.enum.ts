export enum Path {
  // General containers
  Home = '',
  NotFound = '404',

  // Auth
  SignIn = 'auth/sign-in',
  SignUp = 'sign-up',
  ForgotPassword = 'forgot-password',
  ForgotPasswordEmailSent = 'forgot-password-email-sent',
  PasswordReset = 'password-reset',
  PasswordResetFailed = 'password-reset-failed',
  PasswordResetSucceeded = 'password-reset-succeeded',

  // App base url

  // Settings
  Settings = 'settings',
  SettingsAccount = 'account',
  SettingsAppearance = 'appearance',
  SettingsBilling = 'billing',
  SettingsBlockedUsers = 'blocked-users',
  SettingsNotifications = 'notifications',
  SettingsSecurity = 'security',
  SettingsSecurityLog = 'security-log',

  // User
  Users = 'users',
  UsersOverview = 'overview',
  UsersProfile = ':username',

  // Doctor
  Doctors = 'doctors',
  DoctorsOverview = 'overview',
  DoctorsProfile = ':doctorname',

  // Readology
  Readologys = 'readologys',
  ReadologysOverview = 'overview',
  ReadologysProfile = ':readologyname',

  // Mri
  Mris = 'mris',
  MrisOverview = 'overview',
  MrisProfile = ':mriname',

  //Roles
  Roles='roles',
  // Drug
  Drugs = 'drugs',
  DrugsOverview = 'overview',
  DrugsProfile = ':drugname',

  // OtherDeseases
  OtherDeseases = 'other_deseases',
  OtherDeseasesOverview = 'overview',
  OtherDeseasesProfile = ':drugname',

  // Patient
  Patients = 'patients',
  PatientsOverview = 'overview',
  PatientsProfile = ':patientname',
 

  // PatientVisit
  PatientVisit='Patient-visit',
  AddPatientVisit='add-patient-visit',
  EditPatientVisit='edit-patient-visit',

  // Locations
  Location='location',
  AddLocation='add-location',

  // Category
  Category = 'categorys',
  CategoryOverview = 'overview',
  CategoryProfile = ':categoryname',
}
