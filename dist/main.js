(()=>{"use strict";var e={528:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(){this.id="",this.state={}}}},428:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GameNode=void 0;const r=s(528);t.GameNode=r.default},892:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});class s{constructor(){this._map=[],this._numRows=0,this._numCols=0}reset(e,t){this._numRows=e,this._numCols=t,this._map=[];for(let s=0;s<e;s++){const e=[];for(let s=0;s<t;s++)e.push(null);this._map.push(e)}}destroy(){this._map=[],this._numRows=0,this._numCols=0}getNeighbours(e,t){return{topLeft:this.getTopLeft(e,t),top:this.getTop(e,t),topRight:this.getTopRight(e,t),left:this.getLeft(e,t),center:this.getAt(e,t),right:this.getRight(e,t),bottomLeft:this.getBottomLeft(e,t),bottom:this.getBottom(e,t),bottomRight:this.getBottomRight(e,t)}}getLeft(e,t){return this.getAt(e,t-1)}getRight(e,t){return this.getAt(e,t+1)}getBottom(e,t){return this.getAt(e+1,t)}getBottomLeft(e,t){return this.getAt(e+1,t-1)}getBottomRight(e,t){return this.getAt(e+1,t+1)}getTop(e,t){return this.getAt(e-1,t)}getTopLeft(e,t){return this.getAt(e-1,t-1)}getTopRight(e,t){return this.getAt(e-1,t+1)}getAt(e,t){return this.isOutOfBounds(e,t)?null:this._map[e][t]}addAt(e,t,s){this.isOutOfBounds(e,t)||(this._map[e][t]=s)}removeAt(e,t){this.isOutOfBounds(e,t)||(this._map[e][t]=null)}isOutOfBounds(e,t){return e>this.numRows-1||t>this.numCols-1||e<0||t<0}forEach(e){for(let t=0;t<this.numRows;t++)for(let s=0;s<this.numCols;s++)e(this._map[t][s],t,s)}map(e){const t=[];for(let s=0;s<this.numRows;s++){t[s]=[];for(let r=0;r<this.numCols;r++)t[s][r]=e(this._map[s][r],s,r)}return s.from(t)}extract(e,t,r,a){const o=[];t=t>this.numRows-1?this.numRows-1:t,a=a>this.numCols-1?this.numCols-1:a,r=r<0?0:r;for(let s=e=e<0?0:e;s<=t;s++){const e=[];for(let t=r;t<=a;t++)e.push(this.getAt(s,t));o.push(e)}return s.from(o)}get numCols(){return this._numCols}get numRows(){return this._numRows}get data(){return this._map}static from(e){const t=new s,r=e.length,a=0==e.length?0:e[0].length;t.reset(r,a);for(let s=0;s<r;s++)for(let r=0;r<a;r++)t.addAt(s,r,e[s][r]);return t}}t.default=s},167:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Grid2D=void 0;const r=s(892);t.Grid2D=r.default},240:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(167),a=s(428),o=s(24);t.default=class{constructor(){this._grid=null,this._currentRow=0,this._currentCol=0}reset(e,t,s,i){this._pathCoords=[],this._grid=new r.Grid2D,this._grid.reset(e,t),this._currentRow=s,this._currentCol=i,this._grid.forEach(((e,t,s)=>{const r=new a.GameNode;r.state.type=t%2==0||s%2==0?o.default.WALL:o.default.BLOCK,this._grid.addAt(t,s,r)}))}getRows(){return this._grid.numRows}getCols(){return this._grid.numCols}getCurrentNode(){return this._grid.getAt(this._currentRow,this._currentCol)}getData(){return this._grid.data}isFinished(){return null===this._currentRow&&null===this._currentCol}finalize(){for(;!this.isFinished();)this.step()}step(){if(this.isFinished())return;const e=this._grid,t=this._pathCoords,s=this._currentRow,r=this._currentCol;e.getAt(s,r).state.type=o.default.FREE;const a=[{wall:this._grid.getLeft(s,r),target:this._grid.getLeft(s,r-1),row:s,col:r-2},{wall:this._grid.getRight(s,r),target:this._grid.getRight(s,r+1),row:s,col:r+2},{wall:this._grid.getTop(s,r),target:this._grid.getTop(s-1,r),row:s-2,col:r},{wall:this._grid.getBottom(s,r),target:this._grid.getBottom(s+1,r),row:s+2,col:r}].filter((e=>null!==e.wall&&null!==e.target&&e.target.state.type===o.default.BLOCK));if(a.length>0){const e=a[Math.round(Math.random()*(a.length-1))];e.wall.state.type=o.default.FREE,e.target.state.type=o.default.FREE,t.push([s,r]),this._currentRow=e.row,this._currentCol=e.col}else if(t.length>0){let e=t.pop();this._currentRow=e[0],this._currentCol=e[1]}else this._currentRow=null,this._currentCol=null}}},24:(e,t)=>{var s;Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.WALL="WALL",e.FREE="FREE",e.BLOCK="BLOCK"}(s||(s={})),t.default=s},40:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NODE_DISTANCE_VALUE=void 0;const r=s(167),a=s(428);t.default=class{constructor(){this.opened=[],this.closed=[]}createGraphe(e,t){const s=new r.Grid2D;return s.reset(e.numRows,e.numCols),e.forEach(((e,r,o)=>{const i=new a.GameNode;i.state.row=r,i.state.col=o,i.state.g=0,i.state.f=0,i.state.h=0,i.state.walkable=e===t,i.state.parent=null,s.addAt(r,o,i)})),s}resetGraphe(e){this.opened=new Array,this.closed=new Array,e.forEach(((e,t,s)=>{e&&(e.state.row=t,e.state.col=s,e.state.g=0,e.state.f=0,e.state.h=0,e.state.parent=null)}))}findPath(e,s,r,a=!1){this.opened=new Array,this.closed=new Array,this._addToOpenList(s);let o=!0;for(;o;){if(this.opened.sort(((e,t)=>e.state.f<t.state.f?-1:1)),0===this.opened.length||this.opened[0]===r){o=!1;break}const s=this.opened[0];this._addToCloseList(s);const i=[e.getLeft(s.state.row,s.state.col),e.getRight(s.state.row,s.state.col),e.getTop(s.state.row,s.state.col),e.getBottom(s.state.row,s.state.col)];a&&i.push(e.getTopLeft(s.state.row,s.state.col),e.getTopRight(s.state.row,s.state.col),e.getBottomLeft(s.state.row,s.state.col),e.getBottomRight(s.state.row,s.state.col)),i.filter((e=>null!==e)).forEach((e=>{if(this._isOnCloseList(e)||!e.state||!e.state.walkable)return;const a=this._isOnOpenList(e),o=s.state.g+t.NODE_DISTANCE_VALUE,i=(Math.abs(r.state.row-e.state.row)+Math.abs(r.state.col-e.state.col))*t.NODE_DISTANCE_VALUE,n=i+o;(a&&o<e.state.g||!a)&&(e.state.parent=s,e.state.g=o,e.state.h=i,e.state.f=n,a||this._addToOpenList(e))}))}const i=[];if(this.opened.length>0){let e=r;for(;e!=s;)i.unshift(e),e=e.state.parent;i.unshift(s)}return i}_addToCloseList(e){const t=this.opened.indexOf(e);t>-1&&this.opened.splice(t,1),this.closed.push(e)}_addToOpenList(e){const t=this.closed.indexOf(e);t>-1&&this.closed.splice(t,1),this.opened.push(e)}_isOnOpenList(e){return this.opened.indexOf(e)>-1}_isOnCloseList(e){return this.closed.indexOf(e)>-1}},t.NODE_DISTANCE_VALUE=10},904:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PathFinder2D=t.MazeNodeType=t.Maze2D=void 0;const r=s(240);t.Maze2D=r.default;const a=s(24);t.MazeNodeType=a.default;const o=s(40);t.PathFinder2D=o.default},680:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(91),a=s(224),o=s(376),i=s(660);class n extends r.Emitter{constructor(){super()}reset(){const e=this._container.resolve(a.default.UID_SERVICE),t=this._container.resolve(a.default.BATTLEFIELD_REPOSITORY);e.reset(),t.reset()}init(e){e.reset(),o.configIOC(e),o.configFacade(e),this._facade=e.resolve(a.default.APP_FACADE),this._container=e,this.reset()}getVersion(){return i.version}getFacade(){return this._facade}createBattleField(e){return this.getFacade().query(a.default.CREATE_BATTLEFIELD,e)}getBattleFields(){return this.getFacade().getProxy(a.default.BATTLEFIELD_REPOSITORY).getAll()}getBattleFieldByID(e){return this.getFacade().getProxy(a.default.BATTLEFIELD_REPOSITORY).getOneBy("id",e)}doCycle(e,t,s=!1){return this.getFacade().query(a.default.DO_CYCLE,{id:e,numCycle:t,complete:s})}}t.default=n},772:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(224),a=s(492),o=s(688);t.default=class{execute(e){const t=e.getEmitter(),s=e.getPayload(),i=t.getService(r.default.BATTLEFIELD_FACTORY),n=t.getService(r.default.PATH_SERVICE),l=t.getProxy(r.default.BATTLEFIELD_REPOSITORY),d=i.fromData(s);return!d.atkSpawners.map((e=>{const t=new a.default(1,1,"",1,1,1,1,1,1,1,1,e.row,e.col);return 0!=n.findPath(t,d,o.default.TO_THE_DOOR).length})).includes(!1)&&(l.add(d),d)}}},672:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(224);t.default=class{async execute(e){const t=e.getEmitter(),s=e.getPayload(),a=t.getProxy(r.default.BATTLEFIELD_REPOSITORY).getOneBy("id",s.id),o=!0===s.complete;let i=null;if(null===a)return!1;if(i=await this._processCycle(t,a,s.numCycle),!o||i.gameover)return i;let n=0;for(;0==i.gameover&&n<1e4;)n++,s.numCycle++,i=await this._processCycle(t,a,s.numCycle);return i}async _processCycle(e,t,s){return await e.query(r.default.SPAWN_NEW_FIGHTERS,{id:t.id,numCycle:s}),await e.query(r.default.SEARCH_FOR_ENNEMIES,{id:t.id}),await e.query(r.default.SET_FIGHTERS_PATH,{id:t.id}),await e.query(r.default.MOVE_FIGHTERS,{id:t.id}),await e.query(r.default.FIGHT,{id:t.id}),await e.query(r.default.REMOVE_DEAD_FIGHTERS,{id:t.id}),await e.query(r.default.REMOVE_WINNERS,{id:t.id}),await e.query(r.default.GAME_OVER,{id:t.id})}}},944:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(224);t.default=class{execute(e){const t=e.getEmitter(),s=e.getPayload(),a=t.getProxy(r.default.BATTLEFIELD_REPOSITORY).getOneBy("id",s.id);return null!==a&&(a.attackers.concat(a.defenders).forEach((e=>{if(!e.enemy)return;const t=Math.max(0,e.phyAtk-e.enemy.phyDef),s=Math.max(0,e.magAtk-e.enemy.magDef)+t;e.enemy.hp=Math.max(0,e.enemy.hp-s)})),!0)}}},531:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(224);t.default=class{execute(e){const t=e.getEmitter(),s=e.getPayload(),a=t.getProxy(r.default.BATTLEFIELD_REPOSITORY).getOneBy("id",s.id),o={attackers:[],defenders:[],winners:[],attackerWins:!1,defenderWins:!1,gameover:!1,isDoorDead:!1,deadAttackers:[],deadDefenders:[]};if(null===a)return o;o.deadAttackers=a.deadAttackers,o.deadDefenders=a.deadDefenders,o.attackers=a.attackers,o.defenders=a.defenders,o.winners=a.winners;const i=a.atkSpawners.reduceRight(((e,t,s)=>e+t.fighters.length),0),n=a.attackers.length+i,l=o.winners.length,d=!(a.defenders.includes(a.door)&&a.door.hp>0);return o.isDoorDead=d,0==n?(o.gameover=!0,o.defenderWins=0==l,o.attackerWins=l>0,o):o}}},560:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(224);t.default=class{execute(e){const t=e.getEmitter(),s=e.getPayload(),a=t.getProxy(r.default.BATTLEFIELD_REPOSITORY).getOneBy("id",s.id);return null!==a&&(a.attackers.forEach((e=>{if(0===e.path.length||null!==e.enemy)return;const t=Math.min(e.path.length-1,e.speed);e.row=e.path[t].state.row,e.col=e.path[t].state.col,e.path.splice(0,t)})),a.defenders.forEach((e=>{if(0===e.path.length||null!==e.enemy)return;const t=Math.min(e.path.length-1,e.speed);e.row=e.path[t].state.row,e.col=e.path[t].state.col,e.path.splice(0,t)})),!0)}}},444:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(224);t.default=class{execute(e){const t=e.getEmitter(),s=e.getPayload(),a=t.getProxy(r.default.BATTLEFIELD_REPOSITORY).getOneBy("id",s.id);return null!==a&&(a.attackers.forEach((e=>{e.hp<=0&&(a.attackers.splice(a.attackers.indexOf(e),1),a.deadAttackers.push(e))})),a.defenders.forEach((e=>{e.hp<=0&&(a.defenders.splice(a.defenders.indexOf(e),1),a.deadDefenders.push(e))})),!0)}}},248:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(224);t.default=class{execute(e){const t=e.getEmitter(),s=e.getPayload(),a=t.getProxy(r.default.BATTLEFIELD_REPOSITORY).getOneBy("id",s.id);return null!==a&&(a.door.hp>0||a.defenders.includes(a.door)||a.attackers.forEach((e=>{e.row===a.targetRow&&e.col===a.targetCol&&(a.attackers.splice(a.attackers.indexOf(e),1),a.winners.push(e))})),!0)}}},284:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(224),a=s(800);t.default=class{execute(e){const t=e.getEmitter(),s=e.getPayload(),o=t.getProxy(r.default.BATTLEFIELD_REPOSITORY).getOneBy("id",s.id);return null!==o&&(o.attackers.forEach((e=>{const t=a.default.getEnnemiesInRadius(o.defenders,e.row,e.col,e.radius);e.enemy=a.default.getClosestEnemyIn(t,e.row,e.col)})),o.defenders.forEach((e=>{const t=a.default.getEnnemiesInRadius(o.attackers,e.row,e.col,e.radius);e.enemy=a.default.getClosestEnemyIn(t,e.row,e.col)})),!0)}}},140:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(224),a=s(688);t.default=class{execute(e){const t=e.getEmitter(),s=e.getPayload(),o=t.getService(r.default.PATH_SERVICE),i=t.getProxy(r.default.BATTLEFIELD_REPOSITORY).getOneBy("id",s.id);return null!==i&&(i.attackers.forEach((e=>{e.path.length>0?e.col==e.path[0].state.col&&e.row==e.path[0].state.row&&e.path.shift():e.path=o.findPath(e,i,a.default.TO_THE_DOOR)})),i.defenders.forEach((e=>{e!==i.door&&(e.path=o.findPath(e,i,a.default.TO_THE_CLOSEST_ENEMY))})),!0)}}},580:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(224);t.default=class{execute(e){const t=e.getEmitter(),s=e.getPayload(),a=t.getProxy(r.default.BATTLEFIELD_REPOSITORY).getOneBy("id",s.id);return null!==a&&(a.atkSpawners.forEach((e=>{const t=s.numCycle%e.frequency!=0,r=0===e.fighters.length;t||r||a.attackers.push(e.fighters.shift())})),a.dfdSpawners.forEach((e=>{const t=s.numCycle%e.frequency!=0,r=0===e.fighters.length;t||r||a.defenders.push(e.fighters.shift())})),!0)}}},964:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DoCycleCommand=t.GameOverCommand=t.FightCommand=t.RemoveWinnersCommand=t.RemoveDeadFightersCommand=t.MoveFightersCommand=t.SetFightersPathCommand=t.SearchForEnnemiesCommand=t.SpawnNewFightersCommand=t.CreateBattleFieldCommand=void 0;const r=s(772);t.CreateBattleFieldCommand=r.default;const a=s(580);t.SpawnNewFightersCommand=a.default;const o=s(284);t.SearchForEnnemiesCommand=o.default;const i=s(140);t.SetFightersPathCommand=i.default;const n=s(560);t.MoveFightersCommand=n.default;const l=s(944);t.FightCommand=l.default;const d=s(444);t.RemoveDeadFightersCommand=d.default;const u=s(248);t.RemoveWinnersCommand=u.default;const c=s(531);t.GameOverCommand=c.default;const h=s(672);t.DoCycleCommand=h.default},224:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});class s{}t.default=s,s.APP_FACADE="AppFacade",s.GAME_STORE_MODEL="GameStoreModel",s.FIGHT="Fight",s.GAME_OVER="GameOver",s.REMOVE_WINNERS="RemoveWinners",s.MOVE_FIGHTERS="MoveFighters",s.REMOVE_DEAD_FIGHTERS="RemoveDeadFighters",s.SET_FIGHTERS_PATH="SetFightersPath",s.CREATE_BATTLEFIELD="CreateBattleField",s.SPAWN_NEW_FIGHTERS="SpawnNewFighters",s.SEARCH_FOR_ENNEMIES="SearchForEnnemies",s.DO_CYCLE="DoCycle",s.BATTLEFIELD_REPOSITORY="BattleFieldRepository",s.FIGHTER_FACTORY="FighterFactory",s.SPAWNER_FACTORY="SpawnerFactory",s.BATTLEFIELD_FACTORY="BattleFieldFactory",s.PATH_SERVICE="PathService",s.UID_SERVICE="UIDService",s.SERIALIZER_SERVICE="SerializerService"},376:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.configFacade=t.configIOC=void 0;const r=s(152),a=s(224),o=s(880),i=s(264),n=s(840),l=s(860),d=s(696),u=s(451),c=s(964);t.configIOC=function(e){return e.reset(),e.register(a.default.APP_FACADE,(()=>new r.Facade),!0),e.register(a.default.DO_CYCLE,(()=>new c.DoCycleCommand),!1),e.register(a.default.GAME_OVER,(()=>new c.GameOverCommand),!1),e.register(a.default.FIGHT,(()=>new c.FightCommand),!1),e.register(a.default.REMOVE_WINNERS,(()=>new c.RemoveWinnersCommand),!1),e.register(a.default.REMOVE_DEAD_FIGHTERS,(()=>new c.RemoveDeadFightersCommand),!1),e.register(a.default.MOVE_FIGHTERS,(()=>new c.MoveFightersCommand),!1),e.register(a.default.SET_FIGHTERS_PATH,(()=>new c.SetFightersPathCommand),!1),e.register(a.default.CREATE_BATTLEFIELD,(()=>new c.CreateBattleFieldCommand),!1),e.register(a.default.SPAWN_NEW_FIGHTERS,(()=>new c.SpawnNewFightersCommand),!1),e.register(a.default.SEARCH_FOR_ENNEMIES,(()=>new c.SearchForEnnemiesCommand),!1),e.register(a.default.GAME_STORE_MODEL,(()=>new r.StoreModel),!0),e.register(a.default.BATTLEFIELD_REPOSITORY,(()=>new l.default(e.resolve(a.default.GAME_STORE_MODEL),"battlefields")),!0),e.register(a.default.FIGHTER_FACTORY,(()=>new i.default(e.resolve(a.default.UID_SERVICE))),!0),e.register(a.default.UID_SERVICE,(()=>new o.default),!0),e.register(a.default.PATH_SERVICE,(()=>new u.default),!0),e.register(a.default.SPAWNER_FACTORY,(()=>new n.default(e.resolve(a.default.UID_SERVICE),e.resolve(a.default.FIGHTER_FACTORY))),!0),e.register(a.default.BATTLEFIELD_FACTORY,(()=>new d.default(e.resolve(a.default.UID_SERVICE),e.resolve(a.default.SPAWNER_FACTORY),e.resolve(a.default.FIGHTER_FACTORY))),!0),e},t.configFacade=function(e){const t=e.resolve(a.default.APP_FACADE);return t.registerCommand(a.default.DO_CYCLE,e.get(a.default.DO_CYCLE)),t.registerCommand(a.default.GAME_OVER,e.get(a.default.GAME_OVER)),t.registerCommand(a.default.FIGHT,e.get(a.default.FIGHT)),t.registerCommand(a.default.REMOVE_DEAD_FIGHTERS,e.get(a.default.REMOVE_DEAD_FIGHTERS)),t.registerCommand(a.default.MOVE_FIGHTERS,e.get(a.default.MOVE_FIGHTERS)),t.registerCommand(a.default.SET_FIGHTERS_PATH,e.get(a.default.SET_FIGHTERS_PATH)),t.registerCommand(a.default.CREATE_BATTLEFIELD,e.get(a.default.CREATE_BATTLEFIELD)),t.registerCommand(a.default.SPAWN_NEW_FIGHTERS,e.get(a.default.SPAWN_NEW_FIGHTERS)),t.registerCommand(a.default.SEARCH_FOR_ENNEMIES,e.get(a.default.SEARCH_FOR_ENNEMIES)),t.registerCommand(a.default.REMOVE_WINNERS,e.get(a.default.REMOVE_WINNERS)),t.registerProxy(a.default.BATTLEFIELD_REPOSITORY,e.resolve(a.default.BATTLEFIELD_REPOSITORY)),t.registerService(a.default.PATH_SERVICE,e.resolve(a.default.PATH_SERVICE)),t.registerService(a.default.UID_SERVICE,e.resolve(a.default.UID_SERVICE)),t.registerService(a.default.SERIALIZER_SERVICE,e.resolve(a.default.SERIALIZER_SERVICE)),t.registerService(a.default.FIGHTER_FACTORY,e.resolve(a.default.FIGHTER_FACTORY)),t.registerService(a.default.SPAWNER_FACTORY,e.resolve(a.default.SPAWNER_FACTORY)),t.registerService(a.default.BATTLEFIELD_FACTORY,e.resolve(a.default.BATTLEFIELD_FACTORY)),t}},688:(e,t)=>{var s;Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.TO_THE_DOOR="TO_THE_DOOR",e.TO_THE_CLOSEST_ENEMY="TO_THE_CLOSEST_ENEMY"}(s||(s={})),t.default=s},860:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(100);class a extends r.default{}t.default=a},100:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(152);class a extends r.Proxy{constructor(e,t){super(),this._state=e,this._key=t,this.reset()}reset(){const e={};e[this._key]=new Array,this._state.setState(e)}add(e){const t=this.getAll();t.push(e);const s={};s[this._key]=t,this._state.setState(s)}remove(e){const t=this.getAll();t.splice(t.indexOf(e),1);const s={};s[this._key]=t,this._state.setState(s)}getAllBy(e,t){return this.getAll().filter((s=>s[e]===t))}getOneBy(e,t){return this.getAll().find((s=>s[e]===t))||null}getAll(){return this._state.getState()[this._key]}}t.default=a},556:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e,t,s,r,a,o,i,n,l,d,u=[],c=[],h=[],f=[],_=[]){this.id=e,this.name=t,this.attackerID=s,this.defenderID=r,this.atkSpawners=a,this.dfdSpawners=o,this.door=i,this.targetRow=n,this.targetCol=l,this.grid=d,this.attackers=u,this.defenders=c,this.winners=h,this.deadDefenders=f,this.deadAttackers=_}}},492:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e,t,s,r,a,o,i,n,l,d,u,c=0,h=0,f=null,_=[]){this.id=e,this.tplID=t,this.name=s,this.speed=r,this.radius=a,this.phyAtk=o,this.phyDef=i,this.magAtk=n,this.magDef=l,this.hp=d,this.hpMax=u,this.row=c,this.col=h,this.enemy=f,this.path=_}}},832:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e,t,s,r,a,o,i){this.id=e,this.name=t,this.ownerID=s,this.row=r,this.col=a,this.frequency=o,this.fighters=i}}},451:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(904),a=s(688),o=s(800);t.default=class{constructor(){this._pathfinder=new r.PathFinder2D}getPathFinder(){return this._pathfinder}findPath(e,t,s){const r=t.grid.getAt(e.row,e.col);let i=t.grid.getAt(t.door.row,t.door.col);if(s===a.default.TO_THE_CLOSEST_ENEMY){const s=t.attackers.includes(e)?t.defenders:t.attackers,r=null!==e.enemy?e.enemy:o.default.getClosestEnemyIn(s,e.row,e.col);if(null==r)return[];i=t.grid.getAt(r.row,r.col)}if(e.path.length>0){const t=e.path[e.path.length-1];if(t.state.row==i.state.row&&t.state.col==i.state.col){const t=e.path;return t[0].state.row==e.row&&t[0].state.col==e.col&&t.shift(),e.path}}this._pathfinder.resetGraphe(t.grid);const n=this._pathfinder.findPath(t.grid,r,i,!1);return 0==n.length||n[0].state.row==e.row&&n[0].state.col==e.col&&n.shift(),n}}},880:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(){this.ids=new Map}reset(){this.ids=new Map}createUID(e="no_category",t=-1){this.ids.has(e)||this.ids.set(e,[]);const s=this.ids.get(e),r=Math.max(...s,0),a=t>r+1?t:r+1;return s.push(a),a}}},696:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(167),a=s(904),o=s(556);t.default=class{constructor(e,t,s){this._uidService=e,this._spawnerFactory=t,this._fighterFactory=s,this.fromData=this.fromData.bind(this)}fromData(e){const t=this._uidService.createUID("battlefields",e.id),s=e.atkSpawners.map(this._spawnerFactory.fromData),i=e.dfdSpawners.map(this._spawnerFactory.fromData),n=this._fighterFactory.fromData(e.door),l=(new a.PathFinder2D).createGraphe(r.Grid2D.from(e.grid),0);return n.row=e.targetRow,n.col=e.targetCol,new o.default(t,e.name,e.attackerID,e.defenderID,s,i,n,e.targetRow,e.targetCol,l,[],[n])}}},264:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(492);t.default=class{constructor(e){this._uidService=e,this.fromData=this.fromData.bind(this)}fromData(e){const t=this._uidService.createUID("fighters",e.id);return new r.default(t,e.tplID,e.name,e.speed,e.radius,e.phyAtk,e.phyDef,e.magAtk,e.magDef,e.hp,e.hp)}}},840:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(832);t.default=class{constructor(e,t){this._uidService=e,this._fighterFactory=t,this.fromData=this.fromData.bind(this)}fromData(e){const t=this._uidService.createUID("spawners",e.id),s=e.fighters.flatMap((t=>{const s=[];for(let r=0;r<t.amount;r++){const r=this._fighterFactory.fromData(t.desc);r.active=!1,r.row=e.row,r.col=e.col,s.push(r)}return s}));return new r.default(t,e.name,e.ownerID,e.row,e.col,e.frequency,s)}}},800:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{static getInRadius(e,t,s,r){const a=[],o=t-r<0?0:t-r,i=s-r<0?0:s-r,n=t+r+1>e.numRows?e.numRows:t+r+1,l=s+r+1>e.numCols?e.numCols:s+r+1;for(let r=o;r<n;r++)for(let o=i;o<l;o++)r===t&&o===s||a.push(e.getAt(r,o));return a}static getEnnemiesInRadius(e,t,s,r){const a=t-r,o=s-r,i=t+r,n=s+r;return e.filter((e=>!(e.col<o||e.col>n||e.row<a||e.row>i)))}static getClosestEnemyIn(e,t,s){let r=1/0,a=null;for(let o=0;o<e.length;o++){const i=e[o].row-t,n=e[o].col-s,l=Math.sqrt(i*i+n*n);l<r&&(r=l,a=e[o])}return a}}},736:(e,t,s)=>{const r=s(152),a=s(680),o=s(224),i=new a.default,n=new r.Container;i.init(n),e.exports={enginetowerIdleEngine:i,consts:o.default}},660:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.version=void 0,t.version="1.1.4"},628:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(91);class a extends r.Emitter{constructor(){super(...arguments),this._proxies=new Map,this._mediators=new Map,this._services=new Map,this.sendNotification=(e,t={})=>{this.emit(e,t)},this.query=(e,t={})=>this.emit(e,t,!0).then((e=>1===e.length?e.shift():e))}registerCommand(e,t){this.subscribe(e,(e=>t.call(null).execute(e)))}registerProxy(e,t){t.setFacade(this),this._proxies.set(e,t)}registerMediator(e,t){t.setFacade(this),this._mediators.set(e,t)}registerService(e,t){this._services.set(e,t)}getService(e){return this._services.get(e)||null}getProxy(e){return this._proxies.get(e)||null}getMediator(e){return this._mediators.get(e)||null}}t.default=a},112:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.rootContainer=void 0;class s{constructor(){this.reset()}resolve(e){return this._map.has(e)?this._singleton.has(e)?(null===this._singleton.get(e)&&this._singleton.set(e,this._map.get(e).call(null)),this._singleton.get(e)):this._map.get(e).call(null):null}reset(){this._map=new Map,this._singleton=new Map}register(e,t,s=!1){this._map.delete(e),this._singleton.delete(e),this._map.set(e,t),s&&this._singleton.set(e,null)}get(e){return this._map.get(e)||null}}t.default=s,t.rootContainer=new s},516:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(112);t.default=function(e){const t=e.container||r.rootContainer,s=e.singleton||!1;return function(r){t.register(e.token,(()=>new r),s)}}},420:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(112);t.default=function(e,t=null){return null!==t?t.resolve(e):r.rootContainer.resolve(e)}},480:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(){this._state=null}setState(e){this._state=e}getState(){return this._state}resetState(){this._state=null}}},664:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(){this._facade=null}setFacade(e){this._facade=e}getFacade(){return this._facade}}},912:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(480);class a extends r.default{constructor(){super(...arguments),this._old=null}setState(e){const t={...this._state,...e};this._old=this._state,this._state=t,this.deepFreeze(this._state)}getState(){return this._state}getPrevState(){return this._old}resetState(){this._state=null,this._old=null}updated(){const e=this._state!==this._old;return this._state=this._old,e}deepFreeze(e){return Object.freeze(e)}}t.default=a},16:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(){this._config=null}load(e){null!==this._config&&(this._config.proxies.forEach((t=>{e.registerProxy(t.key,t.instance)})),this._config.mediators.forEach((t=>{e.registerMediator(t.key,t.instance)})),this._config.services.forEach((t=>{e.registerService(t.key,t.instance)})),this._config.commands.forEach((t=>{e.registerCommand(t.key,t.factory)})))}getConfiguration(){return this._config}configure(e){this._config=e}}},760:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(){this._facade=null}setFacade(e){this._facade=e}getFacade(){return this._facade}}},152:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.resolve=t.Injectable=t.CoffeeModule=t.Facade=t.Mediator=t.StoreModel=t.Proxy=t.Model=t.Container=void 0;const r=s(112);t.Container=r.default;const a=s(516);t.Injectable=a.default;const o=s(420);t.resolve=o.default;const i=s(480);t.Model=i.default;const n=s(664);t.Proxy=n.default;const l=s(912);t.StoreModel=l.default;const d=s(760);t.Mediator=d.default;const u=s(628);t.Facade=u.default;const c=s(16);t.CoffeeModule=c.default},984:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});var r=s(640),a=function(){function e(){this._observers=new Map}return e.prototype.emit=function(e,t,s){var a=this;void 0===s&&(s=!1);var o=this._observers.get(e)||[],i=new r.default(e,this,t),n=o.map((function(t){var r=null;if(t.limit>0||t.infinite?(t.limit--,r=t.func(i)):a.unsubscribe(e,t.func),s)return Promise.resolve(r)}));return Promise.all(n)},e.prototype.hasObservers=function(e){return void 0!==this._observers.get(e)},e.prototype.unsubscribe=function(e,t){if(this.isObserver(e,t)){var s=this._observers.get(e)||[],r=s.map((function(e){return e.func})).indexOf(t);s.splice(r,1),0===s.length&&this._observers.set(e,void 0)}},e.prototype.isObserver=function(e,t){return(this._observers.get(e)||[]).map((function(e){return e.func})).indexOf(t)>-1},e.prototype.subscribe=function(e,t,s){if(void 0===s&&(s=-1),this.isObserver(e,t))return!1;var r=this._observers.get(e)||[];return r.push({func:t,limit:s,infinite:s<0}),this._observers.set(e,r),!0},e.prototype.unsubscribeAll=function(){this._observers=new Map},e}();t.default=a},640:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t,s){this._type=e,this._emitter=t,this._payload=s}return e.prototype.getEventType=function(){return this._type},e.prototype.getEmitter=function(){return this._emitter},e.prototype.getPayload=function(){return this._payload},e}();t.default=s},91:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Notification=t.Emitter=void 0;var r=s(984);t.Emitter=r.default;var a=s(640);t.Notification=a.default}},t={};!function s(r){var a=t[r];if(void 0!==a)return a.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,s),o.exports}(736)})();