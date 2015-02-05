module.exports=function(){var t=!1,e=function(){t||setTimeout(function(){l&&l.goToSegment(r.currentstation),a.StatusLog.setText(r.currentstation),t=!0},500)},a=Ti.UI.createWindow({backgroundColor:"white"}),o=Ti.Media.createAudioPlayer({allowBackground:!0,volume:1}),r={radiostations:require("model/radiostations"),currentstation:Ti.App.Properties.getInt("CURRENT_STATION_INDEX",0),"φ":0},i=360/r.radiostations.length;a.StatusLog=Ti.UI.createLabel({bottom:0,height:20,backgroundColor:"black",width:Ti.UI.FILL,zIndex:9999,color:"silver",textAlign:"center",text:""});var n=Ti.UI.createView({bottom:"20%"});a.add(n),a.stationviews=[];for(var s=[],d=0;d<r.radiostations.length;d++)s[d]="/images/"+r.radiostations[d].logo.toLowerCase()+".png";var l=new(require("ui/common/radiowheel.widget"));return n.add(l.createView({images:s,width:200,anchorPoint:{x:.5,y:3.2}})),r.φ=r.currentstation*i,a.PlayStopButton=Ti.UI.createView({bottom:40,width:100,height:100,backgroundImage:"/images/play.png"}),a.add(a.PlayStopButton),a.add(a.StatusLog),a.addEventListener("focus",function(){e()}),a.addEventListener("swipe",function(t){if("left"==t.direction||"right"==t.direction){a.PlayStopButton.backgroundImage="/images/leer.png",o.stop(),o.release(),a.StatusLog.setText("Radio angehalten."),r.currentstation=l.rotateStep(t.direction),Ti.App.Properties.setInt("CURRENT_STATION_INDEX",r.currentstation);var e=r.radiostations[r.currentstation].logo;a.StatusLog.setText("Könnte jetzt "+e+" zuschalten."),a.PlayStopButton.backgroundImage="/images/play.png"}}),a.PlayStopButton.addEventListener("click",function(){a.PlayStopButton.backgroundImage="/images/leer.png";var t=r.radiostations[r.currentstation].logo;return o.isPlaying()?(o.stop(),void a.StatusLog.setText("Radio "+t+" gestoppt")):(a.PlayStopButton.opacity=.4,a.StatusLog.setText("Besorge Radio-Adresse für "+t),o.release(),void require("controls/resolveplaylist")({playlist:r.radiostations[r.currentstation].playlist,stream:r.radiostations[r.currentstation].stream,onload:function(t){a.StatusLog.setText("Radio-Adresse erkannt, starte jetzt Radio"),a.PlayStopButton.opacity=1,o.setUrl(t),o.play()},onerror:function(){a.StatusLog.setText("FEHLER: Radio-Adresse nicht erkannt."),a.PlayStopButton.opacity=1}}))}),o.addEventListener("change",function(t){var e=r.radiostations[r.currentstation].name||r.radiostations[r.currentstation].logo;switch(t.state){case Ti.Media.AudioPlayer.STATE_BUFFERING:a.StatusLog.setText("Daten werden gebuffert.");break;case Ti.Media.AudioPlayer.STATE_INITIALIZED:a.StatusLog.setText("Initialisierung.");break;case Ti.Media.AudioPlayer.STATE_PAUSED:a.StatusLog.setText("Radio pausiert");break;case Ti.Media.AudioPlayer.STATE_PLAYING:case 3:a.StatusLog.setText("Radio spielt "+e+" ."),a.PlayStopButton.backgroundImage="/images/stop.png";break;case Ti.Media.AudioPlayer.STATE_STARTING:case 4:a.StatusLog.setText("Radio "+e+" wird gestartet."),a.PlayStopButton.backgroundImage="/images/stop.png";break;case 5:a.PlayStopButton.backgroundImage="/images/play.png";break;case Ti.Media.AudioPlayer.STATE_STOPPING:a.StatusLog.setText("Radio ist am Verstummen."),a.PlayStopButton.backgroundImage="/images/play.png"}}),a};