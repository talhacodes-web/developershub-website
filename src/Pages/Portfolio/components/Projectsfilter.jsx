import { LayoutGroup, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import ProjectsGallery from './ProjectsGallery'
import CaseStudyDrawer from './CaseStudyDrawer'
import quantumPayImg from '../../../assets/portfolio/Quantum-FinTech-App.png'
import orbitLedgerImg from '../../../assets/portfolio/Orbit-Ledger.png'
import novaAiImg from '../../../assets/portfolio/Nova-AI.png'
import synthOpsImg from '../../../assets/portfolio/Forecaster.png'
import auraCommerceImg from '../../../assets/portfolio/Aura.png'
import heliosSurfaceImg from '../../../assets/portfolio/Helios.png'

const projectData = [
	{
		id: 'quantum-pay',
		title: 'Quantum-Pay FinTech App',
		category: 'software',
		domain: 'Software Dev',
		summary: 'A secure, high-frequency payment gateway.',
		focus: 'Real-time transaction processing and end-to-end encryption architecture.',
		techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS KMS'],
		challenge: 'Scaling real-time payments to 10k transactions per second without dropping audit integrity or introducing visible latency spikes.',
		solution: 'Implemented a microservices architecture with event-driven processing, Redis-backed rate control, and hardened key management boundaries.',
		result: 'Achieved 99.99% uptime, cut end-to-end latency by 40%, and stabilized peak throughput during load surges.',
		metrics: [
			{ label: 'Peak throughput', value: '10k TPS' },
			{ label: 'Latency reduction', value: '40%' },
			{ label: 'Uptime', value: '99.99%' },
		],
		ctaLabel: 'Visit Live Site',
		ctaUrl: '#showcase-grid',
		glowColor: '#3b82f6',
		mockupBackground:
			'linear-gradient(155deg, rgba(14,165,233,0.85), rgba(37,99,235,0.66) 42%, rgba(15,23,42,0.95) 90%), radial-gradient(circle at 22% 22%, rgba(191,219,254,0.55), transparent 48%)',
		mockupImage: quantumPayImg,
	},
	{
		id: 'orbit-ledger',
		title: 'Orbit Ledger Core',
		category: 'software',
		domain: 'Software Dev',
		summary: 'Enterprise-grade accounting automation.',
		focus: 'Distributed ledger processing with auditability layers for regulated industries.',
		techStack: ['TypeScript', 'Kafka', 'Redis', 'Terraform'],
		challenge: 'Modernizing a finance back office that depended on batch exports and manual reconciliation across multiple ledgers.',
		solution: 'Designed an event-driven ledger core with append-only audit logs, async workers, and infrastructure-as-code for repeatable rollouts.',
		result: 'Reduced reconciliation time by 68%, improved traceability across every transaction, and simplified compliance reviews.',
		metrics: [
			{ label: 'Reconciliation time', value: '-68%' },
			{ label: 'Audit traceability', value: '100%' },
			{ label: 'Rollout speed', value: '3x faster' },
		],
		ctaLabel: 'View Repository',
		ctaUrl: '#showcase-grid',
		glowColor: '#2563eb',
		mockupBackground:
			'linear-gradient(160deg, rgba(30,64,175,0.86), rgba(59,130,246,0.58) 44%, rgba(15,23,42,0.95) 92%), radial-gradient(circle at 74% 26%, rgba(147,197,253,0.48), transparent 45%)',
		mockupImage: orbitLedgerImg,
	},
	{
		id: 'nova-ai',
		title: 'Nova-AI Content Engine',
		category: 'ai',
		domain: 'AI Solutions',
		summary: 'Generative AI platform for enterprise scale.',
		focus: 'Custom LLM fine-tuning and automated multi-channel content workflows.',
		techStack: ['Python', 'OpenAI', 'LangChain', 'Pinecone'],
		challenge: 'Teams needed a reliable way to turn a single source brief into compliant content across multiple channels without manual rewriting.',
		solution: 'Built a prompt orchestration layer with retrieval-augmented generation, review gates, and vector search for brand context.',
		result: 'Accelerated content delivery by 55% and improved consistency across product, marketing, and support outputs.',
		metrics: [
			{ label: 'Delivery speed', value: '+55%' },
			{ label: 'Brand consistency', value: 'High' },
			{ label: 'Context recall', value: 'Vectorized' },
		],
		ctaLabel: 'Visit Live Site',
		ctaUrl: '#showcase-grid',
		glowColor: '#8b5cf6',
		mockupBackground:
			'linear-gradient(150deg, rgba(126,34,206,0.9), rgba(168,85,247,0.56) 40%, rgba(15,23,42,0.96) 90%), radial-gradient(circle at 24% 74%, rgba(221,214,254,0.46), transparent 48%)',
		mockupImage: novaAiImg,
	},
	{
		id: 'synth-ops',
		title: 'Synth-Ops Forecaster',
		category: 'ai',
		domain: 'AI Solutions',
		summary: 'Predictive operations intelligence layer.',
		focus: 'Hybrid time-series models and adaptive retraining pipelines for logistics teams.',
		techStack: ['PyTorch', 'Airflow', 'FastAPI', 'GCP'],
		challenge: 'Operations teams lacked a dependable signal for forecasting delay risk across fast-moving logistics routes.',
		solution: 'Combined time-series modeling, scheduled retraining, and low-latency inference APIs to surface predictions in real time.',
		result: 'Improved forecast accuracy, reduced firefighting work, and gave planners a much earlier view into route volatility.',
		metrics: [
			{ label: 'Forecast accuracy', value: '+23%' },
			{ label: 'Alert lead time', value: '2.4x' },
			{ label: 'Retrain cadence', value: 'Daily' },
		],
		ctaLabel: 'View Repository',
		ctaUrl: '#showcase-grid',
		glowColor: '#9333ea',
		mockupBackground:
			'linear-gradient(150deg, rgba(107,33,168,0.88), rgba(124,58,237,0.54) 44%, rgba(15,23,42,0.96) 92%), radial-gradient(circle at 76% 20%, rgba(216,180,254,0.44), transparent 42%)',
		mockupImage: synthOpsImg,
	},
	{
		id: 'aura-commerce',
		title: 'Aura E-Commerce',
		category: 'digital',
		domain: 'Digital Services',
		summary: 'Immersive 3D shopping experience.',
		focus: 'High-end 3D visual rendering and conversion-optimized UX architecture.',
		techStack: ['Three.js', 'Next.js', 'Stripe', 'Vercel'],
		challenge: 'The shopping experience needed a more immersive product story that still converted cleanly on mobile and desktop.',
		solution: 'Built a motion-led storefront with lightweight 3D rendering, streamlined checkout, and fast edge deployment.',
		result: 'Increased engagement depth and helped the product pages feel premium without sacrificing performance.',
		metrics: [
			{ label: 'Engagement depth', value: '+31%' },
			{ label: 'Checkout friction', value: 'Lower' },
			{ label: 'Launch speed', value: 'Edge-ready' },
		],
		ctaLabel: 'Visit Live Site',
		ctaUrl: '#showcase-grid',
		glowColor: '#06b6d4',
		mockupBackground:
			'linear-gradient(145deg, rgba(8,145,178,0.86), rgba(14,116,144,0.58) 45%, rgba(15,23,42,0.95) 90%), radial-gradient(circle at 18% 22%, rgba(165,243,252,0.44), transparent 48%)',
		mockupImage: auraCommerceImg,
	},
	{
		id: 'helios-brand-surface',
		title: 'Helios Digital Surface',
		category: 'digital',
		domain: 'Digital Services',
		summary: 'Immersive product storytelling stack.',
		focus: 'Motion-first frontends and narrative systems tuned for retention and conversion.',
		techStack: ['Framer Motion', 'Figma', 'WebGL', 'Cloudflare'],
		challenge: 'The brand needed a more cinematic surface that still stayed lightweight and conversion-focused.',
		solution: 'Crafted a motion system with layered visual hierarchy, reusable sections, and edge-cached delivery.',
		result: 'Delivered a premium feel, faster perceived load, and a clearer path from story to action.',
		metrics: [
			{ label: 'Perceived load', value: 'Faster' },
			{ label: 'Retention', value: 'Upward' },
			{ label: 'Experience score', value: 'Premium' },
		],
		ctaLabel: 'View Repository',
		ctaUrl: '#showcase-grid',
		glowColor: '#14b8a6',
		mockupBackground:
			'linear-gradient(155deg, rgba(15,118,110,0.9), rgba(20,184,166,0.52) 40%, rgba(15,23,42,0.94) 88%), radial-gradient(circle at 80% 70%, rgba(153,246,228,0.4), transparent 45%)',
		mockupImage: heliosSurfaceImg,
	},
]

const categories = [
	{ id: 'all', label: 'All Projects' },
	{ id: 'software', label: 'Software Dev' },
	{ id: 'ai', label: 'AI Solutions' },
	{ id: 'digital', label: 'Digital Creative' },
]

function Projectsfilter() {
	const [activeCategory, setActiveCategory] = useState('all')
	const [selectedProject, setSelectedProject] = useState(null)

	const categoryCounts = useMemo(() => {
		return {
			all: projectData.length,
			software: projectData.filter((project) => project.category === 'software').length,
			ai: projectData.filter((project) => project.category === 'ai').length,
			digital: projectData.filter((project) => project.category === 'digital').length,
		}
	}, [])

	const filteredProjects = useMemo(() => {
		if (activeCategory === 'all') {
			return projectData
		}

		return projectData.filter((project) => project.category === activeCategory)
	}, [activeCategory])

	useEffect(() => {
		if (selectedProject && !filteredProjects.some((project) => project.id === selectedProject.id)) {
			setSelectedProject(null)
		}
	}, [filteredProjects, selectedProject])

	return (
		<section id="showcase-grid" className="mx-auto w-full max-w-6xl px-6 pb-20 sm:px-8 lg:px-10 lg:pb-24">
			<div className="text-center">
				<p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/80">Project Gallery</p>
				<h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Filterable Project Grid</h2>
			</div>

			<LayoutGroup>
				<div className="mt-8 flex justify-center">
					<div className="portfolio-filter-scroll relative w-full max-w-3xl overflow-x-auto rounded-2xl border border-white/12 bg-slate-900/40 p-2 backdrop-blur-md [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
						<div className="inline-flex min-w-max items-center gap-2">
							{categories.map((category) => {
								const isActive = activeCategory === category.id
								return (
									<button
										key={category.id}
										type="button"
										onClick={() => setActiveCategory(category.id)}
										className={`relative rounded-xl px-4 py-2.5 text-sm transition duration-300 sm:px-5 ${
											isActive
												? 'font-semibold text-white'
												: 'font-medium text-slate-300/75 hover:text-slate-100 hover:drop-shadow-[0_0_10px_rgba(129,140,248,0.26)]'
										}`}
									>
										{isActive && (
											<motion.span
												layoutId="portfolio-filter-pill"
												className="absolute inset-0 -z-10 rounded-xl bg-linear-to-r from-indigo-600/85 via-violet-600/85 to-blue-600/85 shadow-[0_0_20px_rgba(99,102,241,0.45)]"
												transition={{ type: 'spring', bounce: 0.28, duration: 0.55 }}
											/>
										)}
										<span>{category.label}</span>
										<span className={`ml-1.5 text-xs ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
											({categoryCounts[category.id]})
										</span>
									</button>
								)
							})}
						</div>
					</div>
				</div>

				<ProjectsGallery projects={filteredProjects} onViewDetails={setSelectedProject} />
				<CaseStudyDrawer project={selectedProject} open={Boolean(selectedProject)} onClose={() => setSelectedProject(null)} />
			</LayoutGroup>
		</section>
	)
}

export default Projectsfilter
