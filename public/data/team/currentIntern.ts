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
    id: '602',
    name: 'Rohit R.',
    role: 'Mobile End Intern',
    bio: 'Lightridge High School',
    imageLink: 'https://0tkp56z0pn.ufs.sh/f/xPb29TA7HRGZ1bYQYzaQXV3bdCfhgMo62cUaRHKxy57DGE1F',
    contributions: 'Prevented an account security risk during Google login; Created a cloud function to automatically verify police officer emails; Prevented the application from tracking user location while the user was idle; Allowed the app to save receipts to the users phone; Allowed the user to connect their phone number through the settings screen',
    date: 'May 2024 - Present'
  },
  {
    id: '31',
    name: 'Rishabh B.',
    role: 'Mobile End Intern',
    bio: 'American High School',
    imageLink: 'https://utfs.io/f/xPb29TA7HRGZHyBw0VAWURftSPJizr35QqEsMyxoZ0WbgdOV',
    contributions: 'Coded screen in settings that fixes app crash; Coded phone verification requirement for purchases; Coded post expansion for newsletters on mobile; Coded front camera only for profiile picture photos; Created day in the life of an intern video; Created placeholder accounts on Supabase; Coded displaying connections on map in Supabase',
    date: 'July 2024 - Present'
  },
  {
    id: '44',
    name: 'Austin S.',
    role: 'Web End Intern',
    bio: 'Bellarmine College Prep',
    imageLink: 'https://0tkp56z0pn.ufs.sh/f/xPb29TA7HRGZ3yjfGsxc6Z2MU8rfbQODKsTCdkezG7vHYLXg',
    contributions: 'Worked on a cloud function to toggle the levels of users in the web portal; changed redirects for the web app and the web portal; Changed redirects to different pages according to account type; Coded the ability for a google account photo to be used as a profile photo for the web app if no profile photo has been selected yet; Bugfixes for the organization page on the web portal',
    date: 'August 2024 - Present'
  },


 
  {
    id: '56',
    name: 'Pragyan R.',
    role: 'Web End Intern',
    bio: 'Dougherty Valley Highschool',
    imageLink: 'https://0tkp56z0pn.ufs.sh/f/xPb29TA7HRGZA2THWjqYlGf4985vDWQdi1BpnSeEFjgO7RTh',
    contributions: 'Worked on Cloud functions like AdminCreateUser and others; Implemented split portal functionality and the user portal; Added logout functionality; Bitmoji creator using generated AI and stable diffusion for an image to image pipeline',
    date: 'Sept 2023 - Present'
  },

  {
    id: '600',
    name: 'Nikhil G.',
    role: 'Front End Intern',
    bio: 'Amador Valley High School',
    imageLink: 'https://utfs.io/f/xPb29TA7HRGZz2pY9BOfRnGPrxYyIuthsb6Hl128mFcXKaZ4',
    contributions: 'Adjusted text formatting on mission statement; Coded a tooltip element and implemented it to describe a sponsor; Coded a way to import Google fonts and implemented it on the website; Edited the formatting of the Download App Page',
    date: 'Sept 2024 - Present'
  },
  {
    id: '77',
    name: 'Justin U.',
    role: 'Front End Intern',
    bio: 'Castro Valley High School',
    imageLink: 'https://7wz8a9gr1e.ufs.sh/f/IVApE56zliouHJET01gXHAxiykheoKanwMj27OS3YzWVD04Z',
    contributions: "Developed the leaderboard's UI for the web app; Added more intern photos on the website; Added more sponsor section for the website; Created a tutorial for business development on adding items in the shop",
    date: 'Jan 2025 - Present'
  },
  
  { 
    id: '41',
    name: 'Mohnish K.',
    role: 'Business Development Intern - Researcher',
    bio: 'Marvin Ridge High School',
    imageLink: 'https://0tkp56z0pn.ufs.sh/f/xPb29TA7HRGZOdJqQHTtA8e6YnhoxVNWBT7GbIpU9uM5csKS',
    contributions: 'Created blog posts relating to discussed topics; Contributed to the Hey, Blue! video database by identifying and rating multiple videos displaying positive police community interactions',
    date: 'Jan 2025 - Present'
  },
 
  { 
    id: '43',
    name: 'Shrey S.',
    role: 'Web End Lead',
    bio: 'ACCEL Middle College',
    imageLink: 'https://uuxoro55gq.ufs.sh/f/LRF5ZKCfpDOYCZxJHceisdf04FChmX2Ka6WOHBPG3vj5toIn',
    contributions: 'Worked on a newsletter button for admin page',
    date: 'Feb 2025 - Present'
  },
  { 
    id: '45',
    name: 'Angela Z.',
    role: 'Front End Intern',
    bio: 'Basis Independent Fremont',
    imageLink: 'https://0tkp56z0pn.ufs.sh/f/xPb29TA7HRGZGMt9Rs81JsIhQR9uyOxGWDl8nrKgvFBfoZTP',
    contributions: "Adjusted formatting on for the vertical and horizontal images on blogs; Designed crown icons for leaderboard; Coded and implemented each member's contributions on the Team website",
    date: 'Jan 2025 - Present'
  },
  {
    id: '48',
    name: 'Ariana M.',
    role: 'Business Development Lead',
    bio: 'Beaumont Early College High School',
    imageLink: 'https://0tkp56z0pn.ufs.sh/f/xPb29TA7HRGZljui4RL6m189ZwU2WESH4Fc0BbRgDn3YGIqa',
    contributions: 'Author and founder of the INTERN-AL Affairs Newsletter; Consistently created blog posts/student highlights for Hey, Blue! website; Contributed to BizDev police officer video database; Prepared content for social media posts; Collaborated with colleagues to research and create a report on Trauma-Informed Policing; Worked to convert research into a Trauma-Informed schedule to incorporate into local Police Departments; Aided colleagues on the production of the Hey, Blue! music video ',
    date: 'Jan 2025 - Present'
  },

  {
    id: '50',
    name: 'Moukthika K.',
    role: 'Front End Lead',
    bio: 'Washington High School',
    imageLink: 'https://0tkp56z0pn.ufs.sh/f/xPb29TA7HRGZ8bRwZVDDkyEAZRo1QjvBmgutPUx3NrX4bMJc',
    contributions: 'Added intern photos on the website; Edited styling of download page on the website; Added the GitHub icon to the header and footer of the website, Color scheme changes to the website; updating intern contributions, created new header and added it to the News section; adding total connections to map page; worked with business development tutorial for using mobile app-including how to scan and also a basic introduction to the mobile app; assigned tasks and managed frontend team as frontend lead ',
    date: 'Jan 2025 - Present'
  },
  {
    id: '71',
    name: 'Ansha K.',
    role: 'Business Development Intern - Researcher',
    bio: 'American High School',
    imageLink: 'https://7wz8a9gr1e.ufs.sh/f/IVApE56zliou5cP58gLa8ClSobrIcLMGuVxqNQ0sPKUYf519',
    contributions: ' ',
    date: 'Jun 2025 - Present'
  },
  {
    id: '51',
    name: 'Talya N.',
    role: 'Mobile End Intern',
    bio: 'Homestead High School',
    imageLink: 'https://0tkp56z0pn.ufs.sh/f/xPb29TA7HRGZii4GkqQd4je25EJPgKfnwhZYvTxQUraDGLOR',
    contributions: 'Worked on the debugging mobile app',
    date: 'Feb 2025 - Present'
  },
  
 
  {
  id: '11', 
    name: 'Prisha K.',
    role: 'Business Development Intern - Researcher', 
    bio: 'Plainsboro High School North', 
    imageLink: 'https://0tkp56z0pn.ufs.sh/f/xPb29TA7HRGZZDe0aoCHRIqTJeyCXKaBDNWS6M2PZog8nwOE',
    contributions: 'Gave insights on police-townspeople interactions through vlog posts; Worked on expanding BizDev positive police officer interactions video database',
    date: 'Feb 2025 - Present'

  }, 
  /*code*/
  {
  id: '53', 
  name: 'Vasu S.', 
  role: 'Web End Intern', 
  bio: 'Dougherty Valley High School', 
  imageLink: 'https://7wz8a9gr1e.ufs.sh/f/IVApE56zliou0ZM8r0EIYkjUPiLl8EcabSop1JfsFMRrO23x', 
  contributions:'', 
  date: 'Jun 2025 - Present'
  }, 
  {
    id: '54', 
    name: 'Anish G.', 
    role: 'Web End Intern', 
    bio: 'Dougherty Valley High School', 
    imageLink: 'https://7wz8a9gr1e.ufs.sh/f/IVApE56zliouxvzQ9EDRHL6Gg9yCOa0E1cvMBd2JQ3jYhpNs', 
    contributions:'', 
    date: 'Jun 2025 - Present'
  }, 
  {
    id: '55', 
    name: 'Aarushi G.', 
    role: 'Web End Intern', 
    bio: 'Foothill High School', 
    imageLink: 'https://7wz8a9gr1e.ufs.sh/f/IVApE56zlioukXeQLpKsEVQMucfrOnBob9edLAptSyx5IqhW', 
    contributions:'', 
    date: 'Jun 2025 - Present'
  }, 
  {
    id: '56', 
    name: 'Tanay K.', 
    role: 'Mobile End Intern', 
    bio: 'Monta Vista High School', 
    imageLink: 'https://7wz8a9gr1e.ufs.sh/f/IVApE56zliouWdR4Az1sBd975beSWj1hzmkwvFaPHAiJOYnX', 
    contributions:'', 
    date: 'Jun 2025 - Present'
  }, 
  {
    id: '57', 
    name: 'Saanvi A.', 
    role: 'Mobile End Intern', 
    bio: 'Thomas Jefferson High School', 
    imageLink: 'https://7wz8a9gr1e.ufs.sh/f/IVApE56zliougaGstI8BDzAgdZUaMW46XSO9mvt8VLG5w2lB', 
    contributions:'', 
    date: 'Mar 2025 - Present'
  }, 
  {
    id: '59', 
    name: 'Maulik A.', 
    role: 'Mobile End Intern', 
    bio: 'Lynbrook High School', 
    imageLink: 'https://7wz8a9gr1e.ufs.sh/f/IVApE56zliou1Ca3se9bfzBTsVqy53NPLJehQ7W2YadSiUGp', 
    contributions:'', 
    date: 'Jun 2025 - Present'
  },
  {
    id: '60', 
    name: 'Ananya G.', 
    role: 'Mobile End Intern', 
    bio: 'William B. Travis High School', 
    imageLink: 'https://7wz8a9gr1e.ufs.sh/f/IVApE56zlioumz4kxUpJEUoKtMrp5sDagSR6F89b71CVwj4x', 
    contributions:'', 
    date: 'Jun 2025 - Present'
  },
  {
    id: '61', 
    name: 'Surya S.', 
    role: 'Business Development Intern - Researcher', 
    bio: 'Monta Vista High School', 
    imageLink: 'https://7wz8a9gr1e.ufs.sh/f/IVApE56zlioufpi7XSnMYBzZLQg3jmW20cuE6F9RknqD5Cx8', 
    contributions:'', 
    date: 'Jun 2025 - Present'
  },
  {
    id: '64', 
    name: 'Audrey X.', 
    role: 'Business Development Intern - Researcher', 
    bio: 'Cypress Woods High School', 
    imageLink: 'https://7wz8a9gr1e.ufs.sh/f/IVApE56zliouvCxNc8kGYkA7xGh9XVBwMEfoq4eigu5ZI8bP', 
    contributions:'', 
    date: 'Jun 2025 - Present'
  },

  {
    id: '65', 
    name: 'Driti V.', 
    role: 'Front End Intern', 
    bio: 'Evergreen Valley High School', 
    imageLink: 'https://7wz8a9gr1e.ufs.sh/f/IVApE56zlioulwNDCsUkqgtr0xRk2SyUniIofu4AYjz8apDe', 
    contributions:'', 
    date: 'Jun 2025 - Present'
  },
  {
    id: '66', 
    name: 'Rutvik R.', 
    role: 'Front End Intern', 
    bio: 'Dublin High School', 
    imageLink: 'https://7wz8a9gr1e.ufs.sh/f/IVApE56zliou9ZOMbIf6qIZH5EtfKbwQr9FRdeL4m0ick2hN', 
    contributions:'', 
    date: 'Mar 2025 - Present'
  },
  {
    id: '67', 
    name: 'Navya P.', 
    role: 'Business Development Intern - Social Media', 
    bio: 'Mountain House High School', 
    imageLink: 'https://7wz8a9gr1e.ufs.sh/f/IVApE56zliouA5MAsnciZl0Es71Nyfgp4hYIroQ3veSiXTcu', 
    contributions:'', 
    date: 'Jun 2025 - Present'
  },
  {
    id: '68', 
    name: 'Anvi G.', 
    role: 'Web End Intern', 
    bio: 'Cupertino High School', 
    imageLink: 'https://7wz8a9gr1e.ufs.sh/f/IVApE56zliouqq7E63Som07wkMyXNtgnpa4xhQHOlG3fV8s9', 
    contributions:'', 
    date: 'Jun 2025 - Present'
  },
  {
    id: '69', 
    name: 'Anika G.', 
    role: 'Web End Intern', 
    bio: 'Cupertino High School', 
    imageLink: 'https://7wz8a9gr1e.ufs.sh/f/IVApE56zliouITUubFzliouv6GqYZ0PMpS745kXAmCHx8hey', 
    contributions:'', 
    date: 'Jun 2025 - Present'
  },
  
  
  {
    id: '72', 
    name: 'Xavier S.', 
    role: 'Cyber Security', 
    bio: 'Rockledge High School', 
    imageLink: 'https://7wz8a9gr1e.ufs.sh/f/IVApE56zliouett2KOx0mfT7qb3MtDVjixApeuh8HCg0s4R6', 
    contributions:'', 
    date: 'Jun 2025 - Present'
  },
  {
    id: '73', 
    name: 'Revanth S.', 
    role: 'Business Development Intern - Social Media', 
    bio: 'Emerald High School', 
    imageLink: 'https://7wz8a9gr1e.ufs.sh/f/IVApE56zliouetiXoHE0mfT7qb3MtDVjixApeuh8HCg0s4R6', 
    contributions:'', 
    date: 'Jun 2025 - Present'
  },
];

