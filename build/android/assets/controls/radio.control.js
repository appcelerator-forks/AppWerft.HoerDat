var player=Ti.Media.createAudioPlayer({allowBackground:!0,volume:1}),Module=function(e){return this.model=e,this.eventhandlers={},this.cron,this.tick=0,this};Module.prototype={createView:function(){var e=this;return this._view=Ti.UI.createView({bottom:40,width:100,height:100,backgroundImage:"/images/play.png"}),this._spinner=require("vendor/circularprogress")({percent:0,size:100,margin:0,touchEnabled:!1,zIndex:901,progressColor:"#427aa7",font:{visible:!1}}),this._view.add(this._spinner),this._view.addEventListener("click",function(){e._view.backgroundImage="/images/leer.png";var t=e.model.radiostations[e.model.currentstation].logo;return player.isPlaying()?(e.stopPlayer(),e._view.backgroundImage="/images/play.png",void e.fireEvent("change",{message:"Radio "+t+" gestoppt"})):(e._view.opacity=.2,e.fireEvent("change",{message:"Besorge Radio-Adresse für "+t}),player.release(),void require("controls/resolveplaylist")({playlist:e.model.radiostations[e.model.currentstation].playlist,stream:e.model.radiostations[e.model.currentstation].stream,onload:function(t){e.model.radiostations[e.model.currentstation].stream=t,e._view.opacity=1,player.setUrl(t),player.play(),e.fireEvent("change",{message:"Radioadresse bekannt, Verbindung wird aufgebaut …"}),e._spinner.show(),e.tick=0,e.cron=setInterval(function(){e.tick++,console.log(e.tick),100==e.tick&&(clearInterval(e.cron),player.stop(),this._view.backgroundImage="/images/play.png",e._spinner.hide()),e._spinner.setValue(e.tick/100)},100)},onerror:function(){e._view.opacity=1}}))}),player.addEventListener("change",function(t){var a=e.model.radiostations[e.model.currentstation].name||e.model.radiostations[e.model.currentstation].logo;switch(t.state){case Ti.Media.AudioPlayer.STATE_BUFFERING:break;case Ti.Media.AudioPlayer.STATE_INITIALIZED:break;case Ti.Media.AudioPlayer.STATE_PAUSED:break;case Ti.Media.AudioPlayer.STATE_PLAYING:case 3:e._spinner.hide(),clearInterval(e.cron),e.fireEvent("change",{message:"Radio spielt "+a+" ."}),e._view.backgroundImage="/images/stop.png";break;case Ti.Media.AudioPlayer.STATE_STARTING:case 4:break;case 5:break;case Ti.Media.AudioPlayer.STATE_STOPPING:}}),this._view},stopPlayer:function(){player.stop(),player.release()},hide:function(){var e=this;this._view.animate({duration:100,opacity:0,transform:Ti.UI.create2DMatrix({scale:.3})},function(){e._view.backgroundImage="/images/play.png"})},show:function(){var e=this;this._view.animate({duration:50,opacity:1,transform:Ti.UI.create2DMatrix({scale:1.2})},function(){e._view.animate({duration:50,transform:Ti.UI.create2DMatrix({scale:1})})})},fireEvent:function(e,t){if(this.eventhandlers[e])for(var a=0;a<this.eventhandlers[e].length;a++)this.eventhandlers[e][a].call(this,t)},addEventListener:function(e,t){this.eventhandlers[e]||(this.eventhandlers[e]=[]),this.eventhandlers[e].push(t)},removeEventListener:function(e,t){if(this.eventhandlers[e]){var a=this.eventhandlers[e].filter(function(e){return e!=t});this.eventhandlers[e]=a}}},module.exports=Module;