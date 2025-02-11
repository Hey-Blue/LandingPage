import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Timeline from "@/components/Timeline";
import Sponsors from "@/components/Sponsors";
import CTA from "@/components/CTA";
import USMap from "@/components/USMap";
import Newsletter from "@/components/Newsletter";
import FirstVisitPopup from "@/components/FirstVisitPopup";
// CookieConsentBanner is rendered globally in layout
export default function Home() {
	return (
		<div>
			<Hero />
			<Story />
			<Timeline />
            <USMap />
			<Newsletter />
			<Sponsors />
			<CTA />
			{/* Cookie banner is included globally via layout */}
			{/* First-visit popup */}
			<FirstVisitPopup />
		</div>
	);
}
