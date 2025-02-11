interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  media?: MediaItem[];
  tags?: string[];
  highlight?: boolean;
}

type ImageMedia = {
  type: 'image';
  url: string;
  alt?: string;
}

type VideoMedia = {
  type: 'video';
  url: string;
  thumbnail?: string;
  alt?: string;
}

type YouTubeMedia = {
  type: 'youtube';
  embedId: string;
  alt?: string;
}

type InstagramMedia = {
  type: 'instagram';
  instagramId: string;
  alt?: string;
  size?: 'square' | 'portrait' | 'landscape';
}

type NBCNewsMedia = {
  type: 'nbcnews';
  videoId: string;
  alt?: string;
}

type PDFMedia = {
  type: 'pdf';
  url: string;
  title: string;
  alt?: string;
}

type MediaItem = ImageMedia | VideoMedia | YouTubeMedia | InstagramMedia | NBCNewsMedia | PDFMedia;


export const timelineEvents: TimelineEvent[] = [

  {
    date: "September 11, 2001",
    title: "Concept of Hey, Blue! Originates",
    description: "After the devastating attacks on 9/11, John Verdi had an idea -- to connect the heroic heroes of that day with the community that they save. He was inspired by a single piece of paper, a note from a local kid that thanked him. It was in that moment that John knew what type of cop he wanted to be, and he also knew what type of cop he wanted others to be.",
    media: [
      {
        type: "image",
        url: "https://utfs.io/f/xPb29TA7HRGZ06gXTuc4LcsUoAvymTPG8wR2lVhjkZp5BQDI",
        alt: "Hey Blue founding team"
      },
      {
        type: "image",
        url: "https://utfs.io/f/xPb29TA7HRGZlNwt3CL6m189ZwU2WESH4Fc0BbRgDn3YGIqa",
        alt: "Hey Blue concept origins"
      }
    ],
    tags: ["Milestone", "Foundation"],
    highlight: true
  },
  {
    date: "December 26, 2016",
    title: "First Logo Created, Initiative Announced",
    description: "On the Hey, Blue! Instagram, the logo you see on this website was released (with the amazing design by Vincent Romeo). With it, the Hey, Blue! initiative was born.",
    media: [{
      type: "image",
      url: "/assets/logo.png",
      alt: "Original Hey Blue logo by Vincent Romeo"
    }],
    tags: ["Branding", "Milestone"],
    highlight: true
  },
  {
    date: "February 2019",
    title: "Raised $500 for a Florida family",
    description: "With the Melbourne PD, Club Esteem, and others, Hey, Blue! was able to raise over $500 for a local family through positive interactions.",
    media: [{
      type: "image",
      url: "https://utfs.io/f/xPb29TA7HRGZq8jfXQmHR7GdcTbXuvyCeohSnzZ9APsYk1mw",
      alt: "Florida family fundraising event"
    }],
    tags: ["Community", "Fundraising", "Impact"],
    highlight: true
  },
  {
    date: "August 9, 2019",
    title: "Storytime at Ben & Jerry's",
    description: "To help facilitate connections between the police (our safekeepers) and the community, Hey, Blue! conducted a storytime event in collaboration with Center State Bank and the Melbourne Police Department. Officers Mark Lang, Kevin Palmeri, and others of MPD did an excellent job connecting with the audience.",
    media: [{
      type: "image",
      url: "https://utfs.io/f/xPb29TA7HRGZhP6iQTi7mI742lZPixKk5XSR1rcw9Yzuv6Fy",
      alt: "Storytime event at Ben & Jerry's"
    }],
    tags: ["Community", "Events", "Outreach"],
    highlight: true
  },
  {
      date: "September 28, 2019",
      title: "Unity Garden at Space Coast Pride",
      description: "At the Space Coast Pride Parade, Marcus Claycomb of the MPD teamed up with Space Coast Pride and Hey, Blue! to plant a one of a kind Unity Garden with the community.",
      media: [{
        type: "image",
        url: "https://utfs.io/f/xPb29TA7HRGZAxZIgsqYlGf4985vDWQdi1BpnSeEFjgO7RTh",
        alt: "Unity Garden planting at Space Coast Pride"
      }],
      tags: ["Community", "Events", "Outreach", "Pride"],
      highlight: true
    },
    {
      date: "September 2019",
      title: "School Storytimes",
      description: "Extending the Ben & Jerry's storyime, Hey, Blue! began conducting storytimes at local schools, libraries, and bookstores to foster positive interactions between the police and the children they protect. Thanks to MPD officers Marcus Claycomb, Chris, and more for an amazing job reading books and connecting with their Melbourne community, at Croton, Endeavour, Palm Bay, and other elementary schools! Storytimes soon expanded across the US to schools in Austin, Texas, and beyond",
      media: [{
        type: "image",
        url: "https://utfs.io/f/xPb29TA7HRGZ81gje84DDkyEAZRo1QjvBmgutPUx3NrX4bMJ",
        alt: "School storytime events"
      }],
      tags: ["Community", "Events", "Education", "Outreach"],
      highlight: true
    },
    {
          date: "May 9, 2020",
          title: "Virtual Storytime",
          description: "During the early days of the pandemic, Hey, Blue! wanted to keep the tradition of storytimes alive. To do so, it launched virtual storytimes, accessible to anyone! Available on Facebook Live, every week on Friday.",
          media: [{
            type: "instagram",
            instagramId: "B_vXGUVpWd_",
            alt: "Virtual storytime session Instagram post",
            size: "square"
          }],
          tags: ["Community", "Events", "Education", "Virtual", "COVID-19"],
          highlight: true
        },
        {
        date: "September 11, 2020",
        title: "21 Questions with a Police Officer",
        description: "To expand transparency with Police Officers, Hey, Blue! launched 21 Questions, a bimonthly Q&A series with police officers and community members like Brandon Fleming of the South Hill, VA PD and Alton Edmond, Esq.",
        media: [
          {
            type: "youtube",
            embedId: "GBWa6nC7K0Q",
            alt: "21 Questions Q&A series"
          },
          {
            type: "instagram",
            instagramId: "CE1qCOZjmmC",
            alt: "21 Questions Instagram post",
            size: "landscape"
          }
        ],
        tags: ["Community", "Education", "Transparency", "Q&A"],
        highlight: true
    },
        {
        date: "April 5, 2020",
        title: "Hey, Blue! Plate Special",
        description: "Plate Specials allow participants to open up about their experiences with policing, their visions for change, and the importance of mental health. Community members and officers are given the opportunity to be honest and vulnerable, all driven by a common goal: connection.",
        media: [
          {
            type: "image",
            url: "https://utfs.io/f/xPb29TA7HRGZXwR1FA5Ev43V5LUQ7PYSyd6DfKHRbrogCBmj",
            alt: "Plate Special discussion event"
          },
          {
            type: "image",
            url: "https://utfs.io/f/xPb29TA7HRGZXOOS2nO5Ev43V5LUQ7PYSyd6DfKHRbrogCBm",
            alt: "Plate Special photo 1"
          },
          {
            type: "image",
            url: "https://utfs.io/f/xPb29TA7HRGZi5Ha9rQd4je25EJPgKfnwhZYvTxQUraDGLOR",
            alt: "Plate Special photo 2"
          },
          {
            type: "image",
            url: "https://utfs.io/f/xPb29TA7HRGZ7Nvav6nCSByX5IGqPrj4z2Ul0LYTkfmx1p6V",
            alt: "Plate Special photo 3"
          },
          {
            type: "image",
            url: "https://utfs.io/f/xPb29TA7HRGZ8qZ2KnDDkyEAZRo1QjvBmgutPUx3NrX4bMJc",
            alt: "Plate Special photo 4"
          }
        ],
        tags: ["Community", "Mental Health", "Dialogue", "Connection"],
        highlight: true
    },

    {
      date: "November 29, 2020",
      title: "Hey, Blue! Featured on NBC Nightly News with Lester Holt",
      description: "Hey, Blue! appeared on NBC Nightly News to share its mission of uniting police officers and their communities through both in-person and online storytime sessions.",
      media: [{
        type: "nbcnews",
        videoId: "mmvo96830533957",
        alt: "NBC Nightly News feature on Hey Blue"
      }],
      tags: ["Media Coverage", "National Recognition", "Impact"],
      highlight: true
    },
        {
      date: "January 7, 2021",
      title: "Hey, Blue! Police Forum",
      description: "Police Officers from across the country met online to share stories and create solutions. That same day, Hey, Blue! was introduced to LEAD Brevard.",
      media: [{
        type: "youtube",
        embedId: "4XPk8RgkHa0",
        alt: "Police Forum discussion"
      }],
      tags: ["Community", "Education", "Dialogue", "Leadership"],
      highlight: true
    },
    {
      date: "February 11, 2021",
      title: "Hey, Blue! Featured in the Ben & Jerry's Newsletter!",
      description: "Click on the video to play!",
      media: [{
        type: "instagram",
        instagramId: "CLKXpCWMOMe",
        alt: "Ben & Jerry's Newsletter feature",
        size: "square"
      }],
      tags: ["Media Coverage", "Partnership", "Recognition"],
      highlight: true
    },
        {
      date: "August 4, 2021",
      title: "Selfies for Change",
      description: "To raise money for a local family, community members could take selfies with local police officers with the #HeyBlue hashtag in Melbourne, Florida; Westfield, Indiana; and Cocoa, Florida.",
      media: [
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZm2ZXny08JGcF6d9CDOMpjsXkuZW1x2UbVyYP",
          alt: "Community selfie photo 1"
        },
        {
          type: "image", 
          url: "https://utfs.io/f/xPb29TA7HRGZ0ItmZxc4LcsUoAvymTPG8wR2lVhjkZp5BQDI",
          alt: "Community selfie photo 2"
        },
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZQA0Walw3fEJyDl4KCT95AqSx6wHbn1I2PW70",
          alt: "Community selfie photo 3"
        },
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZxswuMxA7HRGZmJsIt64KNOeFrWonif1pBgEa",
          alt: "Community selfie photo 4"
        },
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZ5UcZm4zAt6lwDp41dFr7vEfXShHzabKmoikM",
          alt: "Community selfie photo 5"
        },
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZwRtlf9SVZEMqtN3zmDs5bLWku7inXjBQyxrC",
          alt: "Community selfie photo 6"
        },
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZVsdvcpfsm5HS2zldkwqNROvtFf86P1TME4YA",
          alt: "Community selfie photo 7"
        },
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZcUpW3SAVWeUbsDjS4r2vpq9kOMCYP6GiTZ85",
          alt: "Community selfie photo 8"
        },
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZJoT8Z6hbLeJtYVXOR80Gh5kizqE1ow4CPUNy",
          alt: "Community selfie photo 9"
        },
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZestLEYwCbhIDMGQUXkW13aLKsevtFdS6RY5n",
          alt: "Community selfie photo 10"
        },
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZg2xCjKr0zNX89xtPFiHBDWjvSeuhaOE63LAr",
          alt: "Community selfie photo 11"
        }
      ],
      tags: ["Community", "Fundraising", "Social Media", "Impact"],
      highlight: true
    },
    {
      date: "2021",
      title: "Panasonic Donates Over $1000!",
      description: "Panasonic of North America raised over $1000 for Hey, Blue! at a National Team Meeting and donated a laptop to Mr. Verdi. Thanks to Panasonic NA and Toughbook NA for their support and belief in Hey, Blue!",
      media: [{
        type: "image",
        url: "https://utfs.io/f/xPb29TA7HRGZ0Niuwlc4LcsUoAvymTPG8wR2lVhjkZp5BQDI",
        alt: "Panasonic donation event"
      }],
      tags: ["Sponsorship", "Support", "Corporate Partnership"],
      highlight: true
    },
    {
      date: "March 8, 2023",
      title: "Design Thinking Session",
      description: "A Hey, Blue! Design Thinking Session is a collaborative workshop where community members, police officers, and other stakeholders come together to identify issues, brainstorm solutions, and work towards actionable steps to improve community-police relations and address social challenges. Through a structured process of ideation, prototyping, and testing, participants share their experiences, perspectives, and ideas to foster understanding, trust, and positive change within the community.",
      media: [
        {
          type: "youtube",
          embedId: "-w1v1QEAYtM",
          alt: "Design Thinking Session video"
        },
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZuSCrCdBNYqXOkh9KbSIp2EZQy5tWAFfrzuDP",
          alt: "Design Thinking Session workshop"
        }
      ],
      tags: ["Workshop", "Community", "Innovation", "Collaboration"],
      highlight: true
    },
    {
      date: "May 18, 2023",
      title: "What to Do When You're Pulled Over by the Police",
      description: "In this video, Alton Edmond, a Brevard County defense attorney, collaborates with the Cocoa Police Department for a workshop.",
      media: [{
        type: "youtube",
        embedId: "M-hvHPt_E5Y",
        alt: "Police stop workshop video"
      }],
      tags: ["Education", "Safety", "Community", "Workshop"],
      highlight: true
    },
    {
      date: "July 29, 2023",
      title: "FBINAA National Conference Breakout Session",
      description: "With Marcus Claycomb and Panasonic, Hey, Blue! hosted a breakout session focused on technologies for proactive policing. Thanks to sponsors Umzu, Kion, Wild Pastures, and Panasonic!",
      media: [
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZkftPXCeMiP9FjxuWmR638wBZ2thdebOJySIv",
          alt: "FBINAA Conference photo 1"
        },
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZHukLdkWURftSPJizr35QqEsMyxoZ0WbgdOV1",
          alt: "FBINAA Conference photo 2"
        },
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZPYZOVTGaitFzx4vETRbSgjL8WQhwDfUVu2cq",
          alt: "FBINAA Conference photo 3"
        },
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZxu80WTA7HRGZmJsIt64KNOeFrWonif1pBgEa",
          alt: "FBINAA Conference photo 4"
        },
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZYewUhDvycPwQ7e4XoIVuBkjLW5x9Zb1AF0Nm",
          alt: "FBINAA Conference photo 5"
        },
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZ1Q1HjmaQXV3bdCfhgMo62cUaRHKxy57DGE1F",
          alt: "FBINAA Conference photo 6"
        }
      ],
      tags: ["Conference", "Education", "Technology", "Sponsorship", "Law Enforcement"],
      highlight: true
    },
    {
      date: "May 2023",
      title: "Board of Directors Formed; Interns Joined",
      description: "To facilitate the creation of the mobile platform announced 7 years prior, Hey, Blue! introduced its Board of Directors, and began its internship. These interns (listed on the Team Page) have worked hard to develop a comprehensive mobile platform for positive interactions.",
      media: [{
        type: "image",
        url: "https://utfs.io/f/xPb29TA7HRGZ05KbCtc4LcsUoAvymTPG8wR2lVhjkZp5BQDI",
        alt: "Board of Directors and Interns"
      }],
      tags: ["Team", "Development", "Leadership", "Milestone"],
      highlight: true
    },
    {
      date: "December 16, 2023",
      title: "First Mobile Beta Test",
      description: "In Coney Island at PSA 1, where Mr. Verdi began his policing career, Hey, Blue! held its first mobile beta test. Since then, the app has continued to beta test. YOU can help us beta test, too, by downloading the app through these QR codes!",
      media: [{
        type: "youtube",
        embedId: "Oyn94IlECg4",
        alt: "Mobile app beta test video"
      }],
      tags: ["Technology", "Development", "Beta", "Milestone"],
      highlight: true
    },
    {
      date: "January 1, 2024",
      title: "2023 Year in Review",
      description: "Highlights of Hey Blue!'s major accomplishments in 2023",
      media: [
        {
          type: "video",
          url: "https://uuxoro55gq.ufs.sh/f/LRF5ZKCfpDOY9b3cHJGRDk0ZQ3AnaV4mBd8GH9vrMWXbqOxj",
          thumbnail: "https://uuxoro55gq.ufs.sh/f/LRF5ZKCfpDOYYSeGa4qVRb0Pt3hxWTqNKEsgOZwAu1c2fjGM",
          alt: "2023 Review Videos"
        },
        {
          type: "video",
          url: "https://uuxoro55gq.ufs.sh/f/LRF5ZKCfpDOYojOwbJBKEb7itIPQ8eAhr0uaYxNW9jlqsLCT",
          thumbnail: "https://uuxoro55gq.ufs.sh/f/LRF5ZKCfpDOYbFSbWdWuJaX6fCQrOMe7j3u1GkgzLDU0nqRI",
          alt: "2023 Review Videos"
        }
      ],
      tags: ["Annual Report", "Milestone", "Achievement"],
      highlight: true
    },
    {
      date: "September 11, 2024",
      title: "App Launches",
      description: "23 years after the idea was first conceived, Hey, Blue! officially launches, encouraging community members and police officers to have positive interactions. Download the app today to start earning points for positive interactions!",
      media: [{
        type: "image",
        url: "https://utfs.io/f/xPb29TA7HRGZ0ybFbic4LcsUoAvymTPG8wR2lVhjkZp5BQDI",
        alt: "App launch celebration"
      }],
      tags: ["Launch", "Technology", "Milestone", "Achievement"],
      highlight: true
    },
    {
      date: "November 16, 2024",
      title: "Sixth Man Basketball Tournament",
      description: "At Cocoa High School, 5 cities' police departments, local youths, and basketball all-star players will form teams together to play in a basketball tournament!",
      media: [
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZQuYBAt3fEJyDl4KCT95AqSx6wHbn1I2PW70m",
          alt: "Basketball tournament announcement"
        },
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZEaje3zI8nvFfEmBzJ605wo1xUrNgYPpZAayC",
          alt: "Basketball tournament photo 1"
        },
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZEnP6zI8nvFfEmBzJ605wo1xUrNgYPpZAayCq",
          alt: "Basketball tournament photo 2"
        },
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZU5Ml0gFdsKivJTULyoBODWZIaC6crR7exbng",
          alt: "Basketball tournament photo 3"
        },
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZgZut3Rr0zNX89xtPFiHBDWjvSeuhaOE63LAr",
          alt: "Basketball tournament photo 4"
        },
        {
          type: "image",
          url: "https://utfs.io/f/xPb29TA7HRGZf6uyChUXtyD8LoWCv1n7YE6ZM52gJQSbTaBc",
          alt: "Basketball tournament photo 5"
        }
      ],
      tags: ["Community", "Sports", "Youth", "Events", "Upcoming"],
      highlight: true
    },
    {
      date: "January 1, 2025",
      title: "2024 Year in Review",
      description: "Hey, Blue!'s review of accomplishments, milestones, and community impact throughout 2024.",
      media: [{
        type: "pdf",
        url: "https://0tkp56z0pn.ufs.sh/f/xPb29TA7HRGZQ4mNh3fEJyDl4KCT95AqSx6wHbn1I2PW70mX",
        title: "2025 Year in Review",
        alt: "Annual review document detailing Hey Blue's 2024 achievements"
      }],
      tags: ["Annual Report", "Milestone", "Achievement"],
      highlight: true
    },
    {
      date: "October 11th, 2025",
      title: "Sixth Man Basketball Tournament",
      description: "At Satellite High School, 6 teams of police officers, local youths, and basketball all-star players will form teams together to play in a basketball tournament! \n For more information, visit the Sixth Man Tournament page.",
      media: [
        {
          type: "image",
          url: "https://t930d35mct.ufs.sh/f/E7SQ1s5LZgz43qBYiFuhblhaDpeHJUoB14Mw62ugKvROTtXQ",
          alt: "Basketball tournament announcement"
        }
      ],
      tags: ["Community", "Sports", "Youth", "Events", "Upcoming"],
      highlight: true
    }
];