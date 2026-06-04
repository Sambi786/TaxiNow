// TaxiNow — Black & Gold Luxury Edition (English only)
// No imports — React.xxx throughout. export default at bottom.

const G = {
  black:  "#080808",
  ink:    "#101010",
  panel:  "#161616",
  card:   "#1e1e1e",
  lift:   "#252525",
  gold:   "#c9a84c",
  goldLt: "#e8c96a",
  goldDk: "#9a7a30",
  white:  "#f2f2f2",
  silver: "#aaaaaa",
  dim:    "#555555",
  ghost:  "#2a2a2a",
  green:  "#4fc97e",
  red:    "#e05252",
  line:   "rgba(201,168,76,0.18)",
  lineW:  "rgba(255,255,255,0.06)",
};

const COUNTRIES=[
  {name:"Norway",flag:"🇳🇴",currency:"NOK",symbol:"kr",cities:["Oslo","Bergen","Stavanger","Trondheim"]},
  {name:"Sweden",flag:"🇸🇪",currency:"SEK",symbol:"kr",cities:["Stockholm","Gothenburg","Malmö"]},
  {name:"Denmark",flag:"🇩🇰",currency:"DKK",symbol:"kr",cities:["Copenhagen","Aarhus"]},
  {name:"UK",flag:"🇬🇧",currency:"GBP",symbol:"£",cities:["London","Manchester","Edinburgh"]},
  {name:"Germany",flag:"🇩🇪",currency:"EUR",symbol:"€",cities:["Berlin","Munich","Hamburg"]},
  {name:"France",flag:"🇫🇷",currency:"EUR",symbol:"€",cities:["Paris","Lyon","Nice"]},
  {name:"USA",flag:"🇺🇸",currency:"USD",symbol:"$",cities:["New York","Los Angeles","Miami"]},
  {name:"UAE",flag:"🇦🇪",currency:"AED",symbol:"AED",cities:["Dubai","Abu Dhabi"]},
  {name:"Saudi Arabia",flag:"🇸🇦",currency:"SAR",symbol:"SAR",cities:["Riyadh","Jeddah"]},
  {name:"Japan",flag:"🇯🇵",currency:"JPY",symbol:"¥",cities:["Tokyo","Osaka","Kyoto"]},
  {name:"Singapore",flag:"🇸🇬",currency:"SGD",symbol:"S$",cities:["Singapore"]},
  {name:"Canada",flag:"🇨🇦",currency:"CAD",symbol:"C$",cities:["Toronto","Vancouver","Montreal"]},
];
const EXCHANGE={NOK:1,SEK:0.97,DKK:0.66,GBP:0.088,EUR:0.087,USD:0.091,AED:0.33,SAR:0.34,JPY:13.5,SGD:0.12,CAD:0.12};
const AIRPORTS={Norway:["Oslo Lufthavn (OSL)","Bergen (BGO)","Stavanger (SVG)"],Sweden:["Arlanda (ARN)","Landvetter (GOT)"],UK:["Heathrow (LHR)","Gatwick (LGW)"],Germany:["Frankfurt (FRA)","München (MUC)"],France:["CDG (CDG)","Orly (ORY)"],USA:["JFK (JFK)","LAX (LAX)","Miami (MIA)"],UAE:["Dubai (DXB)","Abu Dhabi (AUH)"],"Saudi Arabia":["Riyadh (RUH)","Jeddah (JED)"],Japan:["Narita (NRT)","Haneda (HND)"],Singapore:["Changi (SIN)"],Canada:["Pearson (YYZ)","Vancouver (YVR)"],Denmark:["Kastrup (CPH)"]};
const CAR_CLASSES=[{id:"economy",icon:"🚕",mult:1.0,seats:4,eta:"3–5 min",label:"Economy",desc:"Affordable & reliable"},{id:"comfort",icon:"🚙",mult:1.4,seats:4,eta:"5–8 min",label:"Comfort",desc:"Newer cars, more space"},{id:"premium",icon:"🏎️",mult:2.1,seats:4,eta:"7–12 min",label:"Premium",desc:"Top-rated vehicles"},{id:"xl",icon:"🚐",mult:1.7,seats:6,eta:"6–10 min",label:"XL",desc:"Groups up to 6"}];
const DRIVERS=[{id:1,name:"Erik Haugen",rating:4.95,trips:2341,car:"Tesla Model 3",plate:"AB 12345",avatar:"EH"},{id:2,name:"Sofia Lundberg",rating:4.98,trips:1876,car:"BMW 5 Series",plate:"CD 67890",avatar:"SL"},{id:3,name:"James Wilson",rating:4.92,trips:3102,car:"Mercedes E-Class",plate:"EF 11223",avatar:"JW"},{id:4,name:"Yuki Nakamura",rating:4.97,trips:987,car:"Toyota Alphard",plate:"GH 44556",avatar:"YN"}];
const DB={passengers:[{id:1,name:"Alex Morgan",email:"alex@demo.com",phone:"+1 555 000 001",password:"demo123",trips:4}],drivers:[{id:1,name:"Marcus Reid",email:"marcus@demo.com",phone:"+1 555 000 002",password:"demo123",types:["car","airport"],online:false,trips:89,rating:4.9}]};
function fmt(nok,cur){const rate=EXCHANGE[cur]||1;const sym=COUNTRIES.find(c=>c.currency===cur)?.symbol||cur;const val=Math.round(nok*rate);return cur==="JPY"?sym+val:val+" "+sym;}

// ── Shared components ──────────────────────────────────────────────────────────

function Logo({size=1}){
  return (
    <div style={{display:"flex",alignItems:"center",gap:10*size}}>
      <div style={{width:38*size,height:38*size,border:"1.5px solid "+G.gold,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
        <svg width={20*size} height={20*size} viewBox="0 0 20 20">
          <path d="M2 8h16l-1.5 7H3.5L2 8z" fill="none" stroke={G.gold} strokeWidth="1.2"/>
          <rect x="5" y="4" width="10" height="5" rx="1" fill="none" stroke={G.gold} strokeWidth="1.2"/>
          <circle cx="6" cy="16" r="1.5" fill={G.gold}/>
          <circle cx="14" cy="16" r="1.5" fill={G.gold}/>
          <path d="M10 4 L10 2 M8 2 L12 2" stroke={G.gold} strokeWidth="1" strokeLinecap="round"/>
        </svg>
        <div style={{position:"absolute",top:-3*size,right:-3*size,width:6*size,height:6*size,background:G.gold}}/>
      </div>
      <div>
        <div style={{fontSize:19*size,fontWeight:300,color:G.white,letterSpacing:4*size,lineHeight:1,textTransform:"uppercase"}}>TAXI<span style={{color:G.gold,fontWeight:700}}>NOW</span></div>
        <div style={{fontSize:7*size,color:G.dim,letterSpacing:3*size,marginTop:1}}>PREMIUM TRANSPORT</div>
      </div>
    </div>
  );
}

function Mono({children,style={}}){
  return <span style={{fontFamily:"'Courier New',monospace",letterSpacing:1,...style}}>{children}</span>;
}

function GoldLine(){return <div style={{height:1,background:"linear-gradient(90deg,transparent,"+G.gold+",transparent)",margin:"16px 0",opacity:0.4}}/>;}

function Tag({children,color=G.gold}){
  return <span style={{fontSize:10,fontWeight:700,letterSpacing:2,color,border:"1px solid "+color,padding:"3px 10px",textTransform:"uppercase"}}>{children}</span>;
}

function Pill({children,active=false,color=G.gold}){
  return <span style={{fontSize:11,fontWeight:600,letterSpacing:0.5,color:active?G.black:color,background:active?color:"transparent",border:"1px solid "+color,borderRadius:2,padding:"4px 12px"}}>{children}</span>;
}

function PrimaryBtn({children,onClick,disabled=false}){
  return (
    <button onClick={!disabled?onClick:undefined} disabled={disabled}
      style={{width:"100%",padding:"16px 24px",background:disabled?G.ghost:G.gold,color:disabled?G.dim:G.black,border:"none",fontSize:13,fontWeight:700,letterSpacing:3,textTransform:"uppercase",cursor:disabled?"not-allowed":"pointer",fontFamily:"inherit"}}>
      {children}
    </button>
  );
}

function SecondaryBtn({children,onClick}){
  return (
    <button onClick={onClick}
      style={{width:"100%",padding:"15px 24px",background:"transparent",color:G.gold,border:"1px solid "+G.gold,fontSize:13,fontWeight:600,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>
      {children}
    </button>
  );
}

function GhostBtn({children,onClick}){
  return (
    <button onClick={onClick}
      style={{width:"100%",padding:"14px 24px",background:G.ghost,color:G.silver,border:"1px solid "+G.lineW,fontSize:13,fontWeight:500,letterSpacing:1,cursor:"pointer",fontFamily:"inherit"}}>
      {children}
    </button>
  );
}

function DangerBtn({children,onClick}){
  return (
    <button onClick={onClick}
      style={{width:"100%",padding:"14px 24px",background:G.red,color:G.white,border:"none",fontSize:13,fontWeight:700,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>
      {children}
    </button>
  );
}

function Field({label,value,onChange,placeholder,type="text",icon}){
  return (
    <div style={{marginBottom:14}}>
      {label&&<div style={{fontSize:10,color:G.dim,letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>{label}</div>}
      <div style={{position:"relative",borderBottom:"1px solid "+G.line,display:"flex",alignItems:"center"}}>
        {icon&&<span style={{fontSize:15,marginRight:10,color:G.gold,flexShrink:0}}>{icon}</span>}
        <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
          style={{flex:1,background:"transparent",border:"none",padding:"12px 0",color:G.white,fontSize:15,outline:"none",fontFamily:"'Courier New',monospace",letterSpacing:0.5,caretColor:G.gold}}
          onFocus={e=>e.target.parentNode.style.borderBottomColor=G.gold}
          onBlur={e=>e.target.parentNode.style.borderBottomColor=G.line}
        />
      </div>
    </div>
  );
}

function Toggle({label,sub,checked,onChange}){
  return (
    <div onClick={()=>onChange(!checked)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 0",borderBottom:"1px solid "+G.lineW,cursor:"pointer"}}>
      <div>
        <div style={{fontSize:14,color:G.white}}>{label}</div>
        {sub&&<div style={{fontSize:11,color:G.dim,marginTop:2,letterSpacing:0.3}}>{sub}</div>}
      </div>
      <div style={{width:40,height:22,background:checked?G.gold:G.ghost,position:"relative",flexShrink:0,marginLeft:16,transition:"background 0.2s",border:"1px solid "+(checked?G.gold:G.dim)}}>
        <div style={{position:"absolute",top:2,left:checked?20:2,width:16,height:16,background:checked?G.black:G.dim,transition:"left 0.2s"}}/>
      </div>
    </div>
  );
}

function Avatar({text,size=44}){
  return (
    <div style={{width:size,height:size,border:"1.5px solid "+G.gold,display:"flex",alignItems:"center",justifyContent:"center",color:G.gold,fontWeight:700,fontSize:size*0.3,letterSpacing:1,flexShrink:0,fontFamily:"'Courier New',monospace"}}>
      {text}
    </div>
  );
}

function BottomNav({items,active,onChange}){
  return (
    <div style={{display:"flex",background:G.ink,borderTop:"1px solid "+G.line,padding:"8px 0 10px",flexShrink:0,position:"sticky",bottom:0,zIndex:50}}>
      {items.map(n=>{
        const on=active===n.id;
        return (
          <button key={n.id} onClick={()=>onChange(n.id)}
            style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"none",border:"none",cursor:"pointer",padding:"6px 0",fontFamily:"inherit"}}>
            <span style={{fontSize:18,filter:on?"none":"grayscale(1) opacity(0.4)"}}>{n.icon}</span>
            <span style={{fontSize:9,fontWeight:700,letterSpacing:2,color:on?G.gold:G.dim,textTransform:"uppercase"}}>{n.label}</span>
            {on&&<div style={{width:16,height:1.5,background:G.gold,marginTop:1}}/>}
          </button>
        );
      })}
    </div>
  );
}

function MapCanvas({route=false,progress=0}){
  const carX = route ? 60 + progress*260 : 200;
  const carY = route ? 104 - Math.sin(progress*Math.PI)*22 : 104;
  return (
    <svg viewBox="0 0 400 210" width="100%" height="100%" style={{display:"block"}}>
      <rect width="400" height="210" fill={G.black}/>
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke={G.ghost} strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="400" height="210" fill="url(#grid)" opacity="0.6"/>
      {[[0,52,400,52],[0,104,400,104],[0,156,400,156],[60,0,60,210],[140,0,140,210],[240,0,240,210],[320,0,320,210]].map(([x1,y1,x2,y2],i)=>(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={G.panel} strokeWidth={i<3?18:14}/>
      ))}
      {[[4,5,48,38],[64,5,68,38],[144,5,88,38],[244,5,68,38],[324,5,68,38],[4,58,48,38],[64,58,68,38],[144,58,88,38],[4,110,48,38],[64,110,68,38],[144,110,88,38],[244,110,68,38]].map(([x,y,w,h],i)=>(
        <rect key={"b"+i} x={x} y={y} width={w} height={h} fill={G.ink} stroke={G.ghost} strokeWidth="0.5"/>
      ))}
      {route ? <>
        <circle cx="60" cy="104" r="8" fill="none" stroke={G.green} strokeWidth="1.5"/>
        <circle cx="60" cy="104" r="3" fill={G.green}/>
        <path d={"M60 104 Q200 68 320 104"} stroke={G.gold} strokeWidth="1.5" fill="none" strokeDasharray="6 4" opacity="0.7"/>
        <circle cx="320" cy="104" r="8" fill="none" stroke={G.gold} strokeWidth="1.5"/>
        <circle cx="320" cy="104" r="3" fill={G.gold}/>
        <rect x={carX-10} y={carY-6} width="20" height="12" fill={G.card} stroke={G.gold} strokeWidth="1"/>
        <text x={carX} y={carY+4} textAnchor="middle" fontSize="9" fill={G.gold}>CAR</text>
      </> : <>
        <circle cx="200" cy="104" r="3" fill={G.gold}/>
        <circle cx="200" cy="104" r="18" fill="none" stroke={G.gold} strokeWidth="0.8" opacity="0.4" strokeDasharray="4 4"/>
        <circle cx="200" cy="104" r="34" fill="none" stroke={G.gold} strokeWidth="0.5" opacity="0.2"/>
        {[[120,76],[290,88],[160,140],[300,130]].map(([x,y],i)=>(
          <text key={i} x={x} y={y} fontSize="14" opacity="0.25">🚕</text>
        ))}
      </>}
    </svg>
  );
}

// ── Splash ────────────────────────────────────────────────────────────────────
function Splash({onDone}){
  const [s,setS]=React.useState(0);
  React.useEffect(()=>{
    const t1=setTimeout(()=>setS(1),100);
    const t2=setTimeout(()=>setS(2),700);
    const t3=setTimeout(()=>setS(3),1400);
    const t4=setTimeout(()=>onDone(),2800);
    return()=>[t1,t2,t3,t4].forEach(clearTimeout);
  },[]);
  return (
    <div style={{height:"100vh",background:G.black,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 39px,"+G.ghost+" 39px,"+G.ghost+" 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,"+G.ghost+" 39px,"+G.ghost+" 40px)",opacity:0.3}}/>
      {[200,140,80].map((r,i)=>(
        <div key={i} style={{position:"absolute",width:r*2,height:r*2,borderRadius:"50%",border:"1px solid "+G.gold,opacity:s>i?0.15:0,transform:"scale("+(s>i?1:0.3)+")",transition:"all "+(0.8+i*0.2)+"s ease "+(i*0.15)+"s"}}/>
      ))}
      <div style={{transform:"translateY("+(s>=1?0:30)+"px)",opacity:s>=1?1:0,transition:"all 0.7s cubic-bezier(0.16,1,0.3,1)",zIndex:2,textAlign:"center"}}>
        <Logo size={1.5}/>
      </div>
      <div style={{marginTop:28,opacity:s>=2?1:0,transition:"opacity 0.5s ease",zIndex:2}}>
        <GoldLine/>
        <div style={{fontSize:11,color:G.dim,letterSpacing:6,textTransform:"uppercase",textAlign:"center"}}>Always one ride away</div>
      </div>
      <div style={{position:"absolute",bottom:40,opacity:s>=3?1:0,transition:"opacity 0.5s",display:"flex",gap:8}}>
        {[0,1,2].map(i=>(<div key={i} style={{width:i===1?28:6,height:2,background:i===1?G.gold:G.dim,transition:"width 0.3s"}}/>))}
      </div>
    </div>
  );
}

// ── Auth ──────────────────────────────────────────────────────────────────────
function AuthScreen({onLogin}){
  const [tab,setTab]=React.useState("login");
  const [acc,setAcc]=React.useState("passenger");
  const [email,setEmail]=React.useState("");
  const [pw,setPw]=React.useState("");
  const [name,setName]=React.useState("");
  const [phone,setPhone]=React.useState("");
  const [drT,setDrT]=React.useState([]);
  const [err,setErr]=React.useState("");
  const tTypes=[{id:"car",icon:"🚕",label:"Car",desc:"Standard transport"},{id:"airport",icon:"✈️",label:"Airport",desc:"Airport transfers"},{id:"moving",icon:"📦",label:"Moving",desc:"Furniture & goods"}];
  const togDr=id=>setDrT(p=>p.includes(id)?p.filter(x=>x!==id):p.length<2?[...p,id]:p);
  function login(){setErr("");const u=(acc==="passenger"?DB.passengers:DB.drivers).find(u=>u.email===email&&u.password===pw);if(!u){setErr("Invalid credentials.");return;}onLogin({...u,accountType:acc});}
  function reg(){setErr("");if(!name||!email||!pw||!phone){setErr("Please fill all fields.");return;}if(acc==="driver"&&drT.length===0){setErr("Select at least one transport type.");return;}const u={id:Date.now(),name,email,phone,password:pw,trips:0,...(acc==="driver"?{types:drT,online:false,rating:5.0}:{})};if(acc==="passenger")DB.passengers.push(u);else DB.drivers.push(u);onLogin({...u,accountType:acc});}
  return (
    <div style={{minHeight:"100vh",background:G.black,display:"flex",flexDirection:"column"}}>
      <div style={{padding:"44px 28px 32px"}}>
        <Logo size={0.9}/>
        <GoldLine/>
        <div style={{fontSize:11,color:G.dim,letterSpacing:3,marginBottom:28}}>SIGN IN TO CONTINUE</div>
        <div style={{display:"flex",gap:0,marginBottom:28,border:"1px solid "+G.line}}>
          {[["passenger","PASSENGER"],["driver","DRIVER"]].map(([id,l])=>(
            <button key={id} onClick={()=>setAcc(id)} style={{flex:1,padding:"12px",background:acc===id?G.gold:"transparent",color:acc===id?G.black:G.dim,border:"none",cursor:"pointer",fontWeight:700,fontSize:11,letterSpacing:2,fontFamily:"inherit"}}>{l}</button>
          ))}
        </div>
        <div style={{display:"flex",gap:0,marginBottom:24}}>
          {[["login","SIGN IN"],["register","REGISTER"]].map(([id,l])=>(
            <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"10px",background:"transparent",color:tab===id?G.gold:G.dim,border:"none",borderBottom:"2px solid "+(tab===id?G.gold:"transparent"),cursor:"pointer",fontSize:11,fontWeight:700,letterSpacing:2,fontFamily:"inherit"}}>{l}</button>
          ))}
        </div>
        {tab==="register"&&<><Field label="Full Name" value={name} onChange={setName} placeholder="John Doe" icon="◈"/><Field label="Phone" value={phone} onChange={setPhone} placeholder="+1 555 000 000" icon="◈"/></>}
        <Field label="Email" value={email} onChange={setEmail} placeholder="your@email.com" type="email" icon="◈"/>
        <Field label="Password" value={pw} onChange={setPw} placeholder="••••••••" type="password" icon="◈"/>
        {tab==="register"&&acc==="driver"&&(
          <div style={{marginBottom:18}}>
            <div style={{fontSize:10,color:G.dim,letterSpacing:2,marginBottom:12}}>TRANSPORT TYPES (MAX 2)</div>
            {tTypes.map(tt=>(
              <div key={tt.id} onClick={()=>togDr(tt.id)} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 0",borderBottom:"1px solid "+G.lineW,cursor:"pointer"}}>
                <div style={{width:20,height:20,border:"1px solid "+(drT.includes(tt.id)?G.gold:G.dim),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {drT.includes(tt.id)&&<div style={{width:10,height:10,background:G.gold}}/>}
                </div>
                <span style={{fontSize:16}}>{tt.icon}</span>
                <div><div style={{fontSize:14,color:G.white,fontWeight:500}}>{tt.label}</div><div style={{fontSize:11,color:G.dim}}>{tt.desc}</div></div>
              </div>
            ))}
          </div>
        )}
        {err&&<div style={{fontSize:12,color:G.red,letterSpacing:0.5,marginBottom:14,padding:"10px 14px",border:"1px solid "+G.red+"44",background:G.red+"0d"}}>{err}</div>}
        <div style={{marginBottom:10}}><PrimaryBtn onClick={tab==="login"?login:reg}>{tab==="login"?"Sign In":"Create Account"}</PrimaryBtn></div>
        <GoldLine/>
        <div style={{fontSize:10,color:G.dim,letterSpacing:2,textAlign:"center",marginBottom:12}}>DEMO ACCESS</div>
        <div style={{display:"flex",gap:8}}>
          <GhostBtn onClick={()=>onLogin({...DB.passengers[0],accountType:"passenger"})}>Passenger Demo</GhostBtn>
          <GhostBtn onClick={()=>onLogin({...DB.drivers[0],accountType:"driver"})}>Driver Demo</GhostBtn>
        </div>
        <div style={{textAlign:"center",marginTop:20,fontSize:11,color:G.dim,letterSpacing:1}}>support@taxinow.com · +47 40 89 88 17</div>
      </div>
    </div>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function AboutScreen(){
  const tList=[{icon:"🚕",label:"Car",desc:"Standard passenger transport",av:true},{icon:"✈️",label:"Airport Transfer",desc:"Direct to/from airport",av:true},{icon:"📦",label:"Moving Service",desc:"Furniture & goods transport",av:true},{icon:"🚁",label:"Helicopter",desc:"Coming soon",av:false}];
  return (
    <div style={{flex:1,overflow:"auto",background:G.black}}>
      <div style={{padding:"28px 24px 0"}}>
        <Tag>About</Tag>
        <div style={{fontSize:28,fontWeight:300,color:G.white,letterSpacing:2,marginTop:12,textTransform:"uppercase"}}>TaxiNow</div>
        <GoldLine/>
      </div>
      <div style={{padding:"0 24px 32px"}}>
        <div style={{background:G.panel,padding:20,marginBottom:16,border:"1px solid "+G.line}}>
          <Logo size={0.85}/>
          <p style={{color:G.silver,fontSize:14,lineHeight:1.8,marginTop:16,letterSpacing:0.3}}>TaxiNow is an international transport platform operating in 30+ countries. We offer everyday rides, airport transfers, and moving services with premium vehicles and top-rated drivers.</p>
        </div>
        <div style={{background:G.panel,padding:20,marginBottom:16,border:"1px solid "+G.lineW}}>
          <Tag>Contact</Tag>
          <div style={{marginTop:14,display:"flex",flexDirection:"column",gap:12}}>
            <div style={{display:"flex",gap:12,alignItems:"center"}}><span style={{color:G.gold,fontSize:16}}>✉</span><span style={{color:G.white,fontSize:13,letterSpacing:0.5}}>support@taxinow.com</span></div>
            <div style={{display:"flex",gap:12,alignItems:"center"}}><span style={{color:G.gold,fontSize:16}}>☎</span><span style={{color:G.white,fontSize:13,letterSpacing:0.5}}>+47 40 89 88 17</span></div>
          </div>
        </div>
        <div style={{background:G.panel,padding:20,marginBottom:16,border:"1px solid "+G.lineW}}>
          <Tag>Services</Tag>
          <div style={{marginTop:14}}>
            {tList.map((s,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"13px 0",borderBottom:i<tList.length-1?"1px solid "+G.lineW:"none"}}>
                <span style={{fontSize:22}}>{s.icon}</span>
                <div style={{flex:1}}><div style={{color:G.white,fontWeight:500,fontSize:14}}>{s.label}</div><div style={{color:G.dim,fontSize:12,marginTop:2}}>{s.desc}</div></div>
                {!s.av&&<Tag>Soon</Tag>}
              </div>
            ))}
          </div>
        </div>
        <div style={{background:G.panel,padding:20,border:"1px solid "+G.lineW}}>
          <Tag>We Operate In</Tag>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:14}}>
            {COUNTRIES.map(c=>(<span key={c.name} style={{background:G.ghost,padding:"5px 12px",fontSize:12,color:G.silver,border:"1px solid "+G.lineW}}>{c.flag} {c.name}</span>))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── History ───────────────────────────────────────────────────────────────────
function HistoryScreen(){
  const hist=[{from:"Oslo Central",to:"Gardermoen Airport",date:"Today 08:14",price:"249 kr",type:"Airport",icon:"✈️"},{from:"Grünerløkka",to:"Majorstuen",date:"Yesterday 21:32",price:"98 kr",type:"Car",icon:"🚕"},{from:"Home",to:"IKEA Slependen",date:"May 2, 14:05",price:"599 kr",type:"Moving",icon:"📦"},{from:"Holmenkollen",to:"City Centre",date:"Apr 30, 09:17",price:"245 kr",type:"Car",icon:"🚕"}];
  return (
    <div style={{flex:1,overflow:"auto",background:G.black}}>
      <div style={{padding:"28px 24px 0"}}>
        <Tag>History</Tag>
        <div style={{fontSize:28,fontWeight:300,color:G.white,letterSpacing:2,marginTop:12,textTransform:"uppercase"}}>My Trips</div>
        <GoldLine/>
      </div>
      <div style={{padding:"0 24px 32px"}}>
        {hist.map((h,i)=>(
          <div key={i} style={{background:G.panel,marginBottom:12,border:"1px solid "+G.lineW,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",left:0,top:0,bottom:0,width:2,background:G.gold}}/>
            <div style={{padding:18}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div style={{display:"flex",gap:8,alignItems:"center"}}><span style={{fontSize:16}}>{h.icon}</span><Tag>{h.type}</Tag><Pill active color={G.green}>DONE</Pill></div>
                <Mono style={{fontSize:17,fontWeight:700,color:G.gold}}>{h.price}</Mono>
              </div>
              <div style={{display:"flex",gap:12}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:0,paddingTop:4}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:G.green}}/>
                  <div style={{width:1,height:16,background:G.gold,opacity:0.3}}/>
                  <div style={{width:6,height:6,background:G.gold}}/>
                </div>
                <div>
                  <div style={{fontSize:14,color:G.white,marginBottom:10}}>{h.from}</div>
                  <div style={{fontSize:14,color:G.silver}}>{h.to}</div>
                </div>
              </div>
              <div style={{marginTop:12,fontSize:10,color:G.dim,letterSpacing:1}}>{h.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Passenger Profile ─────────────────────────────────────────────────────────
function PassProfile({user,onLogout}){
  const ini=(user.name||"U").split(" ").map(x=>x[0]).join("").toUpperCase().slice(0,2);
  const items=[["Payment Methods","💳"],["Notifications","🔔"],["Privacy","🛡️"],["Help & Support","?"]];
  return (
    <div style={{flex:1,overflow:"auto",background:G.black}}>
      <div style={{padding:"28px 24px 0"}}>
        <Tag>Account</Tag>
        <div style={{fontSize:28,fontWeight:300,color:G.white,letterSpacing:2,marginTop:12,textTransform:"uppercase"}}>My Profile</div>
        <GoldLine/>
      </div>
      <div style={{padding:"0 24px 32px"}}>
        <div style={{background:G.panel,padding:22,marginBottom:16,border:"1px solid "+G.line,display:"flex",gap:18,alignItems:"center"}}>
          <Avatar text={ini} size={64}/>
          <div>
            <div style={{fontSize:20,color:G.white,fontWeight:300,letterSpacing:1}}>{user.name}</div>
            <div style={{fontSize:12,color:G.dim,marginTop:4,letterSpacing:0.5}}>{user.email}</div>
            <div style={{fontSize:12,color:G.dim,letterSpacing:0.5}}>{user.phone}</div>
            <div style={{display:"flex",gap:8,marginTop:10}}><Pill active>PASSENGER</Pill><Pill color={G.dim}>{user.trips} TRIPS</Pill></div>
          </div>
        </div>
        <div style={{background:G.panel,marginBottom:16,border:"1px solid "+G.lineW}}>
          {items.map(([l,ic],i)=>(
            <div key={l} style={{display:"flex",alignItems:"center",gap:14,padding:"16px 18px",borderBottom:i<items.length-1?"1px solid "+G.lineW:"none",cursor:"pointer"}}>
              <span style={{fontSize:16,color:G.gold}}>{ic}</span>
              <span style={{flex:1,fontSize:14,color:G.white,letterSpacing:0.3}}>{l}</span>
              <span style={{color:G.gold,fontSize:12}}>›</span>
            </div>
          ))}
        </div>
        <DangerBtn onClick={onLogout}>Sign Out</DangerBtn>
      </div>
    </div>
  );
}

// ── Booking ───────────────────────────────────────────────────────────────────
function BookingScreen({country,city,setCountry,setCity,showCC,setShowCC}){
  const [transport,setTrans]=React.useState("car");
  const [ccId,setCcId]=React.useState("economy");
  const [pickup,setPickup]=React.useState("");
  const [dest,setDest]=React.useState("");
  const [airport,setAirport]=React.useState("");
  const [wc,setWc]=React.useState(false);
  const [pets,setPets]=React.useState(false);
  const [scr,setScr]=React.useState("main");
  const [drv,setDrv]=React.useState(null);
  const [prog,setProg]=React.useState(0);
  const [elap,setElap]=React.useState(0);
  const [stars,setStars]=React.useState(0);
  const ref=React.useRef(null);
  const tTypes=[{id:"car",icon:"🚕",label:"Car",desc:"Standard",av:true,base:89},{id:"airport",icon:"✈️",label:"Airport",desc:"Transfers",av:true,base:249},{id:"moving",icon:"📦",label:"Moving",desc:"Furniture",av:true,base:599},{id:"helicopter",icon:"🚁",label:"Helicopter",desc:"Coming soon",av:false,base:2499}];
  const tt=tTypes.find(x=>x.id===transport);
  const cc=CAR_CLASSES.find(x=>x.id===ccId);
  const nok=(tt?.base||89)*(transport==="car"?(cc?.mult||1):1);
  const price=fmt(nok,country.currency);
  const airL=AIRPORTS[country.name]||[];
  function book(){if(transport==="airport"&&!airport)return;setDrv(DRIVERS[Math.floor(Math.random()*4)]);setScr("confirm");}
  function startRide(){setScr("tracking");setProg(0);setElap(0);ref.current=setInterval(()=>{setProg(p=>{if(p>=100){clearInterval(ref.current);setScr("done");return 100;}return p+2;});setElap(e=>e+1);},300);}
  function reset(){setScr("main");setPickup("");setDest("");setAirport("");setProg(0);setStars(0);}
  React.useEffect(()=>()=>clearInterval(ref.current),[]);

  if(scr==="confirm"&&drv)return(
    <div style={{flex:1,overflow:"auto",background:G.black}}>
      <div style={{height:190}}><MapCanvas route/></div>
      <div style={{padding:"24px 24px 0"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}><div style={{width:6,height:6,borderRadius:"50%",background:G.green}}/><Tag>Driver Found</Tag></div>
        <div style={{background:G.panel,padding:20,marginBottom:14,border:"1px solid "+G.line}}>
          <div style={{display:"flex",gap:16,alignItems:"center",marginBottom:16}}>
            <Avatar text={drv.avatar} size={56}/>
            <div style={{flex:1}}>
              <div style={{fontSize:18,color:G.white,fontWeight:300,letterSpacing:1}}>{drv.name}</div>
              <div style={{display:"flex",gap:6,alignItems:"center",marginTop:4}}><span style={{color:G.gold}}>{"★".repeat(5)}</span><Mono style={{color:G.silver,fontSize:12}}>{drv.rating} ({drv.trips.toLocaleString()})</Mono></div>
            </div>
            <Mono style={{fontSize:22,color:G.gold,fontWeight:700}}>{price}</Mono>
          </div>
          <div style={{display:"flex",gap:1}}>
            {[[" Vehicle ",drv.car],["Plate",drv.plate],["ETA",cc?.eta||"5 min"]].map(([l,v],i)=>(
              <div key={i} style={{flex:1,background:G.ghost,padding:"10px 12px",textAlign:"center",margin:"0 1px"}}>
                <div style={{fontSize:9,color:G.dim,letterSpacing:1.5,marginBottom:4}}>{l.trim().toUpperCase()}</div>
                <Mono style={{fontSize:12,color:i===2?G.gold:G.white,fontWeight:600}}>{v}</Mono>
              </div>
            ))}
          </div>
        </div>
        {(wc||pets)&&<div style={{background:G.gold+"12",border:"1px solid "+G.gold+"44",padding:"10px 14px",marginBottom:14,fontSize:12,color:G.silver,letterSpacing:0.3}}>Options: {wc&&"Wheelchair"}{wc&&pets&&" · "}{pets&&"Pets"}</div>}
        <div style={{display:"flex",gap:8,marginBottom:10}}><SecondaryBtn onClick={()=>{}}>💬 Chat</SecondaryBtn><SecondaryBtn onClick={()=>{}}>📞 Call</SecondaryBtn></div>
        <div style={{marginBottom:8}}><PrimaryBtn onClick={startRide}>Begin Ride</PrimaryBtn></div>
        <GhostBtn onClick={()=>setScr("main")}>← Back</GhostBtn>
      </div>
    </div>
  );

  if(scr==="tracking")return(
    <div style={{flex:1,overflow:"auto",background:G.black}}>
      <div style={{height:190}}><MapCanvas route progress={prog/100}/></div>
      <div style={{padding:"20px 24px 0"}}>
        <div style={{background:G.panel,padding:20,marginBottom:14,border:"1px solid "+G.green+"33"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
            <div>
              <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:8}}><div style={{width:6,height:6,borderRadius:"50%",background:G.green}}/><span style={{fontSize:10,color:G.green,letterSpacing:2}}>IN PROGRESS</span></div>
              <Mono style={{fontSize:42,color:G.white,fontWeight:700,lineHeight:1}}>{elap}<span style={{fontSize:14,color:G.dim,marginLeft:6}}>sec</span></Mono>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:10,color:G.dim,letterSpacing:2,marginBottom:4}}>FARE</div>
              <Mono style={{fontSize:28,color:G.gold,fontWeight:700}}>{price}</Mono>
            </div>
          </div>
          <div style={{height:3,background:G.ghost,marginBottom:8}}>
            <div style={{height:"100%",background:G.gold,width:prog+"%",transition:"width 0.3s"}}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:G.dim,letterSpacing:0.5}}><span>▶ {pickup||city}</span><span>{dest||airport} ◀</span></div>
        </div>
        <div style={{background:G.panel,padding:16,marginBottom:14,border:"1px solid "+G.lineW,display:"flex",gap:14,alignItems:"center"}}>
          <Avatar text={drv?.avatar||"?"} size={42}/>
          <div><div style={{color:G.white,fontWeight:500}}>{drv?.name}</div><div style={{fontSize:12,color:G.dim,marginTop:2}}>{drv?.car} · {drv?.plate}</div></div>
        </div>
        <DangerBtn onClick={()=>{}}>🆘 Emergency</DangerBtn>
      </div>
    </div>
  );

  if(scr==="done")return(
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px",background:G.black}}>
      <div style={{width:80,height:80,border:"1.5px solid "+G.gold,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,marginBottom:20}}>✅</div>
      <div style={{fontSize:28,fontWeight:300,color:G.white,letterSpacing:4,textTransform:"uppercase",marginBottom:6}}>Arrived</div>
      <div style={{color:G.dim,fontSize:13,letterSpacing:1,marginBottom:28}}>{dest||airport}</div>
      <GoldLine/>
      <div style={{background:G.panel,padding:20,width:"100%",marginBottom:14,border:"1px solid "+G.line}}>
        {[["Total Fare",price,true],["Payment","Visa •••• 4832",false],["Driver",drv?.name,false]].map(([l,v,hi],i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"11px 0",borderBottom:i<2?"1px solid "+G.lineW:"none"}}>
            <span style={{fontSize:12,color:G.dim,letterSpacing:1,textTransform:"uppercase"}}>{l}</span>
            <Mono style={{fontWeight:hi?700:400,color:hi?G.gold:G.white,fontSize:hi?19:13}}>{v}</Mono>
          </div>
        ))}
      </div>
      <div style={{background:G.panel,padding:20,width:"100%",textAlign:"center",marginBottom:20,border:"1px solid "+G.lineW}}>
        <div style={{fontSize:10,color:G.dim,letterSpacing:2,marginBottom:14}}>RATE YOUR TRIP</div>
        <div style={{display:"flex",justifyContent:"center",gap:12}}>
          {[1,2,3,4,5].map(s=>(<span key={s} onClick={()=>setStars(s)} style={{fontSize:28,cursor:"pointer",color:s<=stars?G.gold:G.dim,transition:"color 0.15s"}}>★</span>))}
        </div>
      </div>
      <PrimaryBtn onClick={reset}>Done</PrimaryBtn>
    </div>
  );

  return (
    <div style={{flex:1,overflow:"auto",background:G.black}}>
      <div style={{padding:"18px 24px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <Logo size={0.8}/>
        <button onClick={()=>setShowCC(!showCC)} style={{background:"transparent",border:"1px solid "+G.line,padding:"6px 14px",color:G.silver,fontSize:12,cursor:"pointer",letterSpacing:1,fontFamily:"inherit"}}>{country.flag} {city} ▾</button>
      </div>
      {showCC&&(
        <div style={{position:"absolute",top:66,right:20,background:G.card,zIndex:200,minWidth:240,boxShadow:"0 20px 60px rgba(0,0,0,0.8)",maxHeight:340,overflowY:"auto",border:"1px solid "+G.line}}>
          {COUNTRIES.map(ct=>(
            <div key={ct.name}>
              <div style={{padding:"7px 16px",fontSize:9,color:G.gold,letterSpacing:2,background:G.panel,fontWeight:700}}>{ct.flag} {ct.name.toUpperCase()}</div>
              {ct.cities.map(ci=>(<button key={ci} onClick={()=>{setCountry(ct);setCity(ci);setShowCC(false);}} style={{display:"block",width:"100%",padding:"10px 24px",background:"none",border:"none",color:ci===city&&ct.name===country.name?G.gold:G.silver,textAlign:"left",cursor:"pointer",fontSize:13,fontFamily:"inherit",letterSpacing:0.5}}>{ci}</button>))}
            </div>
          ))}
        </div>
      )}
      <div style={{margin:"0 24px",border:"1px solid "+G.lineW,overflow:"hidden",height:175}}><MapCanvas hasRoute={!!dest}/></div>
      <div style={{margin:"16px 24px 0",background:G.panel,padding:18,border:"1px solid "+G.line}}>
        <div style={{fontSize:10,color:G.gold,letterSpacing:2,marginBottom:14}}>WHERE TO?</div>
        {transport==="airport"?(
          <>
            <select value={airport} onChange={e=>setAirport(e.target.value)} style={{background:"transparent",border:"none",borderBottom:"1px solid "+G.line,padding:"10px 0",width:"100%",color:airport?G.white:G.dim,fontSize:14,outline:"none",fontFamily:"'Courier New',monospace",marginBottom:12}}>
              <option value="" style={{background:G.card}}>Select airport...</option>
              {airL.map(a=><option key={a} style={{background:G.card}}>{a}</option>)}
            </select>
            <Field label="Pickup Address" value={pickup} onChange={setPickup} placeholder="Your address" icon="◈"/>
          </>
        ):transport==="moving"?(
          <><Field label="From" value={pickup} onChange={setPickup} placeholder="Current address" icon="◈"/><Field label="To" value={dest} onChange={setDest} placeholder="New address" icon="◈"/></>
        ):(
          <><Field label="Pickup" value={pickup} onChange={setPickup} placeholder="Your location" icon="◈"/><Field label="Destination" value={dest} onChange={setDest} placeholder="Where to?" icon="◈"/></>
        )}
      </div>
      <div style={{margin:"14px 24px 0"}}>
        <div style={{fontSize:10,color:G.dim,letterSpacing:2,marginBottom:10}}>TRANSPORT TYPE</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:G.lineW}}>
          {tTypes.map(tt2=>{
            const sel=transport===tt2.id;
            return (
              <div key={tt2.id} onClick={()=>tt2.av&&setTrans(tt2.id)} style={{background:sel?G.gold+"15":G.panel,padding:"14px 12px",cursor:tt2.av?"pointer":"default",opacity:tt2.av?1:0.4,textAlign:"center",border:sel?"1px solid "+G.gold:"1px solid transparent",position:"relative"}}>
                <div style={{fontSize:26}}>{tt2.icon}</div>
                <div style={{fontSize:12,fontWeight:700,color:sel?G.gold:G.white,letterSpacing:0.5,marginTop:4}}>{tt2.label}</div>
                <div style={{fontSize:10,color:G.dim,marginTop:2}}>{tt2.av?fmt(tt2.base,country.currency):tt2.desc}</div>
                {!tt2.av&&<div style={{position:"absolute",top:4,right:4,fontSize:8,color:G.gold,letterSpacing:1,border:"1px solid "+G.gold,padding:"1px 5px"}}>SOON</div>}
              </div>
            );
          })}
        </div>
      </div>
      {transport==="car"&&(
        <div style={{margin:"14px 24px 0"}}>
          <div style={{fontSize:10,color:G.dim,letterSpacing:2,marginBottom:10}}>CAR CLASS</div>
          <div style={{display:"flex",flexDirection:"column",gap:1}}>
            {CAR_CLASSES.map(cc2=>{
              const sel=ccId===cc2.id;
              return (
                <div key={cc2.id} onClick={()=>setCcId(cc2.id)} style={{display:"flex",alignItems:"center",gap:14,padding:"13px 16px",background:sel?G.gold+"0d":G.panel,cursor:"pointer",border:sel?"1px solid "+G.line:"1px solid transparent"}}>
                  {sel?<div style={{width:2,height:32,background:G.gold,marginRight:6,flexShrink:0}}/>:<div style={{width:2,height:32,marginRight:6,flexShrink:0}}/>}
                  <span style={{fontSize:22}}>{cc2.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{color:sel?G.gold:G.white,fontWeight:600,fontSize:14,letterSpacing:0.3}}>{cc2.label}</div>
                    <div style={{color:G.dim,fontSize:11,marginTop:1}}>{cc2.desc} · {cc2.eta}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <Mono style={{color:sel?G.gold:G.silver,fontSize:15,fontWeight:700}}>{fmt(89*cc2.mult,country.currency)}</Mono>
                    <div style={{fontSize:10,color:G.dim,marginTop:2}}>{cc2.seats} seats</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div style={{margin:"14px 24px 0",background:G.panel,padding:"0 16px",border:"1px solid "+G.lineW}}>
        <Toggle label="♿ Wheelchair Accessible" sub="Vehicle adapted for wheelchair users" checked={wc} onChange={setWc}/>
        <Toggle label="🐾 Pets Allowed" sub="Bring your dog, cat, etc." checked={pets} onChange={setPets}/>
      </div>
      <div style={{margin:"16px 24px 28px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:G.panel,padding:"14px 18px",marginBottom:10,border:"1px solid "+G.line}}>
          <div><div style={{fontSize:9,color:G.dim,letterSpacing:2}}>ESTIMATED FARE</div><Mono style={{fontSize:26,color:G.gold,fontWeight:700}}>{price}</Mono></div>
          <div style={{textAlign:"right"}}><div style={{fontSize:9,color:G.dim,letterSpacing:2}}>PAYMENT</div><div style={{fontSize:13,color:G.white,marginTop:2}}>Visa •••• 4832</div></div>
        </div>
        <PrimaryBtn onClick={book} disabled={transport==="airport"?!airport:(!pickup&&!dest)}>Book {tt?.label} →</PrimaryBtn>
      </div>
    </div>
  );
}

// ── Passenger App ─────────────────────────────────────────────────────────────
function PassengerApp({user,onLogout}){
  const [tab,setTab]=React.useState("home");
  const [country,setCountry]=React.useState(COUNTRIES[0]);
  const [city,setCity]=React.useState(COUNTRIES[0].cities[0]);
  const [showCC,setShowCC]=React.useState(false);
  const nav=[{id:"home",icon:"🏠",label:"Home"},{id:"trips",icon:"🕐",label:"Trips"},{id:"profile",icon:"👤",label:"Profile"},{id:"about",icon:"ℹ️",label:"About"}];
  return (
    <div style={{background:G.black,minHeight:"100vh",display:"flex",flexDirection:"column",maxWidth:430,margin:"0 auto",position:"relative"}}>
      {tab==="home"&&<BookingScreen country={country} city={city} setCountry={setCountry} setCity={setCity} showCC={showCC} setShowCC={setShowCC}/>}
      {tab==="trips"&&<HistoryScreen/>}
      {tab==="profile"&&<PassProfile user={user} onLogout={onLogout}/>}
      {tab==="about"&&<AboutScreen/>}
      <BottomNav items={nav} active={tab} onChange={id=>{setTab(id);setShowCC(false);}}/>
    </div>
  );
}

// ── Driver App ────────────────────────────────────────────────────────────────
function DriverApp({user,onLogout}){
  const [tab,setTab]=React.useState("dash");
  const [online,setOnline]=React.useState(false);
  const [inRide,setInRide]=React.useState(false);
  const [req,setReq]=React.useState(null);
  const [elap,setElap]=React.useState(0);
  const [earn,setEarn]=React.useState(1240);
  const ref=React.useRef(null);
  const aTypes=user.types||["car"];
  const tLbl={car:"Car",airport:"Airport",moving:"Moving"};
  function toggle(){if(online){setOnline(false);setInRide(false);setReq(null);clearInterval(ref.current);return;}setOnline(true);setTimeout(()=>setReq({from:"Grünerløkka",to:"Oslo S",price:"118 kr",pass:"Kari Olsen",rating:4.8}),2000);}
  function accept(){setReq(null);setInRide(true);setElap(0);ref.current=setInterval(()=>setElap(e=>e+1),1000);}
  function complete(){clearInterval(ref.current);setInRide(false);setEarn(e=>e+118);setTimeout(()=>{if(online)setReq({from:"Majorstuen",to:"Sentrum",price:"89 kr",pass:"Per Larsen",rating:4.9});},2500);}
  React.useEffect(()=>()=>clearInterval(ref.current),[]);
  const nav=[{id:"dash",icon:"🗺️",label:"Drive"},{id:"earnings",icon:"💰",label:"Earnings"},{id:"profile",icon:"👤",label:"Profile"},{id:"about",icon:"ℹ️",label:"About"}];
  const ini=(user.name||"D").split(" ").map(x=>x[0]).join("").toUpperCase().slice(0,2);
  return (
    <div style={{background:G.black,minHeight:"100vh",display:"flex",flexDirection:"column",maxWidth:430,margin:"0 auto"}}>
      {tab==="dash"&&(
        <div style={{flex:1,overflow:"auto"}}>
          <div style={{padding:"20px 24px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <Logo size={0.78}/>
            <div style={{display:"flex",alignItems:"center",gap:8,border:"1px solid "+(online?G.green+"66":G.lineW),padding:"6px 14px"}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:online?G.green:G.dim}}/>
              <span style={{fontSize:11,color:online?G.green:G.dim,letterSpacing:1.5}}>{online?"ONLINE":"OFFLINE"}</span>
            </div>
          </div>
          <div style={{margin:"0 24px 16px",border:"1px solid "+G.lineW,overflow:"hidden",height:185}}><MapCanvas route={inRide}/></div>
          <div style={{margin:"0 24px 14px",background:G.panel,padding:20,border:"1px solid "+(online?G.line:G.lineW)}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div>
                <div style={{fontSize:16,color:G.white,fontWeight:300,letterSpacing:1}}>{online?"Ready for Rides":"Go Online"}</div>
                <div style={{fontSize:12,color:G.dim,marginTop:3,letterSpacing:0.3}}>{online?"New bookings may come in":"Toggle to receive trips"}</div>
              </div>
              <div onClick={toggle} style={{width:52,height:28,background:online?G.gold:G.ghost,position:"relative",cursor:"pointer",border:"1px solid "+(online?G.gold:G.dim),transition:"background 0.2s"}}>
                <div style={{position:"absolute",top:2,left:online?26:2,width:22,height:22,background:online?G.black:G.dim,transition:"left 0.25s"}}/>
              </div>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{aTypes.map(id=>(<Pill key={id} active>{(tLbl[id]||id).toUpperCase()}</Pill>))}</div>
          </div>
          {req&&(
            <div style={{margin:"0 24px 14px",background:G.gold+"0a",padding:20,border:"1.5px solid "+G.gold+"55"}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:14}}><span style={{fontSize:14}}>⚡</span><Tag>New Booking</Tag></div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:16}}>
                <div>
                  <div style={{fontSize:10,color:G.dim,letterSpacing:1.5,marginBottom:8}}>FROM → TO</div>
                  <div style={{fontSize:16,color:G.white}}>{req.from}</div>
                  <div style={{fontSize:16,color:G.gold,marginTop:2}}>{req.to}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <Mono style={{fontSize:26,color:G.gold,fontWeight:700}}>{req.price}</Mono>
                  <div style={{fontSize:11,color:G.dim,marginTop:3}}>👤 {req.pass} ⭐{req.rating}</div>
                </div>
              </div>
              <div style={{display:"flex",gap:8}}><GhostBtn onClick={()=>setReq(null)}>Decline</GhostBtn><PrimaryBtn onClick={accept}>Accept →</PrimaryBtn></div>
            </div>
          )}
          {inRide&&(
            <div style={{margin:"0 24px 14px",background:G.panel,padding:20,border:"1px solid "+G.green+"44"}}>
              <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:14}}><div style={{width:6,height:6,borderRadius:"50%",background:G.green}}/><Tag color={G.green}>Active Ride</Tag></div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div><Mono style={{fontSize:38,color:G.white,fontWeight:700,lineHeight:1}}>{elap}</Mono><div style={{fontSize:11,color:G.dim,letterSpacing:1,marginTop:4}}>SECONDS</div></div>
                <div style={{textAlign:"right"}}><Mono style={{fontSize:26,color:G.gold,fontWeight:700}}>118 kr</Mono><div style={{fontSize:11,color:G.dim,marginTop:2}}>Oslo S</div></div>
              </div>
              <PrimaryBtn onClick={complete}>Complete Ride ✓</PrimaryBtn>
            </div>
          )}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,margin:"0 24px 24px",background:G.lineW}}>
            {[["Today's Earnings",earn+" kr","💰",G.gold],["Trips Today","6","🚕",G.green],["Rating","4.92","★",G.gold],["Online Time","3h 24m","⏱",G.silver]].map(([l,v,ic,col])=>(
              <div key={l} style={{background:G.panel,padding:"16px 18px"}}>
                <div style={{fontSize:18,marginBottom:8}}>{ic}</div>
                <Mono style={{fontSize:22,fontWeight:700,color:col}}>{v}</Mono>
                <div style={{fontSize:10,color:G.dim,marginTop:4,letterSpacing:1}}>{l.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab==="earnings"&&(
        <div style={{flex:1,overflow:"auto"}}>
          <div style={{padding:"28px 24px 0"}}><Tag>Finance</Tag><div style={{fontSize:28,fontWeight:300,color:G.white,letterSpacing:2,marginTop:12,textTransform:"uppercase"}}>Earnings</div><GoldLine/></div>
          <div style={{padding:"0 24px 32px"}}>
            <div style={{background:G.panel,padding:24,marginBottom:14,border:"1px solid "+G.line,textAlign:"center"}}>
              <div style={{fontSize:10,color:G.dim,letterSpacing:2,marginBottom:10}}>THIS WEEK</div>
              <Mono style={{fontSize:52,color:G.gold,fontWeight:700,lineHeight:1}}>{earn}<span style={{fontSize:18,color:G.dim,marginLeft:8}}>kr</span></Mono>
              <div style={{fontSize:13,color:G.silver,marginTop:8,letterSpacing:0.5}}>6 trips completed</div>
            </div>
            {["Monday","Tuesday","Wednesday","Thursday","Friday"].map((day,i)=>{
              const rows=[["1 400 kr","4"],["890 kr","3"],["2 100 kr","7"],["1 240 kr","4"],["—","0"]];
              const [p,tr]=rows[i]||["—","0"];
              return (
                <div key={day} style={{background:G.panel,padding:"14px 18px",marginBottom:2,display:"flex",justifyContent:"space-between",alignItems:"center",borderLeft:"3px solid "+(p==="—"?G.ghost:G.gold)}}>
                  <div><div style={{fontSize:14,color:G.white,letterSpacing:0.3}}>{day}</div><div style={{fontSize:11,color:G.dim,marginTop:2,letterSpacing:1}}>{tr} TRIPS</div></div>
                  <Mono style={{fontSize:16,fontWeight:700,color:p==="—"?G.dim:G.gold}}>{p}</Mono>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {tab==="profile"&&(
        <div style={{flex:1,overflow:"auto"}}>
          <div style={{padding:"28px 24px 0"}}><Tag>Driver</Tag><div style={{fontSize:28,fontWeight:300,color:G.white,letterSpacing:2,marginTop:12,textTransform:"uppercase"}}>My Profile</div><GoldLine/></div>
          <div style={{padding:"0 24px 32px"}}>
            <div style={{background:G.panel,padding:22,marginBottom:14,border:"1px solid "+G.line,display:"flex",gap:18,alignItems:"center"}}>
              <Avatar text={ini} size={64}/>
              <div><div style={{fontSize:18,color:G.white,fontWeight:300,letterSpacing:1}}>{user.name}</div><div style={{fontSize:12,color:G.dim,marginTop:4}}>{user.email}</div><div style={{display:"flex",gap:8,marginTop:10}}><Pill active>⭐ {user.rating||4.9}</Pill><Pill color={G.dim}>{user.trips} TRIPS</Pill></div></div>
            </div>
            <div style={{background:G.panel,padding:20,marginBottom:14,border:"1px solid "+G.lineW}}>
              <div style={{fontSize:10,color:G.gold,letterSpacing:2,marginBottom:14}}>MY TRANSPORT TYPES (MAX 2)</div>
              {[{id:"car",icon:"🚕",label:"Car",desc:"Standard transport"},{id:"airport",icon:"✈️",label:"Airport",desc:"Airport transfers"},{id:"moving",icon:"📦",label:"Moving",desc:"Furniture & goods"}].map((tt2,i,a)=>(
                <div key={tt2.id} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 0",borderBottom:i<a.length-1?"1px solid "+G.lineW:"none"}}>
                  <span style={{fontSize:22}}>{tt2.icon}</span>
                  <div style={{flex:1}}><div style={{color:G.white,fontSize:14}}>{tt2.label}</div><div style={{fontSize:11,color:G.dim,marginTop:1}}>{tt2.desc}</div></div>
                  {aTypes.includes(tt2.id)?<Pill active color={G.green}>ACTIVE</Pill>:<Pill color={G.dim}>INACTIVE</Pill>}
                </div>
              ))}
            </div>
            <DangerBtn onClick={onLogout}>Sign Out</DangerBtn>
          </div>
        </div>
      )}
      {tab==="about"&&<AboutScreen/>}
      <BottomNav items={nav} active={tab} onChange={setTab}/>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
function App(){
  const [phase,setPhase]=React.useState("splash");
  const [user,setUser]=React.useState(null);
  function login(u){setUser(u);setPhase("app");}
  function logout(){setUser(null);setPhase("auth");}
  return (
    <div style={{fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif",background:G.black,minHeight:"100vh"}}>
      {phase==="splash"&&<Splash onDone={()=>setPhase("auth")}/>}
      {phase==="auth"&&<AuthScreen onLogin={login}/>}
      {phase==="app"&&user&&(user.accountType==="driver"?<DriverApp user={user} onLogout={logout}/>:<PassengerApp user={user} onLogout={logout}/>)}
    </div>
  );
}

export default App;
