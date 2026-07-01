import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowDown, ArrowRight, BarChart3, Cable, Check, History, Layers3, Menu, Pause, Play, Plus, QrCode, ScanLine, Send, ShieldCheck, SlidersHorizontal, Store, TrendingUp, WandSparkles, X } from 'lucide-react'
import { InteractiveFolderGallery } from './components/ui/InteractiveFolderGallery'

const nav = [['Solution', '/solution'], ['How it works', '/how-it-works'], ['About us', '/about']]

function Logo() {
  return <Link to="/" className="logo" aria-label="MaisonMatch home">Maison<span>Match</span><i>MM</i></Link>
}

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => setOpen(false), [location.pathname])
  return <header className="header">
    <Logo />
    <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
    <nav className={open ? 'nav open' : 'nav'} aria-label="Primary navigation">
      {nav.map(([label, to]) => <NavLink key={to} to={to}>{label}</NavLink>)}
      <Link className="nav-cta" to="/demo">Request a demo <ArrowRight size={15}/></Link>
    </nav>
  </header>
}

function Footer() {
  return <footer className="footer">
    <div><Logo /><p>Personalization with the boutique’s taste still intact.</p></div>
    <div className="footer-links">{nav.map(([l,t]) => <Link key={t} to={t}>{l}</Link>)}<Link to="/demo">Request a demo</Link></div>
    <p className="copyright">© {new Date().getFullYear()} MaisonMatch</p>
  </footer>
}

function Layout({ children }) {
  const location = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [location.pathname])
  return <><Header/><main className="antialiased">{children}</main><Footer/></>
}

function Eyebrow({ children }) { return <p className="eyebrow">{children}</p> }
function ArrowLink({ to, children, light=false }) { return <Link to={to} className={light ? 'arrow-link light' : 'arrow-link'}>{children}<ArrowRight size={17}/></Link> }

const lookData = {
  women: {
    label: 'Women',
    stages: ['Anchor outfit selected', 'Blazer added', 'Bag added', 'Look complete'],
    products: [
      { name: 'Ivory Silk Shirt', type: 'Anchor piece', price: '$148', cls: 'scarf' },
      { name: 'The Ada Blazer', type: 'Tailored structure', price: '$248', cls: 'blazer' },
      { name: 'Sera Shoulder Bag', type: 'Deep burgundy', price: '$184', cls: 'bag' },
      { name: 'Penny Loafer', type: 'Polished finish', price: '$210', cls: 'loafer' }
    ]
  },
  men: {
    label: 'Men',
    stages: ['Anchor outfit selected', 'Blazer added', 'Folio added', 'Look complete'],
    products: [
      { name: 'Oxford Shirt', type: 'Anchor piece', price: '$128', cls: 'mshirt' },
      { name: 'Unstructured Blazer', type: 'Deep navy', price: '$268', cls: 'mblazer' },
      { name: 'Crossbody Folio', type: 'Dark oxblood', price: '$198', cls: 'mbag' },
      { name: 'Charcoal Overcoat', type: 'Final layer', price: '$320', cls: 'mcoat' }
    ]
  }
}

function ProductVisual({ type, label }) {
  return <div className={`product-visual ${type}`} role="img" aria-label={label || `${type} product photograph`}/>
}

function OutfitComposer() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [mode, setMode] = useState('women')
  useEffect(() => {
    if (!playing) return
    if (step >= 3) { setPlaying(false); return }
    const id = setTimeout(() => setStep(value => value + 1), 900)
    return () => clearTimeout(id)
  }, [playing, step])
  const start = () => { if (step >= 3) setStep(0); setPlaying(true) }
  const selectMode = nextMode => { setMode(nextMode); setStep(0); setPlaying(false) }
  const look = lookData[mode]
  return <div className={`composer built builder-step-${step} builder-${mode}`}>
    <div className="composer-top"><span>LOOK 01 / LIVE INVENTORY</span><div className="look-toggle" aria-label="Choose styling collection">{Object.entries(lookData).map(([key, value]) => <button key={key} className={mode === key ? 'active' : ''} onClick={() => selectMode(key)}>{value.label}</button>)}</div><button className="style-action" onClick={playing ? undefined : start} disabled={playing}>{playing ? 'Styling…' : step >= 3 ? 'Style again' : 'Complete look'}</button></div>
    <div className="outfit-builder">
      <div className="mannequin-stage" aria-live="polite">
        <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
        <div className="mannequin-frame" role="img" aria-label={`${look.label} mannequin styling stage: ${look.stages[step]}`}><img src={mode === 'women' ? '/assets/women-outfit-sequence.png' : '/assets/men-outfit-sequence.png'} style={{transform:`translateX(-${step * 25}%)`}} alt=""/></div>
        <div className="stage-status"><span>0{step + 1}</span><p>{look.stages[step]}</p></div>
      </div>
      <div className="builder-products">
        {look.products.map((p, i) => <article className={i < step + 1 ? 'product-card added' : 'product-card'} key={p.name}>
          <div className="product-num">0{i+1}</div><ProductVisual type={p.cls} label={`${p.name} product photograph`}/>
          <div><p>{p.type}</p><h3>{p.name}</h3><span>{p.price}</span></div>
          <i>{i < step + 1 ? <Check size={13}/> : <Plus size={13}/>}</i>
        </article>)}
      </div>
    </div>
    <div className="match-note"><span><Check size={15}/></span><p><b>{step >= 3 ? 'The complete edit is ready.' : 'Styling from live inventory.'}</b><br/>Every piece is available in-store today.</p></div>
  </div>
}

function Marquee() { return <div className="marquee" aria-hidden="true"><div>SHOP THE WHOLE THOUGHT — EVERY PIECE FINDS ITS MATCH — SHOP THE WHOLE THOUGHT — EVERY PIECE FINDS ITS MATCH — </div></div> }

function PartnerShowcase() {
  return <section className="partner-showcase section-pad">
    <div className="partner-copy"><Eyebrow>BOUTIQUE PARTNERS</Eyebrow><h2>Built with boutiques,<br/><em>not around them.</em></h2><p>MaisonMatch grows alongside independent retailers with a point of view. We’re proud to work with Levy’s as our founding boutique partner.</p></div>
    <InteractiveFolderGallery />
  </section>
}

function Home() {
  return <>
    <section className="hero section-pad">
      <div className="hero-copy"><Eyebrow>PERSONALIZATION FOR INDEPENDENT BOUTIQUES</Eyebrow><h1>One piece is<br/>only the <em>start.</em></h1><p className="hero-text">MaisonMatch turns a single item into a complete shoppable outfit—using what’s in stock, and remembering what your customers already love.</p>
        <div className="hero-actions"><Link className="button dark" to="/demo">Request a demo <ArrowRight size={17}/></Link><ArrowLink to="/how-it-works">See how it works</ArrowLink></div>
        <p className="tagline">Every piece finds its match.</p>
      </div>
      <div className="hero-art"><div className="art-label"><span>01</span>Outfit completion</div><img src="/assets/maisonmatch-white-hero.png" alt="Woman in refined black tailoring inside a white independent boutique"/><div className="qr-card"><QrCode/><span>SCAN THE PIECE<br/><b>STYLE THE LOOK</b></span></div></div>
      <a className="scroll-cue" href="#composition"><ArrowDown size={17}/> Scroll to discover</a>
    </section>
    <Marquee/>
    <PartnerShowcase/>
    <section id="composition" className="composition section-pad"><div className="section-intro"><Eyebrow>FROM ITEM TO OUTFIT</Eyebrow><h2>The rest of the look,<br/><em>already in the room.</em></h2><p>Your customer chooses the piece. MaisonMatch sees the possibilities across your live inventory.</p></div><OutfitComposer/></section>
    <section className="wardrobe section-pad"><div className="wardrobe-photo"><div className="image-caption">02 / WARDROBE MEMORY</div></div><div className="wardrobe-copy"><Eyebrow>THE RELATIONSHIP CONTINUES</Eyebrow><h2>A memory for<br/><em>what comes next.</em></h2><p>After the sale, MaisonMatch remembers what each customer owns. When new arrivals land, your team knows exactly who they belong with.</p><blockquote>“This new blazer belongs with the silk shirt you bought last month.”</blockquote><ArrowLink to="/solution">Explore wardrobe memory</ArrowLink></div></section>
    <section className="impact section-pad"><Eyebrow>QUIET TECHNOLOGY. VISIBLE IMPACT.</Eyebrow><div className="impact-grid"><h2>Keep your taste.<br/><em>Add intelligence.</em></h2><p>Enterprise-level personalization, without asking your boutique to become a technology company.</p><div className="impact-list"><span>01</span><p><b>More complete outfits</b>Increase items per transaction with relevant, in-stock pairings.</p><span>02</span><p><b>Stronger return visits</b>Give every new arrival a reason to reconnect.</p><span>03</span><p><b>Your point of view</b>Approve and refine recommendations before customers see them.</p></div></div></section>
    <section className="final-cta"><Eyebrow>FOR BOUTIQUES WITH A POINT OF VIEW</Eyebrow><h2>Let every piece<br/>find its <em>match.</em></h2><Link className="button acid" to="/demo">Request a demo <ArrowRight size={18}/></Link></section>
  </>
}

function SolutionLookPreview() {
  const [mode, setMode] = useState('women')
  const look = lookData[mode]
  return <div className="solution-look-ui">
    <div className="solution-ui-bar"><span>LIVE OUTFIT / 07</span><div>{['women','men'].map(key=><button key={key} className={mode===key?'active':''} onClick={()=>setMode(key)}>{lookData[key].label}</button>)}</div><small><i/> Inventory live</small></div>
    <div className="solution-look-body">
      <div className="anchor-card"><span>ANCHOR PIECE</span><ProductVisual type={look.products[0].cls} label={`${look.products[0].name} anchor product`}/><b>{look.products[0].name}</b><small>Selected by customer</small></div>
      <div className="solution-route"><i/><ArrowRight size={18}/><span>94%<small>match</small></span></div>
      <div className="final-look-card"><div className="final-look-strip"><SequenceFrame mode={mode} step={3} label={`${look.label} completed outfit on a mannequin`}/></div><div><span>COMPLETE LOOK</span><b>{look.products.length} pieces · in stock</b><small>Color · silhouette · occasion</small></div></div>
    </div>
    <div className="solution-match-row">{look.products.slice(1).map((p,i)=><div key={p.name}><ProductVisual type={p.cls} label={p.name}/><span><b>{p.name}</b><small>{[96,92,89][i]}% compatible</small></span><Check size={13}/></div>)}</div>
  </div>
}

function WardrobeMemoryPreview() {
  return <div className="memory-ui">
    <div className="memory-ui-top"><div className="customer-avatar">MS</div><div><span>CUSTOMER PROFILE</span><b>Maya Stone</b><small>4 purchases · Last visit 18 days ago</small></div><i>Active</i></div>
    <div className="wardrobe-shelf"><span>WARDROBE MEMORY</span><div className="owned-item"><ProductVisual type="scarf" label="Owned ivory silk shirt"/><small>OWNED · MAY 12</small><b>Ivory Silk Shirt</b></div><div className="owned-item"><ProductVisual type="loafer" label="Owned black loafers"/><small>OWNED · APR 24</small><b>Penny Loafers</b></div><div className="history-count"><History size={18}/><b>+2</b><small>past pieces</small></div></div>
    <div className="new-arrival-match"><div className="arrival-image"><ProductVisual type="blazer" label="New black blazer arrival"/><span>NEW</span></div><div><span>NEW ARRIVAL MATCH</span><b>The Ada Blazer</b><small>Pairs with 2 items Maya owns</small><div className="match-meter"><i/><b>96%</b></div></div></div>
    <div className="message-draft"><Send size={16}/><div><span>PERSONAL MESSAGE</span><p>This new blazer belongs with the silk shirt you bought last month.</p></div><button>Ready to send</button></div>
  </div>
}

function SequenceFrame({ mode = 'women', step = 3, label }) {
  return <div className={`sequence-frame sequence-${mode}`} style={{backgroundPosition:`${step * 33.333}% 0`}} role="img" aria-label={label}/>
}

function Solution() {
  return <>
    <section className="solution-hero-new section-pad"><div className="solution-hero-copy"><Eyebrow>THE SOLUTION</Eyebrow><h1>Turn good taste<br/>into <em>more of the look.</em></h1><p>MaisonMatch gives independent boutiques the personalization advantage of a large retailer—without changing how the boutique looks, feels, or sells.</p><div><Link className="button dark" to="/demo">Request a demo <ArrowRight size={17}/></Link><ArrowLink to="/how-it-works">See the system</ArrowLink></div></div><div className="solution-hero-image"><img src="/assets/solution-curation.png" alt="Boutique owner curating an ivory blouse, black blazer, and burgundy bag"/><div><span>THE COMPLETE LOOK</span><b>One decision.<br/>Three relevant additions.</b></div></div></section>
    <section className="solution-thesis section-pad"><Eyebrow>THE RETAIL GAP</Eyebrow><p>The problem is not taste.<br/>It is remembering every piece, every customer, and every possible <em>match.</em></p><div className="gap-cards"><article><span>01</span><b>The lost basket</b><p>A customer finds one piece they love. The rest of the outfit stays on the rack.</p></article><article><span>02</span><b>The lost context</b><p>A new arrival lands. Your team cannot instantly know whose wardrobe it belongs in.</p></article><aside><b>MaisonMatch connects both moments.</b><p>At discovery, and after the sale.</p></aside></div></section>
    <section className="solution-chapter section-pad"><div className="chapter-copy"><span className="chapter-index">01 / OUTFIT COMPLETION</span><Eyebrow>BUILD AROUND THE YES</Eyebrow><h2>One chosen piece.<br/><em>A complete point of view.</em></h2><p>MaisonMatch reads the item a customer already likes, then builds two or three complete looks from your live inventory. Every suggestion accounts for color, texture, silhouette, occasion, and availability.</p><ul><li><Check size={14}/>Only products currently in stock</li><li><Check size={14}/>Two to three shoppable outfit options</li><li><Check size={14}/>No app download for the customer</li></ul></div><SolutionLookPreview/></section>
    <section className="solution-chapter memory-chapter section-pad"><WardrobeMemoryPreview/><div className="chapter-copy"><span className="chapter-index">02 / WARDROBE MEMORY</span><Eyebrow>MAKE THE SALE REMEMBER</Eyebrow><h2>What they bought<br/><em>shapes what comes next.</em></h2><p>After purchase, MaisonMatch remembers what each customer owns. New arrivals are matched back to past purchases, giving your team a specific and timely reason to reconnect.</p><blockquote>Personal enough to feel like service. Relevant enough to earn a reply.</blockquote></div></section>
    <section className="boutique-control section-pad"><div><Eyebrow>THE BOUTIQUE STAYS THE EDITOR</Eyebrow><h2>Intelligence behind<br/><em>your point of view.</em></h2></div><div className="control-grid">{[[SlidersHorizontal,'Approve the edit','Accept, reject, or refine every pairing.'],[Layers3,'Use what exists','Your current catalog imagery and product data are enough.'],[ShieldCheck,'Keep the brand intact','Recommendations learn from your approvals—not generic trends.']].map(([Icon,title,copy],i)=><article key={title}><span>0{i+1}</span><Icon size={21}/><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="solution-impact section-pad"><div><Eyebrow>DESIGNED TO MOVE THE NUMBERS</Eyebrow><h2>Better outfits.<br/><em>Stronger relationships.</em></h2></div><div className="impact-metrics">{[['01','Average transaction value','More of the look in every basket.'],['02','Items per transaction','Relevant additions, not random upsells.'],['03','Repeat purchase rate','A reason to return when new pieces land.'],['04','Clienteling response','Messages grounded in what customers own.']].map(([n,t,c])=><article key={n}><span>{n}</span><TrendingUp size={17}/><b>{t}</b><p>{c}</p></article>)}</div></section>
    <section className="solution-connect section-pad"><div><Store size={23}/><Eyebrow>WORKS WITH THE STORE YOU HAVE</Eyebrow><h2>Light to launch.<br/>Easy to live with.</h2></div><div><p>Connect Shopify, Square, Lightspeed, or your existing inventory system. No product re-shoots. Minimal staff training. No customer app.</p><div className="platform-row">{['Shopify','Square','Lightspeed','Your POS'].map(x=><span key={x}>{x}</span>)}</div><Link className="button dark" to="/demo">See it with your inventory <ArrowRight size={17}/></Link></div></section>
  </>
}

const steps = [
  ['Connect inventory', 'MaisonMatch reads your live catalog and availability through the systems you already use.'],
  ['Generate pairings', 'Fashion logic and learned compatibility build complete looks from what is in stock.'],
  ['Launch the scan', 'Place QR codes in-store or share links online. Customers never need an app.'],
  ['Learn what sells', 'Track basket growth, repeat purchases, and the pairings your customers respond to.']
]

function ConnectScene() {
  return <div className="demo-scene connect-scene">
    <div className="source-column"><span>YOUR SYSTEMS</span>{['Shopify','Square','Lightspeed'].map((name,i)=><div className="source-chip" key={name} style={{'--i':i}}><i>{name[0]}</i><b>{name}</b><small>Connected</small></div>)}</div>
    <div className="moving-data"><i/><i/><i/></div>
    <div className="catalog-node"><Cable size={22}/><b>Live catalog</b><span>1,284 SKUs</span><div><small>Images</small><small>Stock</small><small>Variants</small></div></div>
  </div>
}

function PairScene() {
  return <div className="demo-scene pair-scene">
    <div className="anchor-product"><ProductVisual type="scarf" label="Anchor ivory silk shirt"/><span>ANCHOR PIECE</span></div>
    <div className="pair-connector pair-connector-in"><i/></div>
    <div className="compatibility-core"><WandSparkles size={22}/><b>94%</b><span>compatibility</span></div>
    <div className="pair-connector pair-connector-out"><i/><i/><i/></div>
    <div className="pair-match-stack">
      <div className="pair-option"><ProductVisual type="blazer" label="Matched black blazer"/><span><b>The Ada Blazer</b><small>Color · 98</small></span></div>
      <div className="pair-option"><ProductVisual type="bag" label="Matched burgundy bag"/><span><b>Sera Shoulder Bag</b><small>Silhouette · 92</small></span></div>
      <div className="pair-option"><ProductVisual type="loafer" label="Matched black loafers"/><span><b>Penny Loafer</b><small>Occasion · 95</small></span></div>
    </div>
  </div>
}

function LaunchScene() {
  return <div className="demo-scene launch-scene">
    <div className="qr-plaque"><QrCode/><span>THE ADA BLAZER</span><small>Scan to style</small></div>
    <div className="scan-path"><i/><ArrowRight/></div>
    <div className="phone-shell"><div className="phone-bar"/><span className="phone-kicker">COMPLETE THE LOOK</span><div className="phone-look"><ProductVisual type="blazer"/><Plus size={12}/><ProductVisual type="bag"/><Plus size={12}/><ProductVisual type="loafer"/></div><b>Look 01</b><small>3 pieces · all in stock</small><button>Shop the look</button><div className="scan-line"/></div>
  </div>
}

function LearnScene() {
  return <div className="demo-scene learn-scene">
    <div className="metric-card main-metric"><span>AVERAGE BASKET</span><b>+31%</b><small>Last 30 days</small><div className="mini-bars">{[38,52,48,69,62,84,94].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div></div>
    <div className="metric-card"><span>ITEMS / SALE</span><b>2.4</b><small>From 1.6</small></div>
    <div className="metric-card"><span>RETURN RATE</span><b>+18%</b><small>Repeat purchase</small></div>
    <div className="clienteling-message"><Send size={17}/><div><span>READY TO SEND</span><p>This new blazer belongs with the silk shirt you bought last month.</p><small>To: Maya · 2 min ago</small></div></div>
  </div>
}

const scenes = [ConnectScene, PairScene, LaunchScene, LearnScene]

function HowItWorks() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    if (!playing) return
    const id = setTimeout(() => setActive(value => value === 3 ? 0 : value + 1), 2200)
    return () => clearTimeout(id)
  }, [playing, active])
  const Scene = scenes[active]
  return <>
    <section className="page-hero process-hero section-pad"><Eyebrow>HOW IT WORKS</Eyebrow><h1>From inventory<br/>to <em>instinct.</em></h1><p>Four considered steps. Nothing that gets between your team and the customer.</p></section>
    <section className="process-lab section-pad">
      <div className="lab-header"><div><span>MAISONMATCH / LIVE SYSTEM</span><i><b/> All systems live</i></div><button onClick={()=>setPlaying(!playing)}>{playing?<Pause size={14}/>:<Play size={14}/>} {playing?'Pause demo':'Play full demo'}</button></div>
      <div className="lab-layout">
        <div className="lab-nav" aria-label="Process steps">{steps.map((s,i)=>{const Icon=[Cable,WandSparkles,ScanLine,BarChart3][i];return <button key={s[0]} className={active===i?'active':''} onClick={()=>{setActive(i);setPlaying(false)}}><span><Icon size={17}/></span><div><small>0{i+1}</small><b>{s[0]}</b><p>{s[1]}</p></div><ArrowRight size={15}/></button>})}</div>
        <div className="lab-viewport"><div className="viewport-meta"><span>STEP 0{active+1}</span><b>{steps[active][0]}</b><small>{active===0?'Live sync':active===1?'Compatibility engine':active===2?'Customer experience':'Performance signal'}</small></div><Scene key={active}/><div className="viewport-progress">{steps.map((_,i)=><i key={i} className={active===i?'active':''}/>)}</div></div>
      </div>
    </section>
    <section className="owner-loop section-pad"><Eyebrow>THE HUMAN IN THE LOOP</Eyebrow><div><h2>Your eye has<br/><em>the final say.</em></h2><p>MaisonMatch learns from every approval, rejection, and refinement. The result feels less like an algorithm—and more like your boutique.</p></div><div className="curation-card"><small>PAIRING REVIEW / 08 OF 12</small><div><ProductVisual type="blazer" label="Black blazer product"/><Plus/><ProductVisual type="bag" label="Burgundy shoulder bag product"/></div><p>Ivory blazer + Sera shoulder bag</p><span><button>Reject</button><button><Check size={15}/> Approve</button></span></div></section>
  </>
}

function About() {
  return <>
    <section className="about-hero about-hero-refined section-pad"><div><Eyebrow>ABOUT MAISONMATCH</Eyebrow><h1>Built for stores<br/>where taste is the <em>strategy.</em></h1></div><div className="about-image"><img src="/assets/about-boutique-owner.png" alt="Independent boutique owner thoughtfully reviewing a garment"/></div><p>MaisonMatch exists for independent boutiques that already know their customer. We add the memory, matching, and measurement that help that taste scale without turning the store into a generic feed.</p></section>
    <section className="about-utility section-pad"><div><Eyebrow>WHY IT MATTERS</Eyebrow><p className="manifesto-lead">Boutique selling is not a checkout problem. It is a <em>relationship memory</em> problem.</p></div><div className="about-utility-grid">{[['Before the sale','A customer chooses one piece. MaisonMatch helps your team show the rest of the look from inventory you already own.'],['After the sale','Past purchases become useful context, so new arrivals can reconnect to real wardrobes instead of cold campaigns.'],['With approval','Owners and stylists can accept, reject, and refine pairings, keeping the boutique’s eye in control.']].map(([title,copy],i)=><article key={title}><span>0{i+1}</span><h2>{title}</h2><p>{copy}</p></article>)}</div></section>
    <section className="about-operating section-pad"><div><Eyebrow>WHAT WE PROTECT</Eyebrow><h2>The boutique should still feel like <em>the boutique.</em></h2></div><div className="operating-list">{[[Store,'Your store rhythm','Works with existing catalog images, inventory systems, and staff workflows.'],[SlidersHorizontal,'Your point of view','Recommendation logic learns from your approvals, not anonymous trend data.'],[ShieldCheck,'Your customer trust','No customer app, no noisy gimmick, no experience that competes with service.']].map(([Icon,title,copy])=><article key={title}><Icon size={20}/><b>{title}</b><p>{copy}</p></article>)}</div></section>
    <section className="about-close"><p>Modern retail intelligence.<br/>Still unmistakably personal.</p><ArrowLink light to="/demo">Meet MaisonMatch</ArrowLink></section>
  </>
}

const DEMO_EMAIL = 'karim@maisonmatch.ai'
const DEMO_ENDPOINT = '/api/demo'

async function submitDemoRequest(form) {
  const response = await fetch(DEMO_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(form)
  })

  if (!response.ok) {
    throw new Error('Demo request could not be sent.')
  }
}

function Demo() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({name:'',boutique:'',email:'',presence:'',pos:'',message:''})
  const update = e => { setForm({...form,[e.target.name]:e.target.value}); setError('') }
  const submit = async e => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      await submitDemoRequest(form)
      setSubmitted(true)
    } catch {
      setError(`Something blocked the request. Please email ${DEMO_EMAIL} directly while we reconnect the form endpoint.`)
    } finally {
      setSending(false)
    }
  }
  return <section className="demo-page section-pad">
    <div className="demo-intro"><Eyebrow>REQUEST A DEMO</Eyebrow><h1>See your inventory<br/><em>think in outfits.</em></h1><p>Tell us a little about your boutique. We’ll show you how MaisonMatch could work with your catalog and the way your team already sells.</p><div className="pilot-note"><span>NOTE</span><p>Built for boutiques.<br/><b>No setup fee for pilot partners.</b></p></div></div>
    <div className="form-wrap">{submitted ? <div className="success" role="status"><span><Check/></span><Eyebrow>REQUEST SENT</Eyebrow><h2>Thank you, {form.name.split(' ')[0]}.</h2><p>Your request was sent to Karim. We’ll be in touch soon to arrange a thoughtful, boutique-specific walkthrough.</p><button onClick={()=>setSubmitted(false)}>Send another request</button></div> : <form onSubmit={submit}>
      <div className="field-row"><label>Name<input required name="name" value={form.name} onChange={update} placeholder="Your name"/></label><label>Boutique name<input required name="boutique" value={form.boutique} onChange={update} placeholder="Your boutique"/></label></div>
      <label>Email<input required type="email" name="email" value={form.email} onChange={update} placeholder="you@boutique.com"/></label>
      <label>Website or Instagram<input name="presence" value={form.presence} onChange={update} placeholder="@yourboutique"/></label>
      <label>POS platform<select name="pos" value={form.pos} onChange={update}><option value="">Select your platform</option><option>Shopify</option><option>Square</option><option>Lightspeed</option><option>Other</option></select></label>
      <label>Anything we should know?<textarea name="message" value={form.message} onChange={update} placeholder="Tell us about your store, inventory, or goals." rows="4"/></label>
      {error && <p className="demo-error" role="alert">{error}</p>}
      <button className="button dark" type="submit" disabled={sending}>{sending ? 'Sending request…' : 'Request a demo'} <ArrowRight size={17}/></button><p className="privacy">No sales theatre. Just a focused conversation about your boutique.</p>
    </form>}</div>
  </section>
}

function NotFound(){ return <section className="not-found section-pad"><Eyebrow>404</Eyebrow><h1>This piece is<br/><em>between seasons.</em></h1><ArrowLink to="/">Return home</ArrowLink></section> }

export default function App(){ return <Layout><Routes><Route path="/" element={<Home/>}/><Route path="/solution" element={<Solution/>}/><Route path="/how-it-works" element={<HowItWorks/>}/><Route path="/about" element={<About/>}/><Route path="/demo" element={<Demo/>}/><Route path="*" element={<NotFound/>}/></Routes></Layout> }
