import { useEffect, useRef } from 'react'

function ParticleBackground() {
    const sectionRef = useRef(null)
    const canvasRef = useRef(null)
    const animationFrameRef = useRef(null)
    const pointerRef = useRef({ x: -9999, y: -9999, active: false })

    useEffect(() => {
        const section = sectionRef.current
        const canvas = canvasRef.current
        if (!section || !canvas) return

        const context = canvas.getContext('2d')
        if (!context) return

        const nodes = []

        const createNodes = (width, height) => {
            nodes.length = 0
            const baseCount = width > 1024 ? 60 : width > 768 ? 44 : 28
            for (let i = 0; i < baseCount; i++) {
                nodes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.42,
                    vy: (Math.random() - 0.5) * 0.42,
                    radius: Math.random() * 1.8 + 1.2,
                })
            }
        }

        const resizeCanvas = () => {
            // Size canvas to section, not window
            canvas.width = section.offsetWidth
            canvas.height = section.offsetHeight
            createNodes(canvas.width, canvas.height)
        }

        const draw = () => {
            const width = canvas.width
            const height = canvas.height

            context.clearRect(0, 0, width, height)
            context.fillStyle = 'rgba(3, 7, 18, 0.2)'
            context.fillRect(0, 0, width, height)

            // Pointer coords are already canvas-relative (set in handlePointerMove)
            const { x: cx, y: cy, active } = pointerRef.current

            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i]
                node.x += node.vx
                node.y += node.vy

                if (node.x <= 0 || node.x >= width) node.vx *= -1
                if (node.y <= 0 || node.y >= height) node.vy *= -1

                // Node-to-node connections
                for (let j = i + 1; j < nodes.length; j++) {
                    const target = nodes[j]
                    const dx = node.x - target.x
                    const dy = node.y - target.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 145) {
                        const alpha = (1 - distance / 145) * 0.24
                        context.strokeStyle = `rgba(34, 211, 238, ${alpha})`
                        context.lineWidth = 1
                        context.beginPath()
                        context.moveTo(node.x, node.y)
                        context.lineTo(target.x, target.y)
                        context.stroke()
                    }
                }

                // Cursor-to-node connections
                if (active) {
                    const dx = node.x - cx
                    const dy = node.y - cy
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < 200) {
                        const alpha = (1 - dist / 200) * 0.6
                        context.strokeStyle = `rgba(56, 189, 248, ${alpha})`
                        context.lineWidth = 1.2
                        context.beginPath()
                        context.moveTo(node.x, node.y)
                        context.lineTo(cx, cy)
                        context.stroke()
                    }
                }

                // Draw particle
                context.beginPath()
                context.fillStyle = 'rgba(103, 232, 249, 0.82)'
                context.shadowColor = 'rgba(34, 211, 238, 0.72)'
                context.shadowBlur = 10
                context.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
                context.fill()
                context.shadowBlur = 0
            }

            // Draw cursor dot last (on top)
            if (active) {
                context.beginPath()
                context.arc(cx, cy, 2.5, 0, Math.PI * 2)
                context.fillStyle = 'rgba(56, 189, 248, 1)'
                context.fill()
            }

            animationFrameRef.current = requestAnimationFrame(draw)
        }

        const handlePointerMove = (e) => {
            // Convert to canvas-local coordinates here, once
            const rect = canvas.getBoundingClientRect()
            pointerRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                active: true,
            }
        }

        const handlePointerLeave = () => {
            pointerRef.current.active = false
        }

        resizeCanvas()
        draw()

        window.addEventListener('resize', resizeCanvas)
        window.addEventListener('pointermove', handlePointerMove)
        window.addEventListener('pointerleave', handlePointerLeave)

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('pointerleave', handlePointerLeave)
            cancelAnimationFrame(animationFrameRef.current)
        }
    }, [])

    return (
        <div ref={sectionRef} className="absolute inset-0 z-10 pointer-events-none">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    )
}

export default ParticleBackground