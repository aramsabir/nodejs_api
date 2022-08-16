import { Path } from '.';
import {
  faCapsules,
  faDisease,
  faFile,
  faHospitalAlt,
  faHospitalUser,
  faLocationArrow,
  faMicroscope,
  faProcedures,
  faUserAlt,
  faUserAltSlash,
  faUserCog,
  faUsers,
  faXRay,
} from '@fortawesome/free-solid-svg-icons';

export const navLinks = [
  {
    name: 'Settings',
    children: [
      {
        label: 'Users',
        route: Path.Users,
        icon: faUsers,
      },
      {
        label: 'Roles',
        route: Path.Roles,
        icon: faUserCog,
      },
      {
        label: 'Doctors',
        route: Path.Doctors,
        icon: faUserAlt,
      },
      {
        label: 'Radiologist',
        route: Path.Readologys,
        icon: faXRay,
      },
      {
        label: 'Raies',
        route: Path.Mris,
        icon: faMicroscope,
      },
      {
        label: 'Drugs',
        route: Path.Drugs,
        icon: faCapsules,
      },
      {
        label: 'Other diseases',
        route: Path.OtherDeseases,
        icon: faDisease,
      },
      {
        label: 'Locations',
        route: Path.Location,
        icon: faLocationArrow,
      },
    ],
  },
  {
    name: 'Patient',
    children:
    [
      { label: 'Patients', route: Path.Patients, icon: faHospitalUser },
      { label: 'Patients Visit', route: Path.PatientVisit, icon: faProcedures },
      
    ]
  },
  {
    name: 'Disease',
    children:[
      {
        label: 'Disease Category',
        route: Path.Category,
        icon: faDisease,
      },
    ]
  },
  {
    name: 'Reports',
    children:[
      {
        label: 'Report 1',
        icon: faFile,
      },
      {
        label: 'Report 2',
        icon: faFile,
      },
      {
        label: 'Report 3',
        icon: faFile,
      },
    ]
  }
];
