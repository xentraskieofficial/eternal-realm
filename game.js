const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
const TILE = 32, COLS = 20, ROWS = 12;
const player = {x:10,y:6,dir:'down',moving:false,hp:156};
const keys = new Set();
let channel = 'WORLD', lastMove = 0, toastTimer;
const obstacles = new Set();
for(let y=0;y<ROWS;y++) for(let x=0;x<COLS;x++) {
  if(x===0||y===0||x===COLS-1||y===ROWS-1) obstacles.add(`${x},${y}`);
}
[[4,3],[5,3],[4,4],[14,2],[15,2],[15,3],[2,8],[3,8],[16,8],[17,8],[8,2],[9,2],[12,9]].forEach(([x,y])=>obstacles.add(`${x},${y}`));
const npcs=[{x:6,y:5,color:'#c6a05a',name:'GUARD'},{x:14,y:6,color:'#8eb3c6',name:'LUNA'},{x:16,y:5,color:'#b98bc9',name:'MERCHANT'}];
function hash(x,y){return (x*37+y*71+x*y*13)%100;}
function tile(x,y){
  const h=hash(x,y);
  if(y===7||y===8) return '#87764d';
  if((x>7&&x<12&&y>2&&y<7)) return '#8b7b52';
  return h<18?'#456b43':h<42?'#4e7548':h<68?'#547b4a':'#5a804d';
}
function drawTree(x,y){
  const px=x*TILE,py=y*TILE;
  ctx.fillStyle='#2c4930';ctx.fillRect(px+7,py+17,19,13);
  ctx.fillStyle='#67472f';ctx.fillRect(px+13,py+17,8,14);
  ctx.fillStyle='#294c32';ctx.fillRect(px+3,py+3,26,19);
  ctx.fillStyle='#3d6840';ctx.fillRect(px+6,py,19,19);
  ctx.fillStyle='#6f9552';ctx.fillRect(px+8,py+3,7,5);
  ctx.fillStyle='#28472f';ctx.fillRect(px+3,py+19,5,5);
}
function drawCharacter(x,y,shirt,kind='player',name=''){
  const px=Math.round(x*TILE),py=Math.round(y*TILE);
  ctx.fillStyle='#30452e';ctx.fillRect(px+8,py+27,17,5);
  ctx.fillStyle='#513b2c';ctx.fillRect(px+10,py+23,5,8);ctx.fillRect(px+19,py+23,5,8);
  ctx.fillStyle=shirt;ctx.fillRect(px+8,py+12,18,14);
  ctx.fillStyle='#d6ad83';ctx.fillRect(px+9,py+2,16,13);
  ctx.fillStyle='#513b28';ctx.fillRect(px+8,py,18,6);ctx.fillRect(px+7,py+4,3,5);
  ctx.fillStyle='#30251d';ctx.fillRect(px+20,py+7,2,2);
  if(kind==='player'){ctx.fillStyle='#d7b85f';ctx.fillRect(px+27,py+12,3,17);ctx.fillRect(px+26,py+11,5,3);}
  if(name){ctx.font='10px monospace';ctx.textAlign='center';ctx.fillStyle='#f4e6bd';ctx.fillText(name,px+16,py-5);}
}
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let y=0;y<ROWS;y++)for(let x=0;x<COLS;x++){
    ctx.fillStyle=tile(x,y);ctx.fillRect(x*TILE,y*TILE,TILE,TILE);
    if(hash(x,y)%8===0){ctx.fillStyle='#759052';ctx.fillRect(x*TILE+6,y*TILE+8,3,3);}
    if(y===7||y===8){ctx.fillStyle='#9a895b';ctx.fillRect(x*TILE+3,y*TILE+5,5,3);}
  }
  // Small bridge and pond
  ctx.fillStyle='#355f75';ctx.fillRect(15*TILE,8*TILE,3*TILE,2*TILE);
  ctx.fillStyle='#8b7147';ctx.fillRect(14*TILE,8*TILE,5*TILE,10);
  ctx.fillStyle='#b49a62';for(let i=0;i<5;i++)ctx.fillRect((14+i)*TILE,8*TILE,3,10);
  // Trees
  [[2,2],[3,2],[2,3],[7,2],[8,2],[18,2],[18,3],[4,9],[5,9],[11,9],[12,9],[18,9],[1,6]].forEach(([x,y])=>drawTree(x,y));
  // Path details
  ctx.fillStyle='#b5a06a';ctx.fillRect(9*TILE+7,7*TILE+9,3,3);ctx.fillRect(11*TILE+19,8*TILE+14,3,3);
  npcs.forEach(n=>drawCharacter(n.x,n.y,n.color,'npc',n.name));
  drawCharacter(player.x,player.y,'#477ca3','player','ARTHUR');
  document.getElementById('coords').textContent=`X: ${Math.round(player.x)} · Y: ${Math.round(player.y)}`;
  const marker=document.querySelector('.map-player');
  marker.style.left=`${8+player.x/COLS*80}%`;marker.style.top=`${8+player.y/ROWS*75}%`;
  requestAnimationFrame(()=>{});
}
function blocked(x,y){return obstacles.has(`${x},${y}`)||npcs.some(n=>n.x===x&&n.y===y);}
function move(dx,dy){
  const now=performance.now();if(now-lastMove<115)return;lastMove=now;
  const nx=Math.max(1,Math.min(COLS-2,player.x+dx)),ny=Math.max(1,Math.min(ROWS-2,player.y+dy));
  player.dir=dx<0?'left':dx>0?'right':dy<0?'up':'down';
  if(!blocked(nx,ny)){player.x=nx;player.y=ny;draw();}
}
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),1800);}
function interact(){
  const near=npcs.find(n=>Math.abs(n.x-player.x)+Math.abs(n.y-player.y)<=1);
  if(near){showToast(near.name==='GUARD'?'Guard: The merchant was last seen near the bridge.':near.name==='MERCHANT'?'Merchant: Thank you for finding me!':'Luna: Ready for an adventure?');}
  else showToast('No one nearby. Explore the woods!');
}
window.addEventListener('keydown',e=>{
  const k=e.key.toLowerCase();
  if(['arrowup','arrowdown','arrowleft','arrowright',' '].includes(k))e.preventDefault();
  if(k==='enter'&&document.activeElement!==document.getElementById('chatInput')){document.getElementById('chatInput').focus();return;}
  if(k==='e'){interact();return;}
  if(k==='i'){document.getElementById('inventoryModal').classList.add('open');return;}
  if(/^[1-8]$/.test(k)){selectSkill(Number(k)-1);return;}
  if(k==='w'||k==='arrowup')move(0,-1);
  if(k==='s'||k==='arrowdown')move(0,1);
  if(k==='a'||k==='arrowleft')move(-1,0);
  if(k==='d'||k==='arrowright')move(1,0);
});
document.querySelectorAll('[data-move]').forEach(btn=>{
  const dirs={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
  btn.addEventListener('pointerdown',e=>{e.preventDefault();move(...dirs[btn.dataset.move]);});
});
function selectSkill(i){
  const slots=[...document.querySelectorAll('.slot')];slots.forEach(s=>s.classList.remove('selected'));slots[i].classList.add('selected');
  document.getElementById('skillStatus').textContent=slots[i].dataset.skill.toUpperCase()+' SELECTED';
  if(i===3){player.hp=Math.min(180,player.hp+24);document.getElementById('hpText').textContent=`${player.hp} / 180`;document.getElementById('hpBar').style.width=(player.hp/180*100)+'%';showToast('Health potion used +24 HP');}
}
document.querySelectorAll('.slot').forEach((s,i)=>s.addEventListener('click',()=>selectSkill(i)));
document.querySelectorAll('.chat-tabs button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.chat-tabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active');channel=b.dataset.channel;document.getElementById('chatChannel').textContent='['+channel+']';
}));
document.getElementById('chatForm').addEventListener('submit',e=>{
  e.preventDefault();const input=document.getElementById('chatInput');const value=input.value.trim();if(!value)return;
  const p=document.createElement('p');const tag=document.createElement('b');tag.textContent='['+channel+'] ';tag.className=channel.toLowerCase()+'-tag';
  const name=document.createElement('strong');name.textContent='Arthur: ';p.append(tag,name,document.createTextNode(value));document.getElementById('chatMessages').append(p);input.value='';
  const area=document.getElementById('chatMessages');area.scrollTop=area.scrollHeight;
});
document.getElementById('inventoryBtn').addEventListener('click',()=>document.getElementById('inventoryModal').classList.add('open'));
document.getElementById('closeModal').addEventListener('click',()=>document.getElementById('inventoryModal').classList.remove('open'));
document.getElementById('inventoryModal').addEventListener('click',e=>{if(e.target.id==='inventoryModal')e.currentTarget.classList.remove('open');});
document.getElementById('soundBtn').addEventListener('click',e=>{e.currentTarget.classList.toggle('muted');showToast('Sound is not connected in this demo.');});
draw();