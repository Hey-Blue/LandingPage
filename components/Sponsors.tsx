import Image from "next/image";

const sponsors = [
  { image: "https://utfs.io/f/xPb29TA7HRGZBQXV4dCF6HvfZwI3aBtEhsk9AnU5S0ojbzXD", link: "https://www.brevardprevention.org/" },
  { image: "https://utfs.io/f/xPb29TA7HRGZQo94Ub3fEJyDl4KCT95AqSx6wHbn1I2PW70m", link: "https://www.southstatebank.com/personal" },
  { image: "https://utfs.io/f/xPb29TA7HRGZl4d9uCL6m189ZwU2WESH4Fc0BbRgDn3YGIqa", link: "https://na.panasonic.com/" },
  { image: "https://utfs.io/f/xPb29TA7HRGZLId7V9Z91EfDaAt2gSTH7JwOeo3kGbWIzCsL", link: "https://cfbrevard.org/" },
  { image: "https://utfs.io/f/xPb29TA7HRGZfDDk7VUXtyD8LoWCv1n7YE6ZM52gJQSbTaBc", link: "https://www.cflbigs.org/" },
  { image: "https://utfs.io/f/xPb29TA7HRGZc2kZdmVWeUbsDjS4r2vpq9kOMCYP6GiTZ85a", link: "https://youngblackandlit.org/" },
  { image: "https://utfs.io/f/xPb29TA7HRGZHkmuMBWURftSPJizr35QqEsMyxoZ0WbgdOV1", link: "https://www.charlieandjakes.com/" },
  { image: "https://utfs.io/f/xPb29TA7HRGZcbmFRPVWeUbsDjS4r2vpq9kOMCYP6GiTZ85a", link: "https://www.masatacos.com/" },
  { image: "https://utfs.io/f/xPb29TA7HRGZkGo9SPeMiP9FjxuWmR638wBZ2thdebOJySIv", link: "https://www.benjerry.com/" },
  { image: "https://utfs.io/f/xPb29TA7HRGZ5TMafDczAt6lwDp41dFr7vEfXShHzabKmoik", link: "https://www.bunkysrawbar.com/" },
  { image: "https://utmbvtrp5h.ufs.sh/f/CXXm4k0yX8RBHk7EtjrLogU57YqZbjDmhk0izyIwGKxFc1ld", link: "https://www.cypressbanktrust.com/" },
  { image: "https://utmbvtrp5h.ufs.sh/f/CXXm4k0yX8RBHiStz1rLogU57YqZbjDmhk0izyIwGKxFc1ld", link: "https://www.launchcu.com/" },
  { image: "https://utmbvtrp5h.ufs.sh/f/CXXm4k0yX8RBc6e8jXPxWSaYxR2VgwsrlUKFyJH3vP018BfQ", link: "https://endeavour.fruitvale.k12.ca.us/" },
  { image: "https://t930d35mct.ufs.sh/f/E7SQ1s5LZgz4vBWzRXt3wjnbXsDYvNKdrhealpuz0f8xgAkG", link: "https://www.cooley.com/" },
  { image: "https://kgaduw4eg5.ufs.sh/f/9uvKp87YcEsONq15JrZjObL8YK45UrWFCuhijxn2HIEvVZzS", link: "https://www.allaluminumscreening.com/" },
];

export default function Sponsors() {
  return (
    <section className="container-base py-12">
      <h3 className="text-center text-sm uppercase tracking-wider text-neutral-500 mb-6">Supported by</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
        {sponsors.map((s, i) => (
          <a key={i} href={s.link} target="_blank" rel="noreferrer" className="group flex items-center justify-center p-3 rounded-lg border border-black/5 bg-white hover:shadow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.image} alt="Sponsor logo" className="max-h-12 w-auto object-contain opacity-80 group-hover:opacity-100"/>
          </a>
        ))}
      </div>
    </section>
  );
}
