'use client'

import { useState, useEffect, useRef } from 'react'
import { STOPS } from './road-journey'

// ─── DATA ───
const SKILLS = [
    { name: 'React.js / Next.js', level: 88, color: '#61DAFB' },
    { name: 'Laravel / PHP', level: 85, color: '#FF2D20' },
    { name: 'Node.js / Express', level: 82, color: '#68A063' },
    { name: 'JavaScript / HTML / CSS', level: 90, color: '#F7DF1E' },
    { name: 'MySQL / Cloud SQL', level: 84, color: '#4479A1' },
    { name: 'MongoDB / Firebase', level: 78, color: '#47A248' },
    { name: 'Google Cloud / RBAC', level: 75, color: '#4285F4' },
    { name: 'GitHub / Figma', level: 86, color: '#F05032' },
]

const WORK = [
    { org: 'Lightweight Solutions', role: 'Full-Stack Developer | Internship 2', duration: 'March – May 2026', desc: 'Working on a modern SaaS project using React and Python. Building scalable full-stack features and high-performance digital solutions.' },
    { org: 'Creciendo Philippines', role: 'Web Developer | Internship 1', duration: 'Nov 2025 – Feb 2026', desc: 'Developed backend systems with Express.js and MongoDB. Optimized APIs for 400+ hours of performance-focused development.' },
    { org: 'AWS Cloud Clubs', role: 'Skill Development Office', duration: 'Mar 2025 – Present', desc: 'Facilitating cloud-focused workshops and learning sessions for IT students at National University.' },
    { org: "Executive Secretary's Office", role: 'Core Team Member', duration: '2023–2024', desc: 'Managed student group communications and organized key campus events.' },
]

const PROJECTS = [
    { title: 'BaryoConnect', desc: 'Project Manager & Paper Presenter at IRCITE 2025. Focused on community engagement and local governance.', tech: ['Flutter', 'Firebase'], badge: '🏆 IRCITE 2025', img: '/images/15.webp' },
    { title: 'DialiEase', desc: 'Digital monitoring for home-based dialysis. Specialization in mobile and web app development.', tech: ['React.js', 'Laravel', 'Google Cloud'], badge: '🎓 Capstone Project', img: '/images/11.webp' },
    { title: 'Event Ecosystem', desc: 'Unified venue rental system with billing and payments. Officially published academic research.', tech: ['Billing', 'Inventory'], badge: '📚 Published Research', img: '/images/paper.webp' },
    { title: 'Drug Store POS', desc: 'Business system for pharmacies to track sales and manage medicine stock.', tech: ['PHP', 'MySQL'], badge: '📦 Business App', img: '/images/POS2.webp' },
    { title: 'Tutorial Center', desc: 'Online school platform where students can track their learning progress.', tech: ['PHP', 'MySQL'], badge: '📚 Learning Tool', img: '/images/tutorial.webp' },
    { title: 'IRCITE Certificate', desc: 'Certificate for participation and paper presentation at the IRCITE 2025 International Research Conference.', tech: ['Research', 'Presentation'], badge: '📜 Certification', img: '/images/Ircite.webp' },
]

const HOBBIES = [
    { title: 'PingMe', desc: 'A modern real-time messaging application with sleek UI/UX.', tech: ['React', 'Tailwind'], img: '/images/PingMe.webp', url: 'https://ping-me-seven-vert.vercel.app/' },
    { title: 'Hello word - goosebumps', desc: 'An immersive digital experience exploring spooky typography.', tech: ['React', 'Tailwind'], img: '/images/Hello word - goosebumps.webp', url: 'https://hello-world-gamma-plum.vercel.app/' },
    { title: 'Birthday - Star Alert!', tech: ['React', 'Tailwind'], img: '/images/Birthday - Star Alert!.webp', url: 'https://happy-b-day-murex.vercel.app/', desc: 'A celebratory interactive card with floating particle effects.' },
]

const SOCIALS = [
    { url: 'https://github.com/Hannahjamilla', label: 'GitHub' },
    { url: 'https://www.linkedin.com/in/hannah-jamilla-9277a5337', label: 'LinkedIn' },
    { url: 'https://www.facebook.com/share/15r8QNkywy/', label: 'Facebook' },
    { url: 'https://www.instagram.com/hjdrp_', label: 'Instagram' },
]

const RANGES = [[0, 0.22], [0.22, 0.38], [0.38, 0.54], [0.54, 0.72], [0.72, 0.85], [0.85, 0.95], [0.95, 1.0]]

// ─── HELPERS ───
function Counter({ target, duration = 1500 }) {
    const [val, setVal] = useState(0)
    useEffect(() => {
        let start = 0
        const step = target / (duration / 16)
        const id = setInterval(() => { start += step; if (start >= target) { setVal(target); clearInterval(id) } else setVal(Math.floor(start)) }, 16)
        return () => clearInterval(id)
    }, [target, duration])
    return <span>{val}</span>
}

function Typewriter({ text, speed = 40 }) {
    const [shown, setShown] = useState('')
    useEffect(() => {
        setShown('')
        let i = 0
        const id = setInterval(() => { i++; setShown(text.slice(0, i)); if (i >= text.length) clearInterval(id) }, speed)
        return () => clearInterval(id)
    }, [text, speed])
    return <>{shown}<span style={{ opacity: 0.5, animation: 'blink 0.8s infinite' }}>|</span></>
}

// ─── COMPONENTS ───

function HeroStop({ visible, scrollProgress }) {
    const [timedOut, setTimedOut] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setTimedOut(true), 4500)
        return () => clearTimeout(timer)
    }, [])

    // Elegant fade/slide based on initial scroll or timeout
    const exitFactor = Math.min(scrollProgress / 0.08, 1);
    const baseOpacity = visible ? (1 - exitFactor) : 0;
    const opacity = timedOut ? 0 : baseOpacity;
    const translateY = -exitFactor * 100;

    return (
        <div className={`stop-panel hero-panel ${visible ? 'is-visible' : ''}`} style={{
            opacity: opacity,
            transform: `translateY(${translateY}px)`,
            zIndex: 1000,
            pointerEvents: visible && !timedOut ? 'auto' : 'none',
            visibility: visible && !timedOut ? 'visible' : 'hidden'
        }}>
            {/* Top Status Bar */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 80,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px',
                transform: `translateY(${-exitFactor * 50}px)`, opacity: 1 - exitFactor
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                    <div style={{ width: 6, height: 6, background: '#E63946', borderRadius: '50%', boxShadow: '0 0 10px #E63946' }} />
                    <div style={{ color: '#E63946', fontWeight: 950, fontSize: '0.75rem', letterSpacing: 3 }}>DRIVE_READY</div>
                </div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700, fontSize: '0.65rem', letterSpacing: 2 }}>
                    HJ_V2.0 // PORTFOLIO_PROTOCOL_ACTIVE
                </div>
            </div>

            {/* Vertical Sidebar */}
            <div style={{
                position: 'absolute', right: 40, top: '50%', transform: `translateY(-50%) translateX(${exitFactor * 50}px)`,
                display: 'flex', flexDirection: 'column', gap: 20, opacity: (1 - exitFactor) * 0.3
            }}>
                {['P_01', 'P_02', 'P_03', 'P_04'].map(p => (
                    <div key={p} style={{ fontSize: '0.65rem', fontWeight: 900, transform: 'rotate(90deg)' }}>{p}</div>
                ))}
            </div>

            <div style={{
                textAlign: 'center', color: '#fff',
                position: 'relative', padding: '100px'
            }}>
                {/* Targeting Reticle */}
                <div style={{ position: 'absolute', inset: 0, animation: 'rotate 20s linear infinite', opacity: (1 - exitFactor) * 0.2 }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: 60, height: 60, borderTop: '2px solid #fff', borderLeft: '2px solid #fff' }} />
                    <div style={{ position: 'absolute', top: 0, right: 0, width: 60, height: 60, borderTop: '2px solid #fff', borderRight: '2px solid #fff' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: 60, height: 60, borderBottom: '2px solid #fff', borderLeft: '2px solid #fff' }} />
                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: 60, height: 60, borderBottom: '2px solid #fff', borderRight: '2px solid #fff' }} />
                </div>

                <h1 className="hero-title" style={{
                    fontSize: 'clamp(2.5rem, 12vw, 10rem)', marginBottom: 0,
                    textTransform: 'uppercase', lineHeight: 0.85,
                    animation: 'float 6s ease-in-out infinite',
                    position: 'relative'
                }}>
                    <span style={{ fontWeight: 200, color: '#fff' }}>Hannah</span> <br />
                    <span style={{ fontWeight: 950, color: '#E63946' }}>JAMILLA</span>

                    {/* Scanning Beam */}
                    <div style={{
                        position: 'absolute', left: '-20%', right: '-20%', height: '2px', background: 'rgba(255,255,255,0.3)',
                        top: '50%', boxShadow: '0 0 20px rgba(255,255,255,0.5)', animation: 'beam 4s ease-in-out infinite',
                        opacity: 1 - exitFactor
                    }} />
                </h1>

                <div style={{
                    marginTop: 50, display: 'flex', flexDirection: 'column', alignItems: 'center',
                    opacity: 1 - exitFactor
                }}>
                    <div style={{
                        padding: '12px 32px', border: '1px solid rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', gap: 20
                    }}>
                        <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>DATA_FEED</div>
                        <div style={{ width: 1, height: 15, background: 'rgba(255,255,255,0.2)' }} />
                        <div style={{ fontSize: '0.85rem', fontWeight: 900, letterSpacing: 4 }}>
                            {visible ? <Typewriter text="VELOCITY: 000 KM/H // STATUS: STANDBY" speed={40} /> : ''}
                        </div>
                    </div>

                    <div style={{ marginTop: 80, display: 'flex', alignItems: 'center', gap: 20, opacity: 0.5 }}>
                        <div style={{ width: 40, height: 1, background: '#fff' }} />
                        <div style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: 4 }}>SCROLL_TO_DRIVE</div>
                        <div style={{ width: 40, height: 1, background: '#fff' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function AboutStop({ visible, onImageClick }) {
    return (
        <div className={`stop-panel about-panel ${visible ? 'is-visible' : ''}`}>
            <div className="panel-box" style={{
                background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', color: '#333', borderRadius: 12, padding: '32px',
                border: '4px solid #fff', boxShadow: '0 30px 60px rgba(0,0,0,0.4), inset 0 0 20px rgba(0,0,0,0.05)',
                fontFamily: "'Inter', sans-serif", position: 'relative', overflow: 'hidden'
            }}>
                {/* Decorative hologram-ish strip */}
                <div style={{ position: 'absolute', right: -20, top: 0, bottom: 0, width: 80, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)', transform: 'skewX(-20deg)', pointerEvents: 'none' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ background: '#E63946', color: '#fff', fontSize: '0.7rem', fontWeight: 900, padding: '4px 12px', borderRadius: 4, letterSpacing: 1 }}>DRIVER LICENSE</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.6, fontWeight: 800 }}>LICENSE NO: 0824-HJP-2026</div>
                </div>

                <div className="id-card-content" style={{ display: 'flex', gap: 30 }}>
                    <div
                        onClick={() => onImageClick('/images/hannah-formal.webp')}
                        className="id-photo"
                        style={{
                            width: 160, height: 200, background: '#444', borderRadius: 10, overflow: 'hidden',
                            border: '3px solid rgba(0,0,0,0.1)', position: 'relative', flexShrink: 0,
                            cursor: 'zoom-in', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                        }}
                    >
                        <img src="/images/hannah-formal.webp" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Hannah" />
                        <div style={{ position: 'absolute', top: 8, right: 8, width: 40, height: 40, border: '1px solid rgba(255,255,255,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', transform: 'rotate(-20deg)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(2px)' }}>HJP</div>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '20%', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)', animation: 'scan 4s infinite linear' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ marginBottom: 12 }}>
                            <div style={{ fontSize: '0.55rem', color: '#666', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 800 }}>Full Name</div>
                            <div style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: -0.5, lineHeight: 1, color: '#1a1a1a' }}>HANNAH JAMILLA PERALTA</div>
                        </div>
                        <div style={{ marginBottom: 12 }}>
                            <div style={{ fontSize: '0.55rem', color: '#666', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 800 }}>Summary</div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.5, color: '#333' }}>Passionate about creating practical digital solutions that improve accessibility and community connection.</div>
                        </div>
                        <div style={{ marginBottom: 12 }}>
                            <div style={{ fontSize: '0.55rem', color: '#666', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 800 }}>Education & Honors</div>
                            <div style={{ fontSize: '1rem', fontWeight: 900, color: '#000' }}>National University - Bulacan </div>
                            <div className="badges-row" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#E63946', display: 'flex', gap: 8, marginTop: 2, flexWrap: 'wrap' }}>
                                <span>BSIT</span>
                                <span style={{ opacity: 0.3 }}>|</span>
                                <span>Dean's List Awardee</span>
                                <span style={{ opacity: 0.3 }}>|</span>
                                <span>Loyalty Award</span>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                            <div>
                                <div style={{ fontSize: '0.55rem', color: '#666', textTransform: 'uppercase', letterSpacing: 1 }}>From</div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 900 }}>Bulacan, Philippines</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.55rem', color: '#666', textTransform: 'uppercase', letterSpacing: 1 }}>Professional Class</div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#2A9D8F' }}>FULL-STACK DEV</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Holographic Seal */}
                <div className="holo-seal" style={{
                    position: 'absolute', bottom: 70, right: 30, width: 70, height: 70,
                    borderRadius: '50%', border: '1px solid rgba(0,0,0,0.1)',
                    background: 'linear-gradient(45deg, #FFD700, #FFF, #FFD700, #FFF)',
                    backgroundSize: '400% 400%', animation: 'hologram 10s infinite',
                    opacity: 0.4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 900, color: '#000', mixBlendMode: 'overlay', textAlign: 'center', padding: 5
                }}>NU SEAL OF EXCELLENCE</div>

                <div className="footer-row" style={{ marginTop: 25, borderTop: '2px solid rgba(0,0,0,0.15)', paddingTop: 15, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <div style={{ fontSize: '0.5rem', color: '#666', textTransform: 'uppercase', letterSpacing: 1 }}>Issued / Expiry Date</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 900 }}>APR 25, 2026 / PERMANENT RESIDENCY</div>
                    </div>
                    <div className="signature-box" style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.1rem', fontFamily: "'Courier New', monospace", fontWeight: 900, opacity: 0.85, fontStyle: 'italic', marginBottom: -5 }}>Hannah Jamilla Peralta</div>
                        <div style={{ fontSize: '0.5rem', color: '#666', textTransform: 'uppercase', letterSpacing: 1 }}>VERIFIED DIGITAL SIGNATURE</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SkillsStop({ visible }) {
    return (
        <div className={`stop-panel skills-panel ${visible ? 'is-visible' : ''}`}>
            <div className="panel-box" style={{
                background: '#006847', border: '6px solid #fff', borderRadius: 8, padding: '30px',
                color: '#fff', fontFamily: "'Inter', sans-serif", boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                position: 'relative'
            }}>
                {/* Sign Screws */}
                {[0, 1, 2, 3].map(i => (
                    <div key={i} style={{
                        position: 'absolute',
                        top: i < 2 ? 10 : 'auto', bottom: i >= 2 ? 10 : 'auto',
                        left: i % 2 === 0 ? 10 : 'auto', right: i % 2 !== 0 ? 10 : 'auto',
                        width: 8, height: 8, background: '#aaa', borderRadius: '50%',
                        boxShadow: 'inset 2px 2px 2px rgba(0,0,0,0.3)'
                    }} />
                ))}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, borderBottom: '3px solid #fff', paddingBottom: 15 }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: 1, textTransform: 'uppercase' }}>My Technical Skills</div>
                    <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                        <div style={{ width: 20, height: 20, background: '#fff', color: '#006847', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900 }}>1</div>
                    </div>
                </div>

                <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 15 }}>
                    {SKILLS.map(({ name }, i) => (
                        <div key={name} style={{
                            background: 'linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))',
                            padding: '14px 18px', borderRadius: 4,
                            borderLeft: '5px solid #fff', color: '#fff', fontSize: '0.8rem', fontWeight: 900,
                            textTransform: 'uppercase', letterSpacing: 1.5, display: 'flex', alignItems: 'center', gap: 10,
                            boxShadow: '2px 4px 10px rgba(0,0,0,0.2)', transition: 'transform 0.3s ease'
                        }}>
                            <div style={{ width: 6, height: 6, background: '#fff', borderRadius: '50%', opacity: 0.8 }} />
                            {name}
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 25, display: 'flex', justifyContent: 'center', gap: 20 }}>
                    <div style={{ fontSize: '0.6rem', fontWeight: 900, background: '#fff', color: '#006847', padding: '4px 12px', borderRadius: 4 }}>GAS NEXT EXIT</div>
                    <div style={{ fontSize: '0.6rem', fontWeight: 900, background: '#fff', color: '#006847', padding: '4px 12px', borderRadius: 4 }}>FOOD 24H</div>
                </div>
            </div>
        </div>
    )
}

function WorkStop({ visible }) {
    return (
        <div className={`stop-panel work-panel ${visible ? 'is-visible' : ''}`}>
            <div className="panel-box" style={{
                background: '#FF8C00', padding: '30px', borderRadius: '4px', color: '#000',
                boxShadow: '10px 10px 0 rgba(0,0,0,0.2)', position: 'relative', textAlign: 'left',
                border: '8px solid #000', borderStyle: 'double'
            }}>
                <div style={{ position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)', background: '#000', color: '#FF8C00', padding: '4px 15px', fontWeight: 900, fontSize: '0.7rem', borderRadius: 4 }}>CAUTION</div>

                <div style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: 20, borderBottom: '4px solid #000', paddingBottom: 5, letterSpacing: -1 }}>WORK RECORD AHEAD</div>

                {WORK.map((w, i) => (
                    <div key={i} style={{ marginBottom: 15, paddingLeft: 15, borderLeft: '4px solid #000' }}>
                        <div style={{ fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase' }}>{w.org}</div>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.8 }}>{w.role} | {w.duration}</div>
                        <div style={{ fontSize: '0.65rem', fontWeight: 500, lineHeight: 1.4, marginTop: 4 }}>{w.desc}</div>
                    </div>
                ))}

                <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
                    <div style={{ width: 12, height: 12, background: '#000', borderRadius: '50%' }} />
                    <div style={{ width: 12, height: 12, background: '#000', borderRadius: '50%' }} />
                    <div style={{ width: 12, height: 12, background: '#000', borderRadius: '50%' }} />
                </div>
            </div>
        </div>
    )
}

function ProjectsStop({ visible, onImageClick }) {
    return (
        <div className={`stop-panel projects-panel ${visible ? 'is-visible' : ''}`}>
            <div className="panel-box" style={{
                background: 'rgba(15, 15, 15, 0.95)', border: '2px solid #FFD700', borderRadius: 16, padding: '25px',
                boxShadow: '0 0 50px rgba(255,215,0,0.2)', position: 'relative', backdropFilter: 'blur(15px)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ color: '#FFD700', fontWeight: 900, fontSize: '1.2rem', letterSpacing: 2, textShadow: '0 0 10px #FFD700' }}>ACADEMIC ARCHIVES</div>
                </div>

                <div className="projects-grid" style={{
                    display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 15,
                }}>
                    {PROJECTS.map((p, i) => (
                        <div key={i} className="project-card" style={{
                            background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '15px', color: '#fff',
                            border: '1px solid rgba(255,215,0,0.15)', display: 'flex', gap: 15,
                            minHeight: 120, position: 'relative', overflow: 'hidden',
                            boxShadow: 'inset 0 0 15px rgba(255,215,0,0.05)'
                        }}>
                            {/* Animated Corner Border */}
                            <div style={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20, borderTop: '2px solid #FFD700', borderLeft: '2px solid #FFD700', opacity: 0.4 }} />

                            <div
                                onClick={() => onImageClick(p.img)}
                                className="project-thumb"
                                style={{
                                    width: 100, height: '100%', background: '#000', borderRadius: 6, overflow: 'hidden',
                                    flexShrink: 0, border: '1px solid rgba(255,215,0,0.3)',
                                    cursor: 'zoom-in', position: 'relative'
                                }}
                            >
                                <img src={p.img} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} alt={p.title} />
                                {/* Scanning Bar */}
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#FFD700', boxShadow: '0 0 10px #FFD700', opacity: 0.5, animation: 'scan 3s infinite linear' }} />
                            </div>
                            <div className="project-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
                                <div style={{ fontSize: '0.5rem', fontWeight: 900, color: '#FFD700', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 1.5 }}>{p.badge}</div>
                                <div style={{ fontWeight: 900, fontSize: '0.95rem', marginBottom: 4, color: '#fff', lineHeight: 1.1, textShadow: '0 0 10px rgba(255,215,0,0.2)' }}>{p.title}</div>
                                <p style={{ fontSize: '0.62rem', opacity: 0.8, lineHeight: 1.3, margin: 0, fontWeight: 500 }}>{p.desc}</p>
                                <div className="tech-tags-row" style={{ marginTop: 8, display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {p.tech.map(t => (
                                        <span key={t} style={{ fontSize: '0.45rem', color: '#FFD700', background: 'rgba(255,215,0,0.08)', padding: '2px 6px', borderRadius: 2, border: '1px solid rgba(255,215,0,0.2)', fontWeight: 800 }}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function HobbiesStop({ visible, onImageClick }) {
    return (
        <div className={`stop-panel hobbies-panel ${visible ? 'is-visible' : ''}`}>
            <div className="panel-box" style={{
                background: 'rgba(5, 10, 15, 0.95)', border: '1px solid rgba(0, 245, 255, 0.3)',
                borderRadius: 16, padding: '30px', color: '#fff', backdropFilter: 'blur(30px)',
                boxShadow: '0 0 50px rgba(0, 245, 255, 0.1)', position: 'relative'
            }}>
                <div style={{ position: 'absolute', top: -15, left: 30, background: '#00F5FF', color: '#000', padding: '4px 15px', fontWeight: 950, fontSize: '0.6rem', borderRadius: 4, letterSpacing: 2 }}>EXPERIMENTAL ZONE</div>
                
                <div style={{ marginBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 15 }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 950, letterSpacing: -0.5, margin: 0 }}>SIDE VENTURES</h2>
                    <p style={{ color: '#00F5FF', fontSize: '0.7rem', fontWeight: 700, margin: '2px 0 0 0', opacity: 0.8 }}>Digital Sketches // After-Hours Experiments</p>
                </div>

                <div className="hobbies-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
                    {HOBBIES.map((p, i) => (
                        <div key={i} style={{
                            background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '12px', color: '#fff',
                            border: '1px solid rgba(0, 245, 255, 0.1)', display: 'flex', gap: 15,
                            transition: 'all 0.3s ease', cursor: 'default', position: 'relative', overflow: 'hidden'
                        }} className="hobby-card-mini">
                            <div 
                                onClick={() => onImageClick(p.img)}
                                style={{ 
                                    width: 80, height: 80, background: '#000', borderRadius: 8, overflow: 'hidden', 
                                    flexShrink: 0, border: '1px solid rgba(0, 245, 255, 0.2)',
                                    cursor: 'zoom-in', position: 'relative'
                                }}
                            >
                                 <img src={p.img} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} alt={p.title} />
                                 <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
                            </div>
                            <div className="hobby-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ fontWeight: 900, fontSize: '0.9rem', marginBottom: 2 }}>{p.title}</div>
                                <p style={{ fontSize: '0.6rem', opacity: 0.6, margin: 0, lineHeight: 1.3, height: 32, overflow: 'hidden' }}>{p.desc}</p>
                                <div className="hobby-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                                    <div style={{ display: 'flex', gap: 4 }}>
                                        {p.tech.slice(0, 2).map(t => (
                                            <span key={t} style={{ fontSize: '0.45rem', background: 'rgba(0, 245, 255, 0.1)', color: '#00F5FF', padding: '1px 5px', borderRadius: 2, fontWeight: 700 }}>{t}</span>
                                        ))}
                                    </div>
                                    <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
                                        fontSize: '0.55rem', color: '#00F5FF', textDecoration: 'none', fontWeight: 900, border: '1px solid #00F5FF', padding: '2px 8px', borderRadius: 4, transition: 'all 0.2s'
                                    }} onMouseEnter={e => {e.target.style.background='#00F5FF'; e.target.style.color='#000'}} onMouseLeave={e => {e.target.style.background='transparent'; e.target.style.color='#00F5FF'}}>OPEN LIVE</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 25, display: 'flex', alignItems: 'center', gap: 10, opacity: 0.4 }}>
                    <div style={{ width: 6, height: 6, background: '#00F5FF', borderRadius: '50%', animation: 'blink 2s infinite' }} />
                    <div style={{ fontSize: '0.55rem', fontWeight: 900, letterSpacing: 2, color: '#00F5FF' }}>
                        STATUS: CONTINUOUS_EXPLORATION // MORE_PROJECTS_UNDER_CONSTRUCTION
                    </div>
                </div>
            </div>
            <style jsx>{`
                .hobby-card-mini:hover {
                    background: rgba(255,255,255,0.06);
                    border-color: rgba(0, 245, 255, 0.4);
                    transform: translateX(5px);
                }
            `}</style>
        </div>
    )
}

function ContactStop({ visible, onRestart }) {
    return (
        <div className={`stop-panel contact-panel ${visible ? 'is-visible' : ''}`}>
            {/* Mission Data Floating Above */}
            <div style={{ position: 'absolute', top: -40, left: 20, color: 'rgba(230, 57, 70, 0.6)', fontSize: '0.6rem', fontWeight: 900, letterSpacing: 3, whiteSpace: 'nowrap' }}>
                MISSION_DURATION: 00:04:21 // FUEL: 12%
            </div>
            <div style={{ position: 'absolute', top: -40, right: 20, color: 'rgba(230, 57, 70, 0.6)', fontSize: '0.6rem', fontWeight: 900, letterSpacing: 3, textAlign: 'right' }}>
                LOC: 14.8511° N, 120.8161° E
            </div>

            <div className="panel-box" style={{
                background: 'rgba(10, 10, 10, 0.95)', backdropFilter: 'blur(30px)', borderRadius: 24, padding: '40px',
                color: '#fff', textAlign: 'left', maxWidth: 420, border: '1px solid rgba(230, 57, 70, 0.4)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.7), 0 0 30px rgba(230, 57, 70, 0.15)',
                fontFamily: "'Inter', sans-serif", position: 'relative', overflow: 'hidden'
            }}>
                {/* Holographic Scanline */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'rgba(230, 57, 70, 0.3)', boxShadow: '0 0 15px #E63946', animation: 'scan 4s infinite linear', opacity: 0.5 }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 10, height: 10, background: '#E63946', borderRadius: '50%', boxShadow: '0 0 10px #E63946', animation: 'blink 1s infinite' }} />
                        <div style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: 3, color: '#E63946', textTransform: 'uppercase' }}>Secure Connection Active</div>
                    </div>
                    {/* Signal Bars */}
                    <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end' }}>
                        {[8, 12, 16, 20].map((h, i) => <div key={i} style={{ width: 3, height: h, background: i < 3 ? '#E63946' : 'rgba(255,255,255,0.2)', borderRadius: 1 }} />)}
                    </div>
                </div>

                <h2 className="contact-title" style={{ fontSize: '2.4rem', fontWeight: 950, marginBottom: 8, letterSpacing: -1.5, lineHeight: 1 }}>Let's <span style={{ color: '#E63946' }}>Connect!</span></h2>
                <p style={{ opacity: 0.5, fontSize: '0.9rem', marginBottom: 30, fontWeight: 500, lineHeight: 1.6 }}>The road ends here, but our collaboration doesn't have to. Reach out via any of the channels below.</p>

                <div className="socials-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
                    {SOCIALS.map(s => (
                        <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                            color: '#fff', textDecoration: 'none', fontWeight: 800, fontSize: '0.8rem',
                            border: '1px solid rgba(255,255,255,0.1)', padding: '15px', borderRadius: 12,
                            background: 'rgba(255,255,255,0.03)', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                            letterSpacing: 1, position: 'relative', overflow: 'hidden'
                        }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(230, 57, 70, 0.15)';
                                e.target.style.borderColor = 'rgba(230, 57, 70, 0.6)';
                                e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(255,255,255,0.03)';
                                e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                                e.target.style.transform = 'scale(1)';
                            }}
                        >
                            {s.label}
                        </a>
                    ))}
                </div>

                <div style={{ marginTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 30 }}>
                    <button
                        onClick={(e) => { e.stopPropagation(); onRestart(); }}
                        style={{
                            background: 'linear-gradient(135deg, #E63946, #b91c1c)',
                            color: '#fff', border: 'none', padding: '18px 32px', width: '100%',
                            borderRadius: 15, fontWeight: 950, cursor: 'pointer',
                            fontSize: '0.85rem', letterSpacing: 3, textTransform: 'uppercase',
                            boxShadow: '0 15px 35px rgba(230, 57, 70, 0.4)',
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                            animation: 'breathe 3s infinite ease-in-out'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.animation = 'none';
                            e.target.style.transform = 'scale(1.03) translateY(-3px)';
                            e.target.style.boxShadow = '0 20px 45px rgba(230, 57, 70, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.animation = 'breathe 3s infinite ease-in-out';
                        }}
                    >
                        <span style={{ fontSize: '1.4rem' }}>↺</span> RESTART JOURNEY
                    </button>
                </div>
            </div>
        </div>
    )
}

function MobileControls({ scrollProgress }) {
    const driveInterval = useRef(null)

    const startDriving = (dir) => {
        if (driveInterval.current) clearInterval(driveInterval.current)
        driveInterval.current = setInterval(() => {
            window.dispatchEvent(new CustomEvent('driveCar', { detail: { step: dir * 0.003 } }))
        }, 16)
    }

    const stopDriving = () => {
        if (driveInterval.current) clearInterval(driveInterval.current)
    }

    return (
        <div className="mobile-controls">
            <button 
                onPointerDown={(e) => { e.preventDefault(); startDriving(1) }} 
                onPointerUp={(e) => { e.preventDefault(); stopDriving() }}
                onPointerLeave={stopDriving}
                className="drive-btn drive-up"
                style={{
                    animation: scrollProgress < 0.05 ? 'pulse-drive 1.5s infinite' : 'none'
                }}
            >
                <div style={{ fontSize: '1.8rem', lineHeight: 1 }}>▲</div>
                <div style={{ fontSize: '0.5rem', fontWeight: 900 }}>DRIVE</div>
            </button>
            <button 
                onPointerDown={(e) => { e.preventDefault(); startDriving(-1) }} 
                onPointerUp={(e) => { e.preventDefault(); stopDriving() }}
                onPointerLeave={stopDriving}
                className="drive-btn"
            >
                <div style={{ fontSize: '1.8rem', lineHeight: 1 }}>▼</div>
                <div style={{ fontSize: '0.5rem', fontWeight: 900 }}>REVERSE</div>
            </button>
        </div>
    )
}

export default function JourneyOverlay({ scrollProgress }) {
    const [unlocked, setUnlocked] = useState([0, 6]) // Hero and Contact unlocked by default
    const [enlargedImg, setEnlargedImg] = useState(null)
    const currentStop = RANGES.findIndex(r => scrollProgress >= r[0] && scrollProgress <= r[1])

    const [isMobile, setIsMobile] = useState(false)
    const [timeAtStop, setTimeAtStop] = useState(0)

    useEffect(() => {
        setIsMobile(window.innerWidth <= 768)
        const handleResize = () => setIsMobile(window.innerWidth <= 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        setTimeAtStop(0)
        const timer = setInterval(() => {
            setTimeAtStop(prev => prev + 100)
        }, 100)
        return () => clearInterval(timer)
    }, [currentStop])

    const unlock = (idx) => {
        if (!unlocked.includes(idx)) {
            setUnlocked([...unlocked, idx])
            window.dispatchEvent(new CustomEvent('unlockGate', { detail: { index: idx } }))
        }
    }

    const isVisible = (idx) => {
        if (currentStop !== idx || !unlocked.includes(idx)) return false
        // Hide after 4 seconds on mobile
        if (isMobile && timeAtStop > 4000) return false
        return true
    }
    const needsToll = (idx) => {
        if (unlocked.includes(idx)) return false
        const stop = STOPS[idx]
        if (!stop) return false
        return Math.abs(scrollProgress - stop.t) < 0.03
    }

    const handleRestart = () => {
        setUnlocked([0, 6])
        window.dispatchEvent(new CustomEvent('resetJourney'))
    }

    return (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100 }}>
            <style>{`
                @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
                @keyframes popIn { from{opacity:0;transform:scale(0.5)} to{opacity:1;transform:scale(1)} }
                @keyframes fadeIn { from{opacity:0} to{opacity:1} }
                @keyframes scan { 0%{top:0%} 100%{top:100%} }
                @keyframes scanH { 0%{left:-100%} 100%{left:100%} }
                @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
                @keyframes beam { 0%{top:20%; opacity:0} 50%{opacity:1} 100%{top:80%; opacity:0} }
                @keyframes rotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
                @keyframes pulse-drive { 
                    0% { box-shadow: 0 0 0 0 rgba(230, 57, 70, 0.7); transform: scale(1); }
                    70% { box-shadow: 0 0 0 15px rgba(230, 57, 70, 0); transform: scale(1.1); }
                    100% { box-shadow: 0 0 0 0 rgba(230, 57, 70, 0); transform: scale(1); }
                }
                @keyframes scrollDown { 0%{height:0;opacity:0;transform:translateY(0)} 50%{height:60px;opacity:1} 100%{height:0;opacity:0;transform:translateY(60px)} }
                @keyframes glitch {
                    0%, 100% { transform: translate(0); }
                    1% { transform: translate(-2px, 2px); }
                    2% { transform: translate(2px, -2px); }
                    3% { transform: translate(0); }
                }
                @keyframes hologram { 
                    0%,100%{background-position:0% 50%; opacity:0.3} 
                    50%{background-position:100% 50%; opacity:0.5} 
                }

                .stop-panel {
                    position: absolute;
                    pointer-events: none;
                    transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                    opacity: 0;
                    visibility: hidden; /* Hide from mouse and screen readers when inactive */
                    width: 90%;
                    z-index: 100;
                }
                .stop-panel.is-visible {
                    opacity: 1;
                    visibility: visible;
                    pointer-events: none; /* Allow clicking through empty parts of the panel */
                }
                .panel-box {
                    max-height: 85vh;
                    overflow-y: auto;
                    pointer-events: auto; /* Only capture events on the actual UI content */
                }
                .panel-box::-webkit-scrollbar {
                    width: 4px;
                }
                .panel-box::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.2);
                    border-radius: 4px;
                }
                
                /* HERO */
                .hero-panel {
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Inter', sans-serif;
                    overflow: hidden;
                    width: 100%;
                }

                /* ABOUT */
                .about-panel {
                    top: 10%;
                    left: 3%;
                    max-width: 550px;
                    transform: translateX(-100px) rotate(-5deg);
                }
                .about-panel.is-visible { transform: translateX(0) rotate(-1deg); }

                /* SKILLS */
                .skills-panel {
                    top: 50%;
                    right: 5%;
                    max-width: 550px;
                    transform: translateY(-50%) translateX(100px) rotate(5deg);
                }
                .skills-panel.is-visible { transform: translateY(-50%) translateX(0) rotate(1deg); }

                /* WORK */
                .work-panel {
                    top: 15%;
                    left: 3%;
                    max-width: 450px;
                    transform: rotate(-10deg) scale(0.8);
                }
                .work-panel.is-visible { transform: rotate(-3deg) scale(1); pointer-events: none; }
                .work-panel .panel-box { pointer-events: auto; }

                /* PROJECTS */
                .projects-panel {
                    top: 5%;
                    right: 3%;
                    max-width: 700px;
                    transform: translateY(-50px);
                }
                .projects-panel.is-visible { transform: translateY(0); }

                /* HOBBIES */
                .hobbies-panel {
                    top: 50%;
                    left: 3%;
                    max-width: 400px;
                    transform: translateY(-50%) translateX(-50px);
                }
                .hobbies-panel.is-visible { transform: translateY(-50%) translateX(0); }

                /* CONTACT */
                .contact-panel {
                    bottom: 15%;
                    right: 3%;
                    max-width: 420px;
                    transform: translateX(50px) rotate(-2deg);
                    z-index: 2000;
                }
                .contact-panel.is-visible { transform: translateX(0) rotate(-2deg); }

                /* TOLL GATE */
                .toll-ui {
                    position: absolute;
                    bottom: 15%;
                    left: 50%;
                    transform: translateX(-50%) translateY(50px) scale(0.8);
                    opacity: 0;
                    pointer-events: none;
                    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
                    z-index: 1000;
                    text-align: center;
                }
                .toll-ui.is-visible {
                    opacity: 1;
                    pointer-events: auto;
                    transform: translateX(-50%) translateY(0) scale(1);
                }

                /* Mobile Responsiveness */
                @media (max-width: 768px) {
                    .stop-panel {
                        width: 100%;
                        max-width: 400px;
                        left: 50% !important;
                        right: auto !important;
                        transform-origin: top center;
                    }
                    .about-panel {
                        top: 5%;
                        transform: translateX(-50%) translateY(-30px) scale(0.65);
                    }
                    .about-panel.is-visible { transform: translateX(-50%) translateY(0) scale(0.65); }

                    .skills-panel {
                        top: 5%;
                        transform: translateX(-50%) translateY(-30px) scale(0.65);
                    }
                    .skills-panel.is-visible { transform: translateX(-50%) translateY(0) scale(0.65); }

                    .work-panel {
                        top: 5%;
                        transform: translateX(-50%) translateY(-30px) scale(0.65);
                    }
                    .work-panel.is-visible { transform: translateX(-50%) translateY(0) scale(0.65); }

                    .projects-panel {
                        top: 5%;
                        transform: translateX(-50%) translateY(-30px) scale(0.65);
                    }
                    .projects-panel.is-visible { transform: translateX(-50%) translateY(0) scale(0.65); }

                    .hobbies-panel {
                        top: 5%;
                        transform: translateX(-50%) translateY(-30px) scale(0.65);
                    }
                    .hobbies-panel.is-visible { transform: translateX(-50%) translateY(0) scale(0.65); }

                    .contact-panel {
                        bottom: auto;
                        top: 5% !important;
                        transform: translateX(-50%) translateY(-30px) scale(0.65);
                    }
                    .contact-panel.is-visible { transform: translateX(-50%) translateY(0) scale(0.65); }

                    .toll-ui {
                        bottom: 5%;
                        transform: translateX(-50%) translateY(50px) scale(0.8);
                    }
                    .toll-ui.is-visible {
                        transform: translateX(-50%) translateY(0) scale(0.9);
                    }

                    .hero-panel {
                        padding: 10px;
                        box-sizing: border-box;
                        left: 0 !important;
                        width: 100% !important;
                    }
                    .hero-panel > div:last-child {
                        padding: 20px !important;
                        width: 100%;
                    }
                    .hero-title { font-size: clamp(2rem, 15vw, 3.5rem) !important; }
                    .id-card-content { flex-direction: column !important; gap: 20px !important; text-align: center; }
                    .id-photo { width: 140px !important; height: 180px !important; margin: 0 auto; }
                    .badges-row { justify-content: center !important; }
                    .holo-seal { display: none !important; }
                    .footer-row { flex-direction: column !important; align-items: center !important; gap: 15px !important; text-align: center !important; }
                    .signature-box { text-align: center !important; }
                    .skills-grid { grid-template-columns: 1fr !important; gap: 10px !important; }
                    .projects-grid { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
                    .hobbies-grid { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
                    .project-card { flex-direction: column !important; padding: 10px !important; text-align: center; align-items: center; min-height: 180px !important; }
                    .project-card .title { font-size: 0.75rem !important; }
                    .project-thumb { width: 100% !important; height: 60px !important; margin-bottom: 5px; }
                    .project-content { align-items: center !important; width: 100%; }
                    .tech-tags-row { justify-content: center !important; }
                    .hobby-card-mini { flex-direction: column !important; gap: 6px !important; text-align: center; align-items: center; min-height: 180px !important; padding: 10px !important; }
                    .hobby-card-mini > div:first-child { width: 100% !important; height: 60px !important; }
                    .hobby-content { align-items: center !important; width: 100%; }
                    .hobby-footer { flex-direction: column !important; gap: 8px !important; align-items: center !important; }
                    .contact-title { font-size: 1.8rem !important; }
                    .socials-grid { grid-template-columns: 1fr !important; gap: 10px !important; }
                    .panel-box {
                        max-height: none !important;
                        padding: 15px !important;
                        overflow-y: visible !important;
                    }

                    .mobile-controls {
                        display: flex;
                    }
                }

                .mobile-controls {
                    display: none;
                    position: fixed;
                    right: 20px;
                    bottom: 80px;
                    flex-direction: column;
                    gap: 10px;
                    z-index: 5000;
                    pointer-events: auto;
                }

                .drive-btn {
                    width: 70px;
                    height: 70px;
                    border-radius: 12px;
                    background: rgba(20, 20, 20, 0.9);
                    backdrop-filter: blur(10px);
                    border: 2px solid #E63946;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 2px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.5), inset 0 0 10px rgba(230, 57, 70, 0.2);
                    cursor: pointer;
                    user-select: none;
                    -webkit-user-select: none;
                    transition: all 0.2s ease;
                }
                .drive-btn:active {
                    background: #E63946;
                    transform: scale(0.9) translateY(2px);
                    box-shadow: 0 2px 5px rgba(0,0,0,0.5);
                }
                .drive-up {
                    border-width: 3px;
                    border-color: #E63946;
                }
            `}</style>

            <HeroStop visible={currentStop === 0} scrollProgress={scrollProgress} />

            <TollGateUI visible={needsToll(1)} onPay={() => unlock(1)} label="ABOUT CHECKPOINT" />
            <AboutStop visible={isVisible(1)} onImageClick={setEnlargedImg} />

            <TollGateUI visible={needsToll(2)} onPay={() => unlock(2)} label="SKILLS CHECKPOINT" />
            <SkillsStop visible={isVisible(2)} />

            <TollGateUI visible={needsToll(3)} onPay={() => unlock(3)} label="EXPERIENCE ZONE" />
            <WorkStop visible={isVisible(3)} />

            <TollGateUI visible={needsToll(4)} onPay={() => unlock(4)} label="PROJECTS CHECKPOINT" />
            <ProjectsStop visible={isVisible(4)} onImageClick={setEnlargedImg} />

            <TollGateUI visible={needsToll(5)} onPay={() => unlock(5)} label="SIDE VENTURES CHECKPOINT" />
            <HobbiesStop visible={isVisible(5)} onImageClick={setEnlargedImg} />

            <ContactStop visible={isVisible(6)} onRestart={handleRestart} />

            {/* Bottom Progress Bar */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'rgba(255,255,255,0.1)', zIndex: 100 }}>
                <div style={{ height: '100%', width: `${scrollProgress * 100}%`, background: '#E63946', transition: 'width 0.1s linear' }} />
            </div>

            <MobileControls scrollProgress={scrollProgress} />

            {/* Image Modal */}
            {enlargedImg && (
                <div
                    onClick={() => setEnlargedImg(null)}
                    style={{
                        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 2000, pointerEvents: 'auto', cursor: 'zoom-out',
                        animation: 'fadeIn 0.3s ease'
                    }}
                >
                    <img src={enlargedImg} style={{
                        maxWidth: '90%', maxHeight: '90%', borderRadius: 12,
                        boxShadow: '0 0 50px rgba(255,215,0,0.2)', border: '2px solid #FFD700'
                    }} />
                    <div style={{ position: 'absolute', top: 30, right: 30, color: '#fff', fontSize: '2rem', fontWeight: 900 }}>×</div>
                </div>
            )}
        </div>
    )
}
function TollGateUI({ visible, onPay, label }) {
    return (
        <div className={`toll-ui ${visible ? 'is-visible' : ''}`}>
            <div style={{
                background: 'rgba(0,0,0,0.8)', color: '#FFD700', padding: '12px 32px', borderRadius: '100px',
                border: '4px solid #FFD700', boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
                fontFamily: "'Inter', sans-serif", fontWeight: 900, textTransform: 'uppercase',
                letterSpacing: 2, transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
                onClick={onPay}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
                <div style={{
                    width: 40, height: 40, background: '#FFD700', color: '#000',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.2rem', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)'
                }}>
                    🪙
                </div>
                <div>
                    <div style={{ fontSize: '0.6rem', opacity: 0.7, marginBottom: -2 }}>{label}</div>
                    <div style={{ fontSize: '1.1rem' }}>PAY TOLL & PASS</div>
                </div>
            </div>
        </div>
    )
}
