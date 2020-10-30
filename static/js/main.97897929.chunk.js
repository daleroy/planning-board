(this["webpackJsonpplanning-board"]=this["webpackJsonpplanning-board"]||[]).push([[0],{111:function(e,t,a){"use strict";a.r(t),a.d(t,"TASK_NAME_KEY",(function(){return be}));var n=a(3),r=a(0),i=a.n(r),o=a(6),c=a.n(o),s=(a(87),a(88),a(43)),u=a(10),l=a(18),d=a(142),p=a(144),f=a(146),h=a(147),v=a(148),m=a(149),b=a(150),j=a(67),y=a.n(j),g=a(152),O=Object(d.a)((function(e){return{menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}));function x(){var e=O(),t=i.a.useState(null),a=Object(l.a)(t,2),r=a[0],o=a[1],c=function(){o(null)};return Object(n.jsx)(p.a,{position:"static",children:Object(n.jsxs)(f.a,{children:[Object(n.jsx)(h.a,{edge:"start",className:e.menuButton,color:"inherit","aria-label":"menu",onClick:function(e){o(e.currentTarget)},children:Object(n.jsx)(y.a,{})}),Object(n.jsxs)(b.a,{id:"simple-menu",anchorEl:r,keepMounted:!0,open:Boolean(r),onClose:c,children:[Object(n.jsx)(s.b,{to:"/",children:Object(n.jsx)(g.a,{onClick:c,children:"Home"})}),Object(n.jsx)(s.b,{to:"/loadData",children:Object(n.jsx)(g.a,{onClick:c,children:"Load Data From File"})})]}),Object(n.jsx)(v.a,{variant:"h6",className:e.title}),Object(n.jsx)(m.a,{onClick:function(){},color:"inherit",children:"New Card"})]})})}var k,C=a(68),w=function(e){console.log("---------------------------"),k(e),console.log(e),console.log("---------------------------")},D=function(e,t,a,n){console.log(e)},T=function(e){console.log("---------------------------"),console.log(e),console.log("---------------------------")};var K=a(29),E=a(21),S=a(25),I=a.n(S),P=a(39),M=a(15),R=a(13),V=a(76),z=a(75),F=a(70),B=a.n(F),G=function(e){Object(V.a)(a,e);var t=Object(z.a)(a);function a(e){var n;return Object(M.a)(this,a),(n=t.call(this,e)).url=e,n.data=[],n}return Object(R.a)(a,[{key:"setData",value:function(e){this.data=e}},{key:"getData",value:function(e){if(this.data)return e}},{key:"processCsvData",value:function(){var e=Object(P.a)(I.a.mark((function e(t){var a;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.fetchCsv();case 2:a=e.sent,B.a.parse(a,{complete:t});case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"fetchCsv",value:function(){return fetch(this.url).then((function(e){var t=e.body.getReader(),a=new TextDecoder("utf-8");return t.read().then((function(e){return a.decode(e.value)}))}))}}],[{key:"getTasksProvider",value:function(){return new a("/data/test-data.csv")}},{key:"getTeamCapacityProvider",value:function(){return new a("/data/team-capacity.csv")}}]),a}(i.a.Component),L=a(151),A=function e(t,a){Object(M.a)(this,e),this.id=Object(L.a)(),this.mfProps=t,this.teamEstimates=a},N=function(){function e(){Object(M.a)(this,e)}return Object(R.a)(e,[{key:"compare",value:function(e,t){return e<t?-1:e===t?0:e>t?1:void 0}}]),e}(),_=function(){function e(t){var a=this;Object(M.a)(this,e),this.insert=function(e){for(var t=0;t<a.orderedValues.length;t++){var n=a.orderedValues[t];if(a.comparator.compare(e,n)<=0)return void a.orderedValues.splice(t,0,e)}a.orderedValues.push(e)},this.comparator=t||new N,this.valueSet=new Map,this.orderedValues=[]}return Object(R.a)(e,[{key:"add",value:function(e){this.valueSet.has(e)||(this.valueSet.set(e,!0),this.insert(e))}},{key:"length",value:function(){return this.orderedValues.length}}]),e}(),H=function(){function e(){Object(M.a)(this,e)}return Object(R.a)(e,null,[{key:"isBlank",value:function(e){return!e||/^\s*$/.test(e)}},{key:"isNotBlank",value:function(t){return!e.isBlank(t)}},{key:"log",value:function(e){console.log(e)}},{key:"logo",value:function(e,t){console.log(e+":%o: ",t)}}]),e}();H.extractColumn=function(e,t){return e.map((function(e){return e[t]}))},H.adder=function(e,t){return e+t},H.substractor=function(e,t){return e-t},H.removeItem=function(e,t){for(var a=0;a<e.length;++a)if(e[a].id===t)return void e.splice(a,1)};var J=function(){function e(){var t=this;Object(M.a)(this,e),this.addValue=function(e,a,n,r){H.log("In Add Value"),H.logo("rowKey",e),H.logo("teamEstimate",r);var i=new A(n,r);t.taskMaster.set(i.id,i),t.grid[e][a].taskList.push(i),t.handleAddCell(e,a,i)},this.handleAddCell=function(e,a,n){t.summarizeTeamEstimates(H.adder,e,a,n)},this.handleMove=function(e,a,n){var r=t.taskMaster.get(e),i=t.keyForCell(a),o=Object(l.a)(i,2),c=o[0],s=o[1],u=t.grid[c][s].taskList;H.removeItem(u,e),t.summarizeTeamEstimates(H.substractor,c,s,r);var d=t.keyForCell(n),p=Object(l.a)(d,2),f=p[0],h=p[1];t.grid[f][h].taskList.push(r),t.summarizeTeamEstimates(H.adder,f,h,r)},this.summarizeTeamEstimates=function(e,a,n,r){H.log("In Summarize"),H.logo("Row Key ",a),H.logo("Column Key ",n),H.logo("Task",r);var i=t.teamCapacitySummary.get(n),o=r.teamEstimates;if(o)for(var c=0,s=Object.entries(o);c<s.length;c++){var u=Object(l.a)(s[c],2),d=u[0],p=u[1],f=void 0;if(i.has(d))f=e(i.get(d).totalEstimate,p);else f=e(0,p);var h=t.teamCapacity[d],v=h.netCapacity-f,m=Object(K.a)(Object(K.a)({},h),{},{totalEstimate:f,pendingCapacity:v});i.set(d,m)}},this.grid={},this.teamCapacity={},this.columnKeys=new _,this.rowKeys=new _,this.cellIdToKeyMap=new Map,this.taskMaster=new Map,this.teamCapacitySummary=new Map}return Object(R.a)(e,[{key:"orderedRowKeys",value:function(){return this.rowKeys.orderedValues}},{key:"orderedColumnKeys",value:function(){return this.columnKeys.orderedValues}},{key:"generateId",value:function(e,t){return e+","+t}},{key:"initialize",value:function(e,t){var a=this;this.rowKeys=e.reduce((function(e,t){return e.add(t),e}),this.rowKeys),this.columnKeys=t.reduce((function(e,t){return e.add(t),e}),this.columnKeys);var n=-1,r=-1;this.orderedRowKeys().forEach((function(e){n+=1,a.grid[e]={},a.orderedColumnKeys().forEach((function(t){r+=1;var i=a.generateId(n,r);a.cellIdToKeyMap.set(i,{rowKey:e,columnKey:t}),a.grid[e][t]={id:i,taskList:[]}})),r=-1})),this.orderedColumnKeys().forEach((function(e){a.teamCapacitySummary.set(e,new Map)}))}},{key:"keyForCell",value:function(e){var t=this.cellIdToKeyMap.get(e);return[t.rowKey,t.columnKey]}},{key:"addTeamCapacity",value:function(e,t,a){var n={name:e,availableCapacity:t,rtbCapacity:a,netCapacity:t-a};this.teamCapacity[e]=n}},{key:"toString",value:function(){for(var e=0,t=Object.entries(this.grid);e<t.length;e++){var a=Object(l.a)(t[e],2),n=a[0],r=a[1];console.log("key=".concat(n)),console.log("valuetype=".concat(typeof r));for(var i=0,o=Object.entries(r);i<o.length;i++){var c=Object(l.a)(o[i],2),s=c[0],u=c[1];console.log("value.key=".concat(s)),console.log("value.value=".concat(u))}}}}]),e}(),W=function(){function e(){var t=this;Object(M.a)(this,e),this.setTaskData=function(e){console.log("Setting Task Data"),t.taskRawData=e},this.setTeamCapacity=function(e){console.log("Setting Team Capacity"),t.teamRawData=e},this.props={},this.props.rowKey="initiative",this.props.columnKey="period",this.props.teamPrefix="team.",this.props.capacity={},this.props.capacity.teamHeader="team",this.props.capacity.rtb="rtb",this.props.capacity.available="available_capacity",this.planGridData=new J}return Object(R.a)(e,[{key:"process",value:function(){var e=Object(P.a)(I.a.mark((function e(){return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.processTeamCapacityData();case 2:return e.next=4,this.processTaskData();case 4:return this.translate(),console.log(this.planGridData),e.abrupt("return",Promise.resolve(this.planGridData));case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"processTeamCapacityData",value:function(){var e=Object(P.a)(I.a.mark((function e(){var t;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=G.getTeamCapacityProvider(),e.next=3,t.processCsvData(this.setTeamCapacity);case 3:console.log("Done processing team Capacity Data");case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"processTaskData",value:function(){var e=Object(P.a)(I.a.mark((function e(){var t;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=G.getTasksProvider(),e.next=3,t.processCsvData(this.setTaskData);case 3:console.log("Done processing team task Data");case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"translate",value:function(){this.translateCsvToTeamData(),this.translateCsvToTaskData()}},{key:"translateCsvToTeamData",value:function(){if(this.teamRawData){for(var e=this.teamRawData.data,t=e[0],a=t.indexOf(this.props.capacity.teamHeader),n=t.indexOf(this.props.capacity.available),r=t.indexOf(this.props.capacity.rtb),i=e.length,o=1;o<i;++o){var c=e[o][a],s=parseInt(e[o][n]),u=parseInt(e[o][r]);this.planGridData.addTeamCapacity(c,s,u)}return this.planGridData}console.log("Trying to process CSV but no data found")}},{key:"translateCsvToTaskData",value:function(){if(this.taskRawData){var e=this.taskRawData.data,t=e[0],a=t.indexOf(this.props.rowKey),n=t.indexOf(this.props.columnKey),r=this.taskRawData.data.length,i=t.length,o=e.slice(1),c=H.extractColumn(o,a),s=H.extractColumn(o,n);this.planGridData.initialize(c,s);for(var u=1;u<r;++u){for(var l=void 0,d=void 0,p={},f={},h=0;h<i;++h){var v=e[u][h],m=t[h];if(h===a)l=v;else if(h===n)d=v;else if(m.startsWith(this.props.teamPrefix)){if(H.isNotBlank(v)){var b=parseInt(v);p[m]=b}}else f[m]=v}this.planGridData.addValue(l,d,f,p)}return this.planGridData}console.log("Trying to process CSV but no data found")}}],[{key:"getProcessor",value:function(){return new e}}]),e}(),Y=a(22);function $(){var e=Object(E.a)(["\nflex: 1 1 10px;\nfont-size: 14px;\nborder: 1px solid #d8e8f8;\n"]);return $=function(){return e},e}function q(){var e=Object(E.a)(["\nflex: 1 1 20%;\nborder: 1px solid black;\n"]);return q=function(){return e},e}function Q(){var e=Object(E.a)(["\ndisplay: flex;\nflex-wrap: nowrap;\npadding: 0 10px 0 10px;\n"]);return Q=function(){return e},e}var U=Y.a.div(Q()),X=Y.a.div(q()),Z=Y.a.div($());function ee(e){var t=e.teamCapacitySummary,a=function(e,t){var a=[];return e.forEach((function(e,t){e.availableCapacity;var r=e.name,i=e.netCapacity,o=e.pendingCapacity,c=(e.rtbCapacity,e.totalEstimate),s=r.split(".");s.shift();var u=s.join(" ");a.push(Object(n.jsx)(Z,{children:Object(n.jsxs)("div",{children:[Object(n.jsx)("div",{children:u}),Object(n.jsxs)("div",{children:["Available Capacity : ",i]}),Object(n.jsxs)("div",{children:["Total Estimate : ",c]}),Object(n.jsxs)("div",{children:["Pending Capacity : ",o]})]})},t))})),a};return Object(n.jsxs)(U,{children:[Object(n.jsx)(X,{children:"Capacity Summary"}),function(e){var t=[];return e?(e.forEach((function(e,r){t.push(Object(n.jsx)(X,{children:a(e)},r))})),t):t}(t)]})}var te=a(44);function ae(){var e=Object(E.a)(["\nflex: 1 1 20%;\nborder: 1px solid black;\n"]);return ae=function(){return e},e}function ne(){var e=Object(E.a)(["\nflex: 1 1 20%;\nborder: 1px solid black;\n"]);return ne=function(){return e},e}function re(){var e=Object(E.a)(["\nfont-weight: 700;\nfont-size: 18px;\nflex: 1 1 20%;\nborder: 1px solid black;\n"]);return re=function(){return e},e}function ie(){var e=Object(E.a)(["\ndisplay: flex;\nflex-wrap: nowrap;\npadding: 0 10px 0 10px;\n"]);return ie=function(){return e},e}function oe(){var e=Object(E.a)(["\nflex: 1 1 10px;\nbackground-color: #f0f8ff;\nborder: 1px solid #d8e8f8;\nfont-size: 14px;\n"]);return oe=function(){return e},e}function ce(){var e=Object(E.a)(["\nfont-size: 12px;\ncolor: #485757;\n"]);return ce=function(){return e},e}var se=Y.a.div(ce()),ue=Y.a.div(oe()),le=Y.a.div(ie()),de=Y.a.div(re()),pe=Y.a.div(ne()),fe=Y.a.h3(ae());var he=[{path:"/loadData",component:function(e){var t=e.callback;return k=t,Object(n.jsx)(C.a,{onDrop:w,onError:D,noDrag:!0,addRemoveButton:!0,onRemoveFile:T,children:Object(n.jsx)("span",{children:"Click to upload."})})}},{path:"/",component:function(){var e=i.a.useState({}),t=Object(l.a)(e,2),a=t[0],o=t[1];return Object(r.useEffect)((function(){W.getProcessor().process().then((function(e){window.gridData=e,o(e)}))}),[]),console.dir(a),Object(n.jsxs)(i.a.Fragment,{children:[Object(n.jsxs)(te.a,{onDragEnd:function(e){var t=e.destination,n=e.source,r=e.draggableId;t&&n&&r&&(a.handleMove(r,n.droppableId,t.droppableId),o(Object.assign({},a)))},children:[Object(n.jsxs)(le,{children:[Object(n.jsx)(fe,{children:"Initatives"}),function(e){var t=e.columnKeys;if(t)return t.orderedValues.map((function(e,t){return Object(n.jsx)(fe,{children:e},t)}))}(a)]}),function(e){var t=e.rowKeys,a=e.grid;if(t)return t.orderedValues.map((function(e,t){var i=function(e){return Object.keys(e).map((function(t){var a=e[t],i=a.id,o=a.taskList;return Object(n.jsx)(te.c,{droppableId:i,children:function(e){return Object(n.jsxs)(pe,Object(K.a)(Object(K.a)({ref:e.innerRef},e.droppableProps),{},{children:[e.placeholder,o.map((function(e,t){return Object(n.jsx)(te.b,{draggableId:e.id,index:t,children:function(a){return Object(r.createElement)(ue,Object(K.a)(Object(K.a)(Object(K.a)({},a.draggableProps),a.dragHandleProps),{},{ref:a.innerRef,key:t}),Object(n.jsx)("div",{children:e.mfProps.master_feature}),Object.keys(e.teamEstimates).map((function(t,a){return Object(n.jsxs)(se,{children:[t," : ",e.teamEstimates[t]]},a)})))}},e.id)}))]}))}},i)}))}(a[e]);return Object(n.jsxs)(le,{children:[Object(n.jsx)(de,{children:e}),i]},t)}))}(a)]}),Object(n.jsx)(ee,{teamCapacitySummary:a.teamCapacitySummary})]})}}];function ve(){return Object(n.jsxs)(s.a,{children:[Object(n.jsx)(x,{}),Object(n.jsx)(u.c,{children:he.map((function(e,t){return Object(n.jsx)(u.a,{path:e.path,component:e.component,render:e.render},t)}))})]})}var me=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,154)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,i=t.getLCP,o=t.getTTFB;a(e),n(e),r(e),i(e),o(e)}))},be="master_feature";c.a.render(Object(n.jsx)(i.a.StrictMode,{children:Object(n.jsx)(ve,{})}),document.getElementById("root")),me()},87:function(e,t,a){},88:function(e,t,a){},97:function(e,t){},99:function(e,t){}},[[111,1,2]]]);
//# sourceMappingURL=main.97897929.chunk.js.map