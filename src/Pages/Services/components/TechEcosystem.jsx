import { useState } from 'react'

const techCategories = {
	frontend: {
		name: 'Frontend',
		technologies: [
			{ name: 'React', icon: '⚛️', color: '#61DAFB' },
			{ name: 'Next.js', icon: '▲', color: '#000000' },
			{ name: 'TypeScript', icon: '<>', color: '#3178C6' },
			{ name: 'Tailwind CSS', icon: '🎨', color: '#06B6D4' },
			{ name: 'Framer', icon: '◆', color: '#0055FF' },
			{ name: 'Vue.js', icon: '◢', color: '#4FC08D' },
		],
	},
	backend: {
		name: 'Backend',
		technologies: [
			{ name: 'Node.js', icon: '⬢', color: '#68A063' },
			{ name: 'Python', icon: '🐍', color: '#3776AB' },
			{ name: 'PostgreSQL', icon: '🐘', color: '#336791' },
			{ name: 'AWS', icon: '☁️', color: '#FF9900' },
			{ name: 'Docker', icon: '🐳', color: '#2496ED' },
			{ name: 'Kubernetes', icon: '☸️', color: '#326CE5' },
		],
	},
	aiml: {
		name: 'AI/ML',
		technologies: [
			{ name: 'OpenAI', icon: '✨', color: '#10A37F' },
			{ name: 'PyTorch', icon: '🔥', color: '#EE4C2C' },
			{ name: 'TensorFlow', icon: '📊', color: '#FF6F00' },
			{ name: 'LangChain', icon: '🔗', color: '#06AEDD' },
			{ name: 'Hugging Face', icon: '🤗', color: '#FFD21E' },
			{ name: 'Scikit-learn', icon: '📈', color: '#F7931E' },
		],
	},
	design: {
		name: 'Design',
		technologies: [
			{ name: 'Figma', icon: '◉', color: '#F24E1E' },
			{ name: 'Adobe Photoshop', icon: '🎭', color: '#31A8FF' },
			{ name: 'Blender', icon: '🎬', color: '#F5792A' },
			{ name: 'Adobe Illustrator', icon: '✏️', color: '#FF9A00' },
			{ name: 'After Effects', icon: '🎞️', color: '#9999FF' },
			{ name: 'Adobe Premiere', icon: '▶️', color: '#FF0000' },
		],
	},
}

function TechEcosystem() {
	const [activeTab, setActiveTab] = useState('frontend')

	const tabs = [
		{ id: 'frontend', label: 'Frontend' },
		{ id: 'backend', label: 'Backend' },
		{ id: 'aiml', label: 'AI/ML' },
		{ id: 'design', label: 'Design' },
	]

	const currentTechs = techCategories[activeTab]?.technologies || []

	return (
		<section className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
			<div className="relative z-10">
				{/* Header */}
				<div className="mb-16 text-center">
					<h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
						Our Technical Ecosystem
					</h2>
					<p className="mt-4 text-lg leading-relaxed text-slate-400 max-w-2xl mx-auto">
						We leverage a world-class tech stack to build future-proof solutions.
					</p>
				</div>

				{/* Tab Switcher */}
				<div className="mb-12 flex justify-center">
					<div className="inline-flex gap-2 p-1.5 rounded-full bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition duration-300 ${
									activeTab === tab.id
										? 'text-white'
										: 'text-slate-400 hover:text-slate-300'
								}`}
								aria-selected={activeTab === tab.id}
								aria-label={`Switch to ${tab.label}`}
							>
								{/* Active Tab Marker */}
								{activeTab === tab.id && (
									<div
										className="absolute inset-0 rounded-full bg-slate-700/70"
										aria-hidden="true"
									/>
								)}
								<span className="relative">{tab.label}</span>
							</button>
						))}
					</div>
				</div>

				{/* Icons Grid Container */}
				<div className="relative mx-auto max-w-4xl p-8 pb-10 rounded-2xl border border-slate-700/30 bg-slate-900/20 backdrop-blur-xl overflow-visible">
					{/* Icons Grid */}
					<div className="relative z-10 flex flex-wrap justify-center gap-8 sm:gap-10">
						{currentTechs.map((tech, index) => (
							<div
								key={tech.name}
								className="tech-icon-wrapper group flex flex-col items-center"
								style={{
									animation: `tech-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 50}ms both`,
								}}
								role="img"
								aria-label={tech.name}
							>
								{/* Icon Container */}
								<div className="relative mb-3 flex items-center justify-center w-16 h-16 rounded-xl bg-slate-800/60 border border-slate-700/40 transition-all duration-300 group-hover:border-slate-500/70 group-hover:shadow-lg group-hover:shadow-slate-800/50">
									{/* Icon */}
									<span className="tech-icon text-3xl transition-colors duration-300">
										{tech.icon}
									</span>
								</div>

								{/* Tooltip */}
								<div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-3 py-1.5 rounded-md bg-slate-900/95 border border-slate-700/50 text-xs font-semibold text-slate-100 opacity-0 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:-bottom-12 whitespace-nowrap backdrop-blur-sm">
									{tech.name}
									{/* Tooltip Arrow */}
									<div
										className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-[5px] border-l-transparent border-r-transparent border-t-slate-900/95"
										aria-hidden="true"
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<style jsx>{`
				@keyframes tech-pop {
					0% {
						opacity: 0;
						transform: scale(0.5);
					}
					100% {
						opacity: 1;
						transform: scale(1);
					}
				}

				.tech-icon-wrapper .tech-icon {
					filter: grayscale(100%);
					transition: filter 0.3s ease;
				}

				.tech-icon-wrapper:hover .tech-icon {
					filter: grayscale(0%);
				}

				@media (max-width: 640px) {
					.inline-flex {
						overflow-x: auto;
						scroll-behavior: smooth;
						-webkit-overflow-scrolling: touch;
					}

					.inline-flex::-webkit-scrollbar {
						display: none;
					}
				}
			`}</style>
		</section>
	)
}

export default TechEcosystem
