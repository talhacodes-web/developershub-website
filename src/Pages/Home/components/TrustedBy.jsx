import carrefourLogo from '../../../assets/carrefour.svg'
import compilerExplorerLogo from '../../../assets/compiler-explorer.svg'
import coolifyLogo from '../../../assets/coolify.svg'
import houzzLogo from '../../../assets/houzz.svg'
import jellyfinLogo from '../../../assets/jellyfin.svg'
import reactLogo from '../../../assets/react.svg'
import vaadinLogo from '../../../assets/vaadin.svg'
import webflowLogo from '../../../assets/webflow.svg'

const logos = [
  { name: 'Carrefour', src: carrefourLogo },
  { name: 'Compiler Explorer', src: compilerExplorerLogo },
  { name: 'Coolify', src: coolifyLogo },
  { name: 'Houzz', src: houzzLogo },
  { name: 'Jellyfin', src: jellyfinLogo },
  { name: 'React', src: reactLogo },
  { name: 'Vaadin', src: vaadinLogo },
  { name: 'Webflow', src: webflowLogo },
]

function LogoItem({ logo }) {
  return (
    <div className="group/logo flex h-16 min-w-44 items-center justify-center gap-3 px-5 sm:min-w-52 sm:px-7">
      <img
        src={logo.src}
        alt={logo.name}
        className="h-6 w-auto opacity-80 brightness-90 transition-all duration-300 ease-out group-hover/logo:opacity-100 group-hover/logo:brightness-125 sm:h-8"
        loading="lazy"
      />
      <span className="text-xs font-medium tracking-wide text-slate-400 transition-colors duration-300 group-hover/logo:text-slate-100 sm:text-sm">
        {logo.name}
      </span>
    </div>
  )
}

function TrustedBy() {
  return (
    <section className="trusted-marquee-wrapper overflow-hidden">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-4 sm:gap-6 sm:px-6 sm:py-5 lg:px-8">
        <p className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-gray-500 sm:text-xs">
          TRUSTED BY
        </p>

        <div className="relative trusted-marquee flex overflow-hidden">
          <div className="trusted-marquee-track">
            {[...logos, ...logos].map((logo, index) => (
              <LogoItem key={`${logo.name}-${index}`} logo={logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustedBy
