function str2int(e){var t=e.split(".");return 1e5*t[0]+1e3*t[1]+t[2]}module.exports=function(){var e=str2int(Ti.App.getVersion()),t=(arguments[0]||{},"https://play.google.com/store/apps/details?id="+Ti.App.getId()),a=Ti.Network.createHTTPClient({onerror:function(){console.log("Warning: no connection to playstore "+e)},onload:function(){var a=/itemprop="softwareVersion">(.*?)</m.exec(this.responseText);if(!a)return void console.log("Warning: no connection to playstore "+e);var n=str2int(version=a[1].replace(/\s+/g,""));if(n>e){var r=Ti.UI.createAlertDialog({cancel:1,buttonNames:["Zum Store","Abbruch"],message:"Es gibt eine neue Version im Playstore.\n\nDiese App auf dem "+Ti.Platform.model+" hat die Version "+Ti.App.getVersion()+"\n\nIm Store ist  "+version+".\n\nMöchtest Du erneuern?",title:"Neue Version „"+Ti.App.getName()+"“"});r.show(),r.addEventListener("click",function(e){e.index!=e.source.cancel&&Ti.Platform.openURL(t)})}else e>n?Ti.Android&&Ti.UI.createNotification({message:Ti.App.getName()+" ist neuer als neu … ("+Ti.App.getVersion()+")"}).show():n==e&&Ti.Android&&Ti.UI.createNotification({message:Ti.App.getName()+" ist in neuester Version ("+Ti.App.getVersion()+")"}).show()}});a.open("GET",t),a.send()};