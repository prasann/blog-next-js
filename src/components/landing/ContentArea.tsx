import { useRouter } from "next/router";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faBlog,
  faMicrophone,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import ProfileImage from "./../../images/profile.jpeg";
import FeaturedBook from "./FeaturedBook";
import ScrollReveal from "./ScrollReveal";

type IconLinkProps = {
  navigateLink: string;
  icon: any;
  linkText: string;
};

const IconLink = ({ navigateLink, icon, linkText }: IconLinkProps) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(navigateLink)}
      className="group flex items-center gap-2 md:gap-3 px-5 md:px-6 py-2.5 md:py-3 cursor-pointer bg-theme-glass-light backdrop-blur-md border border-theme-border-medium rounded-xl hover:bg-theme-glass-medium hover:border-theme-border-dark transition-all duration-300 hover:-translate-y-1"
    >
      <FontAwesomeIcon
        icon={icon}
        className="text-xl md:text-2xl text-theme-accent group-hover:text-theme-accent-light transition-colors"
      />
      <span className="text-base md:text-lg font-semibold text-theme-text-primary transition-colors">
        {linkText}
      </span>
    </button>
  );
};

const Picture = () => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 w-40 md:w-52 lg:w-56 h-44 md:h-60 lg:h-64 bg-linear-to-br from-blue-500/50 via-blue-400/40 to-blue-600/50 rounded-[50%] blur-3xl -z-10 group-hover:blur-2xl group-hover:scale-110 transition-all duration-500"></div>
      <div className="w-40 md:w-52 lg:w-56 h-44 md:h-60 lg:h-64 rounded-[50%] overflow-hidden ring-4 ring-blue-400/40 shadow-2xl shadow-blue-500/30 group-hover:ring-blue-300/60 group-hover:shadow-blue-400/50 transition-all duration-500">
        <Image
          placeholder="blur"
          src={ProfileImage}
          alt="Prasanna Nagarajan"
          width={224}
          height={256}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center text-center gap-8 md:gap-10">
      <ScrollReveal>
        <Picture />
      </ScrollReveal>

      <ScrollReveal delay={120}>
        <div className="space-y-4 max-w-3xl">
          <p className="text-xs md:text-sm font-semibold tracking-[0.35em] uppercase text-theme-accent">
            AI/ML Engineer · Forward Deployed
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.15] pb-2 gradient-text drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">
            Prasanna Nagarajan
          </h1>
          <p className="text-lg md:text-2xl text-theme-text-secondary leading-relaxed">
            Building AI/ML systems alongside the customers who use them at
            Microsoft, grounded in years of large-scale distributed systems.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={240}>
        <div className="flex flex-wrap justify-center gap-4">
          <IconLink linkText="Blog" navigateLink="/blog" icon={faBlog} />
          <IconLink
            linkText="Talks"
            navigateLink="/talks"
            icon={faMicrophone}
          />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={360}>
        <button
          type="button"
          aria-label="Scroll down"
          onClick={() =>
            window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" })
          }
          className="cursor-pointer text-2xl text-theme-text-muted hover:text-theme-accent animate-bounce mt-2 transition-colors"
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </ScrollReveal>
    </section>
  );
};

const About = () => {
  return (
    <ScrollReveal direction="left">
      <section className="relative bg-theme-glass-light backdrop-blur-lg border border-theme-border-medium rounded-3xl overflow-hidden hover:border-theme-border-dark transition-all duration-300">
        <div className="p-6 md:p-8 lg:p-10 space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold gradient-heading">
            About
          </h2>
          <div className="space-y-4 text-theme-text-secondary text-base md:text-xl">
            <ScrollReveal delay={100}>
              <p className="leading-relaxed">
                Based in Bengaluru, India, I&apos;ve spent years leading teams
                that build high-performance, large-scale distributed platforms
                &mdash; the kind where correctness, latency, and resilience are
                non-negotiable.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={220}>
              <p className="leading-relaxed">
                Today my focus is AI/ML engineering. As a Forward Deployed
                Engineer at Microsoft, I work embedded with customers,
                designing, building, and shipping AI systems against real
                workloads rather than from a distance. That distributed-systems
                foundation shapes how I approach reliability and scale in ML.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={340}>
              <p className="leading-relaxed">
                I got here the long way. I started out as a full-stack developer,
                shipping web applications end to end, and spent formative years
                at Thoughtworks. I hold a master&apos;s degree in software
                systems and I&apos;m a certified AWS Solutions Architect with
                several Azure certifications. When I&apos;m not building, I&apos;m
                writing. Explore my blog for notes from the field, or browse my
                talks.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
};

const Social = () => {
  return (
    <ScrollReveal>
      <div className="flex justify-center gap-6 md:gap-8 py-3">
      <a
        aria-label="GitHub"
        className="text-3xl md:text-5xl text-theme-text-muted hover:text-white hover:scale-125 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(100,100,100,0.5)]"
        href="https://github.com/prasann"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a
        aria-label="Twitter"
        className="text-3xl md:text-5xl text-theme-text-muted hover:text-twitter-blue hover:scale-125 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(29,161,242,0.6)]"
        href="https://twitter.com/pvenk"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a
        aria-label="LinkedIn"
        className="text-3xl md:text-5xl text-theme-text-muted hover:text-linkedin-blue hover:scale-125 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(0,119,181,0.6)]"
        href="https://www.linkedin.com/in/prasanna-v-nagarajan"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
      <a
        aria-label="Email"
        className="text-3xl md:text-5xl text-theme-text-muted hover:text-success hover:scale-125 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(34,197,94,0.6)]"
        href="mailto:mail@prasanna.dev"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faEnvelope} />
        </a>
      </div>
    </ScrollReveal>
  );
};

const Container = () => {
  return (
    <div className="py-6 md:py-8 lg:py-10 pb-20 md:pb-10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-20 md:space-y-28">
          <Hero />
          <About />
          <ScrollReveal direction="right">
            <FeaturedBook />
          </ScrollReveal>
          <Social />
        </div>
      </div>
    </div>
  );
};

export default Container;
