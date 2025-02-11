export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageLink: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const staticTeamMembers: TeamMember[] = [
  {
    id: '57',
    name: 'John Verdi',
    role: 'Founder, CEO',
    bio: 'info@heyblue.app',
    imageLink: 'https://utfs.io/f/xPb29TA7HRGZrXv7hRE417Da95XVKkehuRxz6gfZscStJTGp'
  },
  {
    id: '58',
    name: 'Federico Cinelli',
    role: 'Chief Technical Officer',
    bio: 'cinelli.federico@gmail.com',
    imageLink: 'https://utfs.io/f/xPb29TA7HRGZWlm78IYVSd45r8T3XioOPKUlyNpjsevWYA19'
  },
  {
    id: '59',
    name: 'Sreesh Srinivasan',
    role: 'Co-Project Manager',
    bio: 'sreesh.srinivasan@gmail.com',
    imageLink: 'https://utfs.io/f/xPb29TA7HRGZqwuqlXmHR7GdcTbXuvyCeohSnzZ9APsYk1mw'
  },
  {
    id: '60',
    name: 'Mario Joseph',
    role: 'Co-Project Manager',
    bio: 'mariosaju@outlook.com',
    imageLink: 'https://utfs.io/f/xPb29TA7HRGZEx6Z4HI8nvFfEmBzJ605wo1xUrNgYPpZAayC'
  },
];