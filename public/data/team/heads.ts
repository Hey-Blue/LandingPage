export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageLink: string;
  contributions: string;
  date: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const staticTeamMembers: TeamMember[] = [
  {
    id: '57',
    name: 'John Verdi',
    role: 'Founder, CEO',
    bio: 'info@heyblue.app',
    imageLink: 'https://utfs.io/f/xPb29TA7HRGZrXv7hRE417Da95XVKkehuRxz6gfZscStJTGp',
    contributions: '', date: ''
  },
  {
    id: '60',
    name: 'Mario J.',
    role: 'Chief Technical Officer',
    bio: '',
    imageLink: 'https://0tkp56z0pn.ufs.sh/f/xPb29TA7HRGZkSrw4g4eMiP9FjxuWmR638wBZ2thdebOJySI',
    contributions: 'Mobile Application Development; Connections System; Designed and implemented the entire connection process between users and officers.; Developed a system for generating QR codes and random keys to facilitate connections.; Created a flow for users to initiate a connection request and officers to accept or decline.; Rewarded users with points upon successful connections.; Settings Page; Built the initial version allowing users to update personal settings, including preferences and account details.; Enabled data collection via settings input for storage.; Store Page; Developed a secure purchasing system for users to buy items within the app using points.; Implemented checks to prevent unauthorized purchases if users lack enough points.; Announcements Page; Integrated posts from the website to be displayed in the app.; Built admin tools for creating announcements and stories, viewable by users in real time.; Map Screen; Created the geolocation feature to display nearby officers and user connections on the map.; Implemented security features to only show officers within proximity, preventing stalking.; Phone Login; Updated and fixed issues with the phone login system.; Enabled users to receive one-time passcodes via SMS for login authentication.; Biometrics; Added support for biometric authentication, allowing users to log in using Face ID or fingerprint recognition.; Bug Fixing & Deployment; Worked extensively on fixing bugs and testing the mobile app across various devices.; Managed uploading app builds to both the iOS App Store and Google Play Store for release.; Web Application Development; Officer Portal; Created a system for supervisors to activate or deactivate officer accounts.; Implemented functionality for tracking officer status.; Organizations Portal; Developed a platform for organizations to create and manage items in the app store.; Added features to upload product images, set pricing, and upload unique item codes.; Connections; Redesigned the connection system to align with new database security protocols.; Improved the speed and security of QR transactions between users and officers.; Blog System; Implemented a blog posting feature allowing admins to create articles that sync directly with the mobile app.; Enabled categorized viewing for different users.; Redesigned the existing blog system, allowing business interns to add images, video, stylized text, and more in their style; Creating the data structure style to handle saving and reading from the backend of the new style; Login Screen; Rewrote the login and registration screens to handle new database structures and improve user experience.; Bug Fixing & Testing; Consistently addressed and fixed bugs, performing thorough testing to ensure stability across the web platform.; NEXT.JS; Rebuilt the landing page and the web portal into Next.js; Redesigning the majority of the pages into a style that is both user-centric while keeping some of the original ideas; Web App; Took the initiative and converted the mobile app into the web app in Next.js; Built all the features from the ground up, converting from React Native to React; Administration & Leadership; Mobile Team Lead (Fall 2023 - Present); Promoted to lead the mobile development team, coordinating with interns and managing the mobile app development roadmap.; Assigned tasks, conducted code reviews, and provided help to team members.; Set up weekly meetings, provided feedback, and handled intern issues.; Project Manager (Nov 2023 - Present); Took on the role of project manager, overseeing the entire development cycle.; Organized and led project meetings, tracking progress and ensuring deadlines were met.; Managed administrative tasks such as timecards, handling attendance, and sending emails.; ',
    date: ''
  },


  {
    id: '53',
    name: 'Eshan R.',
    role: 'Co-Project Manager',
    bio: 'UC Santa Cruz',
    imageLink: 'https://0tkp56z0pn.ufs.sh/f/xPb29TA7HRGZTm9n3fsJXnF9ZPzSeh4kDAWqgY7G1srIjiRB',
    contributions: "Created Hey, Blue!'s social media strategy; Created Hey, Blue!'s content sheet; Edited and created #21Question Videos and captions for social media; Edited and created 'Day in the Life' vlogs and captions; Created Hey, Blue!'s first ever newsletter; Helped write/complete iOS store listing requirements; Created required video for the App Store listing; Researched Greensboro, NC in preparation for a potential deal (included researching the city's history, Title I schools, test scores, city officials and police officers, organizations,  etc.); Created #GivingTuesday posts & captions; Created a video tracking repository with Business Development Interns",
    date: 'May 2024 - Present'
  },
  {
    id: '54',
    name: 'Soolynn B.',
    role: 'Co-Project Manager',
    bio: 'Castro Valley High School',
    imageLink: 'https://0tkp56z0pn.ufs.sh/f/xPb29TA7HRGZUOUhMudsKivJTULyoBODWZIaC6crR7exbngE',
    contributions: "Created the website's first design and element layouts; Constantly updated new information, images, and sections; Designed icons for map and achievements; Added intern profiles to the team page; Implemetented carousels for all images; Updated timeline with new events and its own scroll element",
    date: 'Jan 2024 - Present'
  },
  {
    id: '55',
    name: 'Ariv J.',
    role: 'Co-Project Manager',
    bio: 'Lynbrook High School',
    imageLink: 'https://0tkp56z0pn.ufs.sh/f/xPb29TA7HRGZixdx4wWQd4je25EJPgKfnwhZYvTxQUraDGLO',
    contributions: 'Later promoted to a Mobile Team Lead, managing anywhere from 6-10 interns; Fixed the settings page making sure the profile data integrated properly, created a beneficiary page, and created a system to track connections per account; Improved efficiency by moving our data to the Realtime Database and completed the point transfer system with child accounts. Worked on numerous bug fixes and features.',
    date: 'Jan 2024 - Present'
  },
];